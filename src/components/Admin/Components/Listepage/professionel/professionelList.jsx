import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  Modal,
  Layout,
  Menu,
  Typography,
  Form,
  Row,
  Col,
  Spin,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import config from "../../../../../config";

const { Header, Content } = Layout;
const { Text } = Typography;

const ProfessionnelsList = () => {
  const [professionnels, setProfessionnels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProfessionnel, setSelectedProfessionnel] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/administration");
    } else {
      fetchProfessionnels();
    }
  }, [navigate]);

  const fetchProfessionnels = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.API_URL}/professionnels`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProfessionnels(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nom de l'entreprise",
      dataIndex: "nomEntreprise",
      key: "nomEntreprise",
    },
    {
      title: "Contact",
      dataIndex: "nom",
      render: (text, record) => (
        <Text>
          {record.nom} {record.prenom}
        </Text>
      ),
      key: "contact",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => navigate(`/professionnel/${record.id}`)}
        >
          Voir plus
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <Content style={{ padding: "50px 50px" }}>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Table
            dataSource={professionnels}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            locale={{
              emptyText: "Aucune donnée disponible",
            }}
          />
        )}
      </Content>
      <Modal
        title="Détails du professionnel"
        visible={showModal}
        onCancel={handleCloseModal}
        footer={[
          <Button key="fermer" onClick={handleCloseModal}>
            Fermer
          </Button>,
        ]}
      >
        <Form>
          {Object.entries(selectedProfessionnel).map(([key, value]) => (
            <Form.Item
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              key={key}
            >
              <Row>
                <Col span={20}>
                  <Text>
                    {value instanceof Object ? JSON.stringify(value) : value}
                  </Text>
                </Col>
              </Row>
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </Layout>
  );
};

export default ProfessionnelsList;
