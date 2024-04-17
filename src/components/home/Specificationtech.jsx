import React, { useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import "./Specification.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SpecificationTech = () => {
  const [activeKey, setActiveKey] = useState("moteur");

  const specs = {
    moteur: {
      title: "Moteur",
      details: [
        { name: "Nombre de cylindres", value: "4", icon: "gear-fill" },
        { name: "Cylindrée totale", value: "1.798 cm³", icon: "cpu-fill" },
        { name: "Puissance", value: "292 chevaux", icon: "speedometer2" },
        { name: "Couple", value: "340 Nm", icon: "tachometer" },
        { name: "Carburant", value: "Essence SP98", icon: "droplet-fill" },
      ],
    },
    transmission: {
      title: "Transmission",
      details: [
        {
          name: "Boite de vitesse",
          value: "Automatique, double embrayage, 7 rapports",
          icon: "gear-fill",
        },
        { name: "Type de transmission", value: "Propulsion", icon: "shuffle" },
      ],
    },
    performances: {
      title: "Performances",
      details: [
        { name: "Vitesse maximale", value: "260 km/h", icon: "speedometer2" },
        { name: "0 - 100 km/h", value: "4,4 sec.", icon: "stopwatch-fill" },
        { name: "0 - 1000 m", value: "22,4 sec.", icon: "rulers" },
      ],
    },
    autres: {
      title: "Autres & Options",
      details: [
        {
          name: "Série limitée",
          value: "300 exemplaires",
          icon: "ui-checks-grid",
        },
        { name: "Couleur", value: "Bleu abysse", icon: "palette-fill" },
        {
          name: "Intérieur",
          value: "Sièges baquets Sabelt® cuir marron",
          icon: "person-fill",
        },
      ],
    },
  };

  return (
    <Container
      fluid
      style={{ backgroundColor: "#0160a4" }}
      className="py-5 text-white"
    >
      <Row className="justify-content-center">
        <Col xs={12} className="text-center">
          <h1 className="display-3 fw-bold my-4">Spécifications Techniques</h1>
          <p className="lead my-4 mb-5">
            L'Alpine A110 GT Line incarne l'essence de la performance et de
            l'élégance, fusionnant design intemporel et technologie
            contemporaine.
          </p>
        </Col>
      </Row>

      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Row>
          <Col xs={12} className="mb-3">
            <Nav variant="pills" className="justify-content-center">
              {Object.keys(specs).map((key) => (
                <Nav.Item
                  key={key}
                  style={{
                    borderBottom: "2px solid black",
                    width: "15rem",
                    textAlign: "center",
                    marginBottom: "20px",
                    color: "black",
                  }}
                >
                  <Nav.Link
                    eventKey={key}
                    className={`rounded-0 ${activeKey === key ? "active" : ""}`}
                    style={{ color: "black" }}
                  >
                    {specs[key].title}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Tab.Content>
              {Object.keys(specs).map((key) => (
                <Tab.Pane eventKey={key} key={key}>
                  <Row className="justify-content-center">
                    {specs[activeKey].details.map((detail, index) => (
                      <Col md={4} key={index} className="mb-3">
                        <div className="d-flex align-items-center justify-content-center">
                          <i
                            className={`bi-${detail.icon} me-3`}
                            style={{ fontSize: "25px" }}
                          ></i>
                          <div>
                            <h5>{detail.name}</h5>
                            <p>{detail.value}</p>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      <Row className="justify-content-center my-4">
        <Col xs="auto">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 300, behavior: "smooth" })}
            className="btn btn-light rounded-0 fw-bold"
          >
            LOUER
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default SpecificationTech;
