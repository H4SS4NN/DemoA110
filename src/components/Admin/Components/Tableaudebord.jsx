import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Table,
  Navbar,
  Nav,
  Badge,
  Form,
} from "react-bootstrap";
import axios from "axios";
import {
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import EditReservationModal from "./EditModal";
import ConfirmationModal from "./confirmationModal";
import config from "../../../config";

const Dashboard = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [nomRecherche, setNomRecherche] = useState("");
  const [etatRecherche, setEtatRecherche] = useState("");
  const [dateRecherche, setDateRecherche] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentReservationId, setCurrentReservationId] = useState(null);
  const [reservationState, setReservationState] = useState("");

  const openConfirmationModal = (id, nouvelEtat) => {
    setCurrentReservationId(id);
    setReservationState(nouvelEtat);
    setShowConfirmationModal(true);
  };

  const adressAPI = config.API_URL;

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/administration");
    } else {
      fetchReservations();
    }
  }, [navigate]);

  const fetchReservations = () => {
    axios
      .get(`${config.API_URL}reservations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the reservations!", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    navigate("/administration");
  };

  const confirmAction = async (id, commentaire, objet, nouvelEtat) => {
    try {
      const response = await axios.post(
        `${config.API_URL}reservations/update`,
        {
          id,
          commentaire,
          objet,
          nouvelEtat: reservationState,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        fetchReservations();
        console.log("Mise à jour réussie !");
      } else {
        console.error("Une erreur est survenue lors de la mise à jour.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
    }
  };

  const handleReservation = () => {
    navigate("/Loc_Contact");
  };

  const handlePrixChange = (e, id) => {
    const newPrix = e.target.value;

    setReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, prix_estime: newPrix }
          : reservation
      )
    );
  };

  const handleSaveUpdatedReservation = async (updatedReservation) => {
    try {
      await axios.post(
        adressAPI + "/reservations/updates",
        updatedReservation,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchReservations();
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
    }
  };

  const getBadgeColor = (etat) => {
    switch (etat) {
      case "validé":
        return "success";
      case "en attente":
        return "warning";
      case "refusé":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Tableau de Réservation</Navbar.Brand>
          <Nav className="ml-auto">
            <Button variant="primary" onClick={handleReservation}>
              Contact
            </Button>
          </Nav>

          <Nav className="ml-auto">
            <Button variant="outline-danger" onClick={handleLogout}>
              Déconnexion
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Recherche par nom de famille"
            aria-label="Recherche par nom de famille"
            aria-describedby="basic-addon2"
            onChange={(e) => setNomRecherche(e.target.value)}
          />
          <FormControl
            type="date"
            aria-label="Filtre par date"
            onChange={(e) => setDateRecherche(e.target.value)}
          />
          <DropdownButton
            variant="outline-secondary"
            title="Filtrer par état"
            id="input-group-dropdown-2"
            align="end"
          >
            <Dropdown.Item href="#" onClick={() => setEtatRecherche("")}>
              Tous
            </Dropdown.Item>
            <Dropdown.Item
              href="#"
              onClick={() => setEtatRecherche("en attente")}
            >
              En attente
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => setEtatRecherche("validé")}>
              Validé
            </Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => setEtatRecherche("refusé")}>
              Refusé
            </Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </Container>
      <Container style={{ marginTop: "20px" }}>
        <h1>Réservations</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom, Prénom & Contact</th>
              <th>Date & Heure de Départ</th>
              <th>Date & Heure de Retour</th>
              <th>État</th>
              <th>Prix Estimé</th>
              <th>Commentaire</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations
              .filter((reservation) =>
                reservation.nom
                  .toLowerCase()
                  .includes(nomRecherche.toLowerCase())
              )
              .filter((reservation) =>
                etatRecherche ? reservation.etat === etatRecherche : true
              )
              .filter((reservation) =>
                dateRecherche ? reservation.date_debut === dateRecherche : true
              )
              .map((reservation) => (
                <tr key={reservation.id}>
                  <td>
                    <div>
                      <strong>
                        {reservation.nom} {reservation.prenom}
                      </strong>
                    </div>
                    <div>
                      <small>{reservation.telephone}</small>
                    </div>
                    <div>
                      <small>{reservation.email}</small>
                    </div>
                  </td>
                  <td>
                    <div>
                      <strong>Date:</strong>{" "}
                      {new Date(reservation.date_debut).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Heure:</strong> {reservation.heure_depart}
                    </div>
                  </td>
                  <td>
                    <div>
                      <strong>Date:</strong>{" "}
                      {new Date(reservation.date_fin).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Heure:</strong> {reservation.heure_retour}
                    </div>
                  </td>

                  <td>
                    <Badge bg={getBadgeColor(reservation.etat)}>
                      {reservation.etat}
                    </Badge>
                  </td>
                  <td>
                    <div type="number" />
                    <strong>{reservation.prix_estime} €</strong>
                  </td>
                  <td>{reservation.commentaire}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      style={{ marginRight: "5px" }}
                      onClick={() =>
                        openConfirmationModal(reservation.id, "validé")
                      }
                    >
                      Accepter
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        openConfirmationModal(reservation.id, "refusé")
                      }
                    >
                      Refuser
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => {
                        setSelectedReservation(reservation);
                        setModalShow(true);
                      }}
                    >
                      Modifier
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
      <EditReservationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        reservation={selectedReservation}
        onSave={handleSaveUpdatedReservation}
      />
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        onConfirm={confirmAction}
        reservationId={currentReservationId}
      />
      ;
    </>
  );
};

export default Dashboard;
