import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import wave from "../../assets/Vector 5.png";

const StepsComponent = () => {
  return (
    <Container fluid className="py-5 mt-5">
      <div className="text-center mb-5">
        <h1 className="display-3 fw-bold">Comment ça fonctionne ?</h1>
        <p className="lead w-50 mx-auto mt-4 mb-5">
          Que ce soit pour un anniversaire, un séjour en amoureux, ou pour
          profiter de la conduite à bord d'un véhicule d'exception le temps
          d'une journée, d'un week-end ou plus, cette voiture marquera les
          esprits.
        </p>
      </div>

      <Row className="justify-content-center align-items-center g-5 text-center">
        <Col lg={3} md={6}>
          <Card className="border-0 g-5">
            <Card.Body className="g-5">
              <i className="bi bi-geo-alt display-1 bg-light rounded-circle p-4 mb-4 text-secondary"></i>
              <Card.Text>
                <br />
                <br />
                Trouvez votre emplacement parfait et choisissez une voiture qui
                répond à vos besoins.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="border-0">
            <Card.Body>
              <i className="bi bi-calendar3 display-1 bg-light rounded-circle p-4 mb-4 text-secondary"></i>
              <Card.Text>
                <br />
                <br />
                Sélectionnez vos dates et heures pour voir la disponibilité
                instantanée.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="border-0">
            <Card.Body>
              <i className="bi bi-car-front display-1 bg-light rounded-circle p-4 mb-4 text-secondary"></i>
              <Card.Text>
                <br />
                <br />
                Réservez votre voiture et préparez-vous à explorer la route.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StepsComponent;
