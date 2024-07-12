import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import config from "../../config";
import {
  BsGeoAlt,
  BsCalendar,
  BsFillPeopleFill,
  BsFillLightningFill,
} from "react-icons/bs";
import axios from "axios";
import MyNavbar from "../navbar/navbar";
import Footer from "../footer/footer";
import "./event.css";

const ReasonToParticipate = ({ icon, title, description }) => (
  <Card className="h-100 text-center p-4">
    <Card.Body>
      <div className="icon-box mb-3">{icon}</div>
      <Card.Title className="mb-3">{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
  </Card>
);

const EventCard = ({ title, date, location, description, image }) => (
  <Card className="mb-4">
    <Card.Img
      variant="top"
      src={image ? `data:image/jpeg;base64,${image}` : "path/to/default-image.jpg"}
      alt={title}
      style={{ maxHeight: "200px", objectFit: "cover" }}
    />
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
      <Card.Text>{description}</Card.Text>
      <Card.Text className="text-muted">Lieu : {location}</Card.Text>
      <Button variant="primary">S'inscrire</Button>
    </Card.Body>
  </Card>
);

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/evenements`);
        const filteredEvents = response.data.filter(
          (event) => event.is_past === null
        );
        const eventsWithBase64Images = filteredEvents.map((event) => {
          const base64Image = event.image ? arrayBufferToBase64(event.image.data) : null;
          return { ...event, image: base64Image };
        });
        setEvents(eventsWithBase64Images);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements:", error);
      }
    };
    fetchEvents();
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <>
      <MyNavbar />
      <Container className="py-4">
        <h1 className="m-5 h1">Événements à venir :</h1>
        {events.length > 0 ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {events.map((event, index) => (
              <Col key={index}>
                <EventCard
                  title={event.title}
                  date={event.event_date}
                  location={event.location}
                  description={event.description}
                  image={event.image}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center">
            <h2 className="mt-5">Aucun événement disponible pour le moment</h2>
            <p>
              Veuillez revenir plus tard pour découvrir de nouveaux événements.
            </p>
          </div>
        )}

        <section className="mt-5 p-5 reasons-section">
          <h2 className="text-center mb-4 h2">
            Pourquoi participer à ces événements alpins ?
          </h2>
          <Row className="justify-content-center g-4">
            <Col md={6} lg={3}>
              <ReasonToParticipate
                icon={<BsGeoAlt size={40} />}
                title="Héritage de performance"
                description="Découvrez l'héritage de performance et d'ingénierie qui fait d'Alpine une icône sur les routes et les circuits."
              />
            </Col>
            <Col md={6} lg={3}>
              <ReasonToParticipate
                icon={<BsCalendar size={40} />}
                title="Rassemblements exclusifs"
                description="Participez à des rassemblements exclusifs pour les amateurs d'Alpine, disponibles tout au long de l'année pour s'adapter à votre calendrier."
              />
            </Col>
            <Col md={6} lg={3}>
              <ReasonToParticipate
                icon={<BsFillPeopleFill size={40} />}
                title="Communauté passionnée"
                description="Rejoignez une communauté de passionnés d'automobile pour partager votre passion et échanger des histoires autour d'Alpine."
              />
            </Col>
            <Col md={6} lg={3}>
              <ReasonToParticipate
                icon={<BsFillLightningFill size={40} />}
                title="Expériences de conduite"
                description="Expérimentez le frisson de la conduite avec des événements dédiés, des essais sur piste et des rencontres de pilotage."
              />
            </Col>
          </Row>
        </section>
      </Container>
      <Footer />
    </>
  );
};

export default EventPage;
