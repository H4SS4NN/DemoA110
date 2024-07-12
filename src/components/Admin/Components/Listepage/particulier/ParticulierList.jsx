import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Table, Layout, Typography, Spin, Button } from "antd";
import config from "../../../../../config";

const { Content } = Layout;
const { Text } = Typography;

const ParticuliersList = () => {
  const [particuliers, setParticuliers] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/administration");
    } else {
      fetchParticuliers();
    }
  }, [navigate]);

  const fetchParticuliers = () => {
    setLoading(true);
    axios
      .get(`${config.API_URL}/particuliers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setParticuliers(response.data);
      })
      .catch((error) => {
        console.error("Il y a eu un problème avec la requête", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Téléphone",
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button onClick={() => navigate(`/particuliers/${record.id}`)}>
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
        ) : particuliers.length > 0 ? (
          <Table
            dataSource={particuliers}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        ) : (
          <Text>Aucune donnée disponible</Text>
        )}
      </Content>
    </Layout>
  );
};

export default ParticuliersList;
