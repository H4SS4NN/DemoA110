import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Row,
  Image,
  Modal,
  Input,
  Space,
  Typography,
  message,
} from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  CalendarOutlined,
  PictureOutlined,
  DownloadOutlined,
  BarcodeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import moment from "moment";
import config from "../../../../../config";

const { Title, Text } = Typography;

const ProfessionnelDetails = () => {
  const { id } = useParams();
  const [professionnel, setProfessionnel] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageToShow, setImageToShow] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [documentName, setDocumentName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/administration");
    } else {
      fetchProfessionnelDetails();
    }
  }, [id]);

  const fetchProfessionnelDetails = async () => {
    try {
      const response = await axios.get(
        `${config.API_URL}/professionnels/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfessionnel(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfessionnel({ ...professionnel, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setProfessionnel({ ...professionnel, [name]: files[0] });
  };

  const saveChanges = async () => {
    const formData = new FormData();
    Object.keys(professionnel).forEach((key) => {
      formData.append(key, professionnel[key]);
    });

    try {
      await axios.put(`${config.API_URL}/professionnels/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEditMode(false);
      message.success("Changes saved successfully");
      fetchProfessionnelDetails(); // Refresh data after saving
    } catch (error) {
      console.error("Failed to save changes: ", error);
      message.error("Failed to save changes");
    }
  };

  const bufferToDataURL = (buffer, type) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    const dataUrl = `data:image/png;base64,${window.btoa(binary)}`;
    setDownloadUrl(dataUrl);
    const fileName = `${type}${professionnel.prenom}${professionnel.nom}.png`;
    setDocumentName(fileName.replace(/\s/g, ""));
    return dataUrl;
  };

  const viewImage = (buffer, type) => {
    if (buffer && buffer.data) {
      const imageUrl = bufferToDataURL(buffer.data, type);
      setImageToShow(imageUrl);
      setShowModal(true);
    }
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
        ) : editMode ? (
          <Input
            type={isImage ? "file" : "text"}
            name={label.toLowerCase().replace(/ /g, "")}
            onChange={isImage ? handleFileChange : handleChange}
            defaultValue={data}
          />
        ) : (
          <Text>{data || "N/A"}</Text>
        )}
      </Col>
    </Row>
  );

  return (
    <div style={{ padding: 24 }}>
      <Card style={{ maxWidth: 800, margin: "auto" }}>
        <Row justify="space-between" align="middle">
          <Col span={6} style={{ textAlign: "center" }}>
            <Image
              src="https://i.pinimg.com/564x/b5/7c/49/b57c494c29d59603957dc5ebaa33ff5e.jpg"
              style={{ borderRadius: "50%", width: 100, height: 100 }}
            />
            <h4>
              {`${professionnel.prenom || ""} ${
                professionnel.nom || ""
              }`.trim() || "N/A"}
            </h4>
            <p className="text-muted">
              {professionnel.nomEntreprise || "Independent"}
            </p>
          </Col>
          <Col span={18}>
            <Title level={4}>Informations de Contact</Title>
            <DataRow
              icon={<BarcodeOutlined />}
              label="SIRET"
              data={professionnel.siret || "N/A"}
            />
            <DataRow
              icon={<FileTextOutlined />}
              label="Nom d'Entreprise"
              data={professionnel.nomEntreprise || "N/A"}
            />
            <DataRow
              icon={<HomeOutlined />}
              label="Adresse (pro)"
              data={professionnel.adressePostaleEntreprise || "N/A"}
            />
            <DataRow
              icon={<HomeOutlined />}
              label="Code Postal (pro)"
              data={professionnel.codePostalEntreprise || "N/A"}
            />
            <DataRow
              icon={<HomeOutlined />}
              label="Ville (pro)"
              data={professionnel.villeEntreprise || "N/A"}
            />
            <DataRow
              icon={<PhoneOutlined />}
              label="Téléphone (pro)"
              data={professionnel.mobileEntreprise || "N/A"}
            />
            <DataRow
              icon={<FileTextOutlined />}
              label="KBIS"
              data={professionnel.kbis}
              isImage
              docType="KBIS"
            />
            <DataRow
              icon={<PhoneOutlined />}
              label="Téléphone (perso)"
              data={professionnel.mobile || "N/A"}
            />
            <DataRow
              icon={<MailOutlined />}
              label="Email (perso)"
              data={professionnel.email || "N/A"}
            />
            <DataRow
              icon={<CalendarOutlined />}
              label="Date de naissance"
              data={
                moment(professionnel.dateNaissance).format("DD/MM/YYYY") ||
                "N/A"
              }
            />
            <DataRow
              icon={<HomeOutlined />}
              label="Lieu de naissance"
              data={professionnel.lieuNaissance || "N/A"}
            />
            <DataRow
              icon={<HomeOutlined />}
              label="Adresse personnelle"
              data={professionnel.adressePostale || "N/A"}
            />
            <DataRow
              icon={<HomeOutlined />}
              label="Code Postal (perso)"
              data={professionnel.codePostal || "N/A"}
            />
            <DataRow
              icon={<HomeOutlined />}
              label="Ville (perso)"
              data={professionnel.ville || "N/A"}
            />
            <DataRow
              icon={<PictureOutlined />}
              label="Carte d'Identité"
              data={professionnel.carteIdentite}
              isImage
              docType="CarteIdentite"
            />
            <DataRow
              icon={<PictureOutlined />}
              label="Permis de Conduire"
              data={professionnel.permisConduire}
              isImage
              docType="PermisConduire"
            />
            <DataRow
              icon={<PictureOutlined />}
              label="Justificatif de Domicile"
              data={professionnel.justificatifDomicile}
              isImage
              docType="JustificatifDomicile"
            />
            <Space>
              {editMode ? (
                <>
                  <Button type="primary" onClick={saveChanges}>
                    Save Changes
                  </Button>
                  <Button onClick={handleEditToggle}>Cancel</Button>
                </>
              ) : (
                <Button type="primary" onClick={handleEditToggle}>
                  Edit
                </Button>
              )}
            </Space>
          </Col>
        </Row>
        <Button
          type="default"
          onClick={() => navigate(-1)}
          style={{ marginTop: 16 }}
        >
          Back
        </Button>
      </Card>
      <Modal
        title="Document"
        visible={showModal}
        onCancel={() => {
          URL.revokeObjectURL(downloadUrl);
          setShowModal(false);
        }}
        footer={[
          <Button key="back" onClick={() => setShowModal(false)}>
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

export default ProfessionnelDetails;
