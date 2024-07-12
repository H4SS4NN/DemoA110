import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Col, Row, Space, Typography, Image, Modal } from "antd";
import {
  DownloadOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import moment from "moment"; // Import moment for date formatting
import config from "../../../../../config";

const { Title, Text } = Typography;

const ParticulierDetails = () => {
  const { id } = useParams();
  const [particulier, setParticulier] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageToShow, setImageToShow] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [documentName, setDocumentName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchParticulierDetails();
  }, [id]);

  const fetchParticulierDetails = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/particuliers/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setParticulier(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const viewImage = (buffer, type) => {
    if (buffer && buffer.data) {
      const imageUrl = bufferToDataURL(buffer.data, type);
      setImageToShow(imageUrl);
      setIsModalVisible(true);
    }
  };

  const bufferToDataURL = (buffer, type) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    const dataUrl = `data:image/png;base64,${window.btoa(binary)}`;
    setDownloadUrl(dataUrl);
    const fileName = `${type}${particulier.prenom}${particulier.nom}.png`;
    setDocumentName(fileName.replace(/\s/g, ""));
    return dataUrl;
  };

  const DataRow = ({ icon, label, data, isImage, docType }) => (
    <Row align="middle" style={{ marginBottom: 16 }}>
      <Col span={2}>{icon}</Col>
      <Col span={22}>
        <Text type="secondary">{label}:</Text>
        {isImage && data ? (
          <Button type="link" onClick={() => viewImage(data, docType)}>
            Voir Document
          </Button>
        ) : (
          <Text>{data || "N/A"}</Text>
        )}
      </Col>
    </Row>
  );

  return (
    <div style={{ padding: 24 }}>
      <Card style={{ maxWidth: 800, margin: "auto" }}>
        <Title level={4}>Informations du Particulier</Title>
        <DataRow
          icon={<PhoneOutlined />}
          label="Téléphone"
          data={particulier.telephone}
        />
        <DataRow
          icon={<MailOutlined />}
          label="Email"
          data={particulier.email}
        />
        <DataRow
          icon={<HomeOutlined />}
          label="Adresse"
          data={particulier.adressePostale}
        />
        <DataRow
          icon={<CalendarOutlined />}
          label="Date de Naissance"
          data={moment(particulier.dateNaissance).format("DD/MM/YYYY")} // Format date to French format
        />
        <DataRow
          icon={<PictureOutlined />}
          label="Carte d'Identité"
          isImage
          data={particulier.carteIdentite}
          docType="CarteIdentite"
        />
        <DataRow
          icon={<PictureOutlined />}
          label="Justificatif de Domicile"
          isImage
          data={particulier.justificatifDomicile}
          docType="JustificatifDomicile"
        />
        <DataRow
          icon={<PictureOutlined />}
          label="Permis de Conduire"
          isImage
          data={particulier.permisConduire}
          docType="PermisConduire"
        />
        <DataRow
          icon={<HomeOutlined />}
          label="Code Postal"
          data={particulier.codePostal}
        />
        <DataRow
          icon={<HomeOutlined />}
          label="Lieu de Naissance"
          data={particulier.lieuNaissance}
        />
        <Space>
          <Button onClick={() => navigate(-1)}>Retour</Button>
        </Space>
      </Card>
      <Modal
        title="Document"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Retour
          </Button>,
          <Button
            key="download"
            type="primary"
            icon={<DownloadOutlined />}
            href={downloadUrl}
            download={documentName}
          >
            Télécharger
          </Button>,
        ]}
      >
        <Image src={imageToShow} alt="Document" style={{ width: "100%" }} />
      </Modal>
    </div>
  );
};

export default ParticulierDetails;
