import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  Modal,
  Navbar,
  Container,
  Nav,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { jsPDF } from "jspdf";

const ParticuliersList = () => {
  const [particuliers, setParticuliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedParticulier, setSelectedParticulier] = useState(null);
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
    axios
      .get("http://localhost:3000/particuliers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setParticuliers(response.data);
      })
      .catch((error) => {
        console.error("Il y a eu un problème avec la requête", error);
      });
  };

  const handleShowModal = async (particulier) => {
    setSelectedParticulier(particulier);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const downloadPDF = (particulier) => {
    // Fonction pour télécharger le PDF
  };

  const handleReservation = () => {
    navigate("/admin");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    navigate("/administration");
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Liste des particuliers</Navbar.Brand>
          <Nav className="gap-2 ml-auto">
            <Button variant="primary" onClick={handleReservation}>
              Reservations
            </Button>
            <Button onClick={() => navigate("/Contact_pro")}>
              Liste Professionel
            </Button>
          </Nav>
          <Nav className="ml-auto">
            <Button variant="outline-danger" onClick={handleLogout}>
              Déconnexion
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {particuliers.map((particulier) => (
              <tr key={particulier.id}>
                <td>{particulier.id}</td>
                <td>{particulier.nom}</td>
                <td>{particulier.prenom}</td>
                <td>{particulier.email}</td>
                <td>{particulier.telephone}</td>
                <td>
                  <Link
                    to={`/particuliers/${particulier.id}`}
                    className="btn btn-primary"
                  >
                    Voir plus
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ParticuliersList;
