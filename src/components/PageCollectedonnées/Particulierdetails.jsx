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
  BsPhone,
  BsEnvelope,
  BsGeo,
  BsCalendarDate,
  BsCardImage,
  BsHouseFill,
  BsDownload,
} from "react-icons/bs";

const ParticulierDetails = () => {
  const { id } = useParams();
  const [particulier, setParticulier] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [imageToShow, setImageToShow] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchParticulierDetails();
  }, [id]);

  const fetchParticulierDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/particuliers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setParticulier(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date non disponible";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Date invalide";
      }
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Intl.DateTimeFormat("fr-FR", options).format(date);
    } catch (error) {
      console.error("Erreur lors du formatage de la date:", error);
      return "Erreur de formatage";
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

  const viewImage = (buffer, type) => {
    if (buffer && buffer.data) {
      const imageUrl = bufferToDataURL(buffer.data, type);
      setImageToShow(imageUrl);
      setShowModal(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setParticulier({ ...particulier, [name]: value });
  };

  const saveChanges = async () => {
    try {
      await axios.put(`http://localhost:3000/particuliers/${id}`, particulier, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEditMode(false);
      fetchParticulierDetails(); // Refresh data after saving
    } catch (error) {
      console.error("Failed to save changes: ", error);
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
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
            type="text"
            name={label.toLowerCase().replace(/ /g, "")}
            value={data}
            onChange={handleChange}
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
            <Col md={8}>
              <Card.Title>Informations du Particulier</Card.Title>
              <DataRow
                icon={<BsPhone />}
                label="Téléphone"
                data={particulier.telephone || "N/A"}
              />
              <DataRow
                icon={<BsEnvelope />}
                label="Email"
                data={particulier.email || "N/A"}
              />
              <DataRow
                icon={<BsGeo />}
                label="Adresse"
                data={particulier.adressePostale || "N/A"} // Ajout de adressePostale
              />

              {/* Ligne de données pour le code postal */}
              <DataRow
                icon={<BsGeo />}
                label="Code Postal"
                data={particulier.codePostal || "N/A"} // Ajout de codePostal
              />
              {/* Ligne de données pour la ville */}
              <DataRow
                icon={<BsGeo />}
                label="Ville"
                data={particulier.ville || "N/A"}
              />
              {/* Ligne de données pour le lieu de naissance */}
              <DataRow
                icon={<BsGeo />}
                label="Lieu de Naissance"
                data={particulier.lieuNaissance || "N/A"}
              />
              {/* Ligne de données pour la carte d'identité */}
              <DataRow
                icon={<BsCardImage />}
                label="Carte d'Identité"
                data={particulier.carteIdentite}
                isImage
                docType="CarteIdentite"
              />
              {/* Ligne de données pour le justificatif de domicile */}
              <DataRow
                icon={<BsCardImage />}
                label="Justificatif de Domicile"
                data={particulier.justificatifDomicile}
                isImage
                docType="JustificatifDomicile"
              />
              {/* Ligne de données pour le permis de conduire */}
              <DataRow
                icon={<BsCardImage />}
                label="Permis de Conduire"
                data={particulier.permisConduire}
                isImage
                docType="PermisConduire"
              />
            </Col>
            <Col md={4}>
              {editMode && (
                <Button variant="success" onClick={saveChanges}>
                  Sauvegarder
                </Button>
              )}
              <Button
                variant={editMode ? "danger" : "primary"}
                onClick={handleEditToggle}
              >
                {editMode ? "Annuler" : "Modifier"}
              </Button>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Retour
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
          <Button variant="success" className="m-2">
            <a href={downloadUrl} download={documentName}>
              <BsDownload />
            </a>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Image src={imageToShow} fluid />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ParticulierDetails;
