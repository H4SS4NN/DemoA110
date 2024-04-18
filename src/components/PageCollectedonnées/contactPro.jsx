import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  Modal,
  Navbar,
  Container,
  Nav,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import config from "../../config";

const ProfessionnelsList = () => {
  const [professionnels, setProfessionnels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProfessionnel, setSelectedProfessionnel] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfessionnels();
  }, []);

  const fetchProfessionnels = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/professionnels`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProfessionnels(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleShowModal = (professionnel) => {
    setSelectedProfessionnel(professionnel);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">Liste des professionnels</Navbar.Brand>
          <Button onClick={() => navigate("/Loc_contact")}>
            Liste Particuliers
          </Button>
          <Nav className="ml-auto">
            <Button
              variant="outline-danger"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/administration");
              }}
            >
              Déconnexion
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom de l'entreprise</th>
              <th>Contact</th>
              <th>Email</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {professionnels.map((professionnel) => (
              <tr key={professionnel.id}>
                <td>{professionnel.id}</td>
                <td>{professionnel.nomEntreprise}</td>
                <td>
                  {professionnel.nom} {professionnel.prenom}
                </td>
                <td>{professionnel.email}</td>

                <td>
                  <Button
                    variant="info"
                    onClick={() =>
                      navigate(`/professionnel/${professionnel.id}`)
                    }
                    style={{ marginLeft: "10px" }}
                  >
                    Voir plus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Détails du professionnel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {Object.entries(selectedProfessionnel).map(([key, value]) => (
                <Form.Group as={Row} className="mb-3" key={key}>
                  <Form.Label column sm="4">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      readOnly
                      defaultValue={
                        value instanceof Object ? JSON.stringify(value) : value
                      }
                    />
                  </Col>
                </Form.Group>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default ProfessionnelsList;
