import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "react-bootstrap";
import ResultatLocation from "../Location/Resultat_location/Result_Location";
import { Container, Row, Col, Form } from "react-bootstrap";

import WizardComponent from "../Location/Formulaire_location/TestBootstrap";
import OfferCards from "./offer";
import { BsBorderBottom } from "react-icons/bs";

const SearchForm = () => {
  const getFormattedCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split("T")[0]; // Format YYYY-MM-DD
    let hour = now.getHours();
    let nextHour = hour === 23 ? hour : hour + 1; // Heure de retour, une heure après l'heure actuelle, ajustez selon la logique désirée
    const time = `${hour.toString().padStart(2, "0")}:00`;
    const nextTime = `${nextHour.toString().padStart(2, "0")}:00`;
    return { date, time, nextTime };
  };

  const { date, time, nextTime } = getFormattedCurrentDateTime();

  const today = new Date().toISOString().split("T")[0]; // Date d'aujourd'hui au format YYYY-MM-DD

  const [departureLocation, setDepartureLocation] = useState(
    "Rue François Geoffre, 78180 Montigny-le-Bretonneux"
  );

  const [returnLocation, setReturnLocation] = useState(
    "Rue François Geoffre, 78180 Montigny-le-Bretonneux"
  );
  const [departureDate, setDepartureDate] = useState(today);
  const [returnDate, setReturnDate] = useState(today);
  const [departureTime, setDepartureTime] = useState("08:00");
  const [returnTime, setReturnTime] = useState("18:00");
  const [showResult, setShowResult] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState(null);

  const [style, setStyle] = useState({ opacity: 0 });
  useEffect(() => {
    if (showResult) {
      // Commencez l'animation après que le composant est rendu
      const timer = setTimeout(() => {
        setStyle({ opacity: 1, transition: "opacity 500ms ease-in" });
      }, 100); // Léger délai pour s'assurer que le composant est prêt
      return () => clearTimeout(timer);
    } else {
      // Réinitialiser le style si showResult est false
      setStyle({ opacity: 0 });
    }
  }, [showResult]);

  const search = () => {
    // Formatage des dates
    const formatDateForState = (date) => {
      if (!date) return "";
      return new Date(date).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    };

    const generateTimeOptions = () => {
      const options = [];
      for (let hour = 8; hour <= 18; hour++) {
        options.push(
          <option key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
            {`${hour.toString().padStart(2, "0")}:00`}
          </option>
        );
      }
      return options;
    };

    const search = () => {
      console.log(
        "Recherche effectuée avec les détails de départ et de retour"
      );
    };

    const formattedDepartureDate = formatDateForState(departureDate);
    const formattedReturnDate = formatDateForState(returnDate);

    // Mise à jour de l'état avec les informations formatées
    setDeliveryInfo({
      startLocation: departureLocation,
      startDate: formattedDepartureDate,
      startTime: departureTime,
      endLocation: returnLocation,
      endDate: formattedReturnDate,
      endTime: returnTime,
    });

    setShowResult(true);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour <= 18; hour++) {
      options.push(
        <option key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
          {`${hour.toString().padStart(2, "0")}:00`}
        </option>
      );
    }
    return options;
  };

  return (
    <div
      className="container row"
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "10px 10px 0 0",
      }}
    >
      <Container>
        <h1 className="h2"> Estimez votre location </h1>

        <Form>
          <Row className="align-items-end">
            <Col xs={12} md={2}>
              <Form.Group controlId="formDepartLocation">
                <Form.Label>
                  {" "}
                  <h2 className="h5">
                    <b>
                      {" "}
                      <i class="bi bi-arrow-up"></i>Départ
                    </b>{" "}
                  </h2>
                </Form.Label>

                <p>
                  <i class="bi bi-geo"> </i>
                  {returnLocation}{" "}
                </p>
              </Form.Group>
            </Col>

            {/* Date de départ */}
            <Col xs={6} md={2}>
              <Form.Group controlId="formDepartDate">
                <Form.Control
                  type="date"
                  value={departureDate}
                  min={today} // La date minimale est la date d'aujourd'hui
                  max={returnDate !== today ? returnDate : undefined}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </Form.Group>
            </Col>

            {/* Heure de départ */}
            <Col xs={6} md={2}>
              <Form.Group controlId="formDepartTime">
                <Form.Select
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                >
                  {generateTimeOptions()}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Localisation de retour */}
            <Col xs={12} md={2}>
              <Form.Group controlId="formReturnLocation">
                <Form.Label>
                  {" "}
                  <h2 className="h5 pt-5">
                    <b>
                      {" "}
                      <i class="bi bi-arrow-down"></i> Retour
                    </b>
                  </h2>
                </Form.Label>

                <p className="">
                  {" "}
                  <i class="bi bi-geo"> </i> {returnLocation}{" "}
                </p>
              </Form.Group>
            </Col>

            {/* Date de retour */}
            <Col xs={6} md={2}>
              <Form.Group controlId="formReturnDate">
                <Form.Control
                  type="date"
                  value={returnDate}
                  min={departureDate} // La date minimale est la date de départ
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </Form.Group>
            </Col>

            {/* Heure de retour */}
            <Col xs={6} md={2}>
              <Form.Group controlId="formReturnTime">
                <Form.Select
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                >
                  {generateTimeOptions()}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-3">
              <Button className="btn " onClick={search}>
                Rechercher <i class="bi bi-search"></i>
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <div style={style}>
        {showResult && <WizardComponent deliveryInfo={deliveryInfo} />}
      </div>
    </div>
  );
};

export default SearchForm;
