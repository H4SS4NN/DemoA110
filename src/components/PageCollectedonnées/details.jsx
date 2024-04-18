import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Container,
  Card,
  Row,
  Col,
  Image,
  Modal,
  Form,
} from "react-bootstrap";
import {
  BsBuilding,
  BsPersonBadge,
  BsPhone,
  BsEnvelope,
  BsGeo,
  BsCalendarDate,
  BsCardImage,
  BsHouseFill,
  BsDownload,
} from "react-icons/bs";

import config from "../../config";

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
    fetchProfessionnelDetails();
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
      fetchProfessionnelDetails(); // Refresh data after saving
    } catch (error) {
      console.error("Failed to save changes: ", error);
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
    <Row className="mb-2 align-items-center">
      <Col xs="auto" className="icon-col">
        {icon}
      </Col>
      <Col>
        <div className="text-muted">{label}</div>
        {isImage && data ? (
          <Button variant="link" onClick={() => viewImage(data, docType)}>
            Voir Document
          </Button>
        ) : editMode ? (
          <Form.Control
            type={isImage ? "file" : "text"}
            name={label.toLowerCase().replace(/ /g, "")}
            onChange={isImage ? handleFileChange : handleChange}
            defaultValue={data}
          />
        ) : (
          <div>{data || "N/A"}</div>
        )}
      </Col>
    </Row>
  );

  return (
    <Container className="mt-5">
      <Card className="shadow-lg">
        <Card.Body>
          <Row className="justify-content-between align-items-center">
            <Col md={4} className="text-center">
              <Image
                src="https://i.pinimg.com/564x/b5/7c/49/b57c494c29d59603957dc5ebaa33ff5e.jpg"
                roundedCircle
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
            <Col md={8}>
              <Card.Title>Informations de Contact</Card.Title>
              <DataRow
                icon={<BsPhone />}
                label="Téléphone (pro)"
                data={professionnel.mobileEntreprise || "N/A"}
              />
              <DataRow
                icon={<BsEnvelope />}
                label="Email (pro)"
                data={professionnel.email || "N/A"}
              />
              <DataRow
                icon={<BsGeo />}
                label="Adresse (pro)"
                data={professionnel.adressePostaleEntreprise || "N/A"}
              />
              <DataRow
                icon={<BsPhone />}
                label="Téléphone (perso)"
                data={professionnel.mobile || "N/A"}
              />
              <DataRow
                icon={<BsEnvelope />}
                label="Email (perso)"
                data={professionnel.email || "N/A"}
              />
              <DataRow
                icon={<BsCalendarDate />}
                label="Date de naissance"
                data={professionnel.dateNaissance || "N/A"}
              />
              <DataRow
                icon={<BsGeo />}
                label="Lieu de naissance"
                data={professionnel.lieuNaissance || "N/A"}
              />
              <DataRow
                icon={<BsHouseFill />}
                label="Adresse personnelle"
                data={professionnel.adressePostale || "N/A"}
              />
              <DataRow
                icon={<BsCardImage />}
                label="Carte d'Identité"
                data={professionnel.carteIdentite}
                isImage
                docType="CarteIdentite"
              />
              <DataRow
                icon={<BsCardImage />}
                label="Permis de Conduire"
                data={professionnel.permisConduire}
                isImage
                docType="PermisConduire"
              />
              <DataRow
                icon={<BsCardImage />}
                label="Justificatif de Domicile"
                data={professionnel.justificatifDomicile}
                isImage
                docType="JustificatifDomicile"
              />
            </Col>
          </Row>
          {editMode && (
            <Row>
              <Col className="text-right">
                <Button variant="success" onClick={saveChanges}>
                  Save Changes
                </Button>
                <Button variant="danger" onClick={handleEditToggle}>
                  Cancel
                </Button>
              </Col>
            </Row>
          )}
          {!editMode && (
            <Button variant="primary" onClick={handleEditToggle}>
              Edit
            </Button>
          )}
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Card.Footer>
      </Card>

      <Modal
        show={showModal}
        onHide={() => {
          URL.revokeObjectURL(downloadUrl);
          setShowModal(false);
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Document</Modal.Title>
          <a href={downloadUrl} download={documentName}>
            <Button variant="success">
              <BsDownload />
            </Button>
          </a>
        </Modal.Header>
        <Modal.Body>
          <Image src={imageToShow} fluid />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProfessionnelDetails;
