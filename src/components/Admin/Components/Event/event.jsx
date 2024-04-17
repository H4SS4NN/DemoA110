import React from "react";
import { Container, Row, Col, Card, Button, Navbar } from "react-bootstrap";
import {
  BsGeoAlt,
  BsCalendar,
  BsFillPeopleFill,
  BsFillLightningFill,
} from "react-icons/bs";
import MyNavbar from "../../../navbar/navbar";
import Footer from "../../../footer/footer";

import "./event.css";

const ReasonToParticipate = ({ icon, title, description }) => {
  return (
    <Card className="h-100 text-center p-4">
      <Card.Body>
        <div className="icon-box mb-3">{icon}</div>
        <Card.Title className="mb-3">{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};
const skiingImage =
  "https://images.unsplash.com/photo-1519681393784-d120267933ba";
const climbingImage =
  "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759";
const photographyImage =
  "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759";

const EventCard = ({ title, date, location, description, image }) => {
  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Text className="text-muted">Lieu : {location}</Card.Text>
        <Button variant="primary">S'inscrire</Button>
      </Card.Body>
    </Card>
  );
};

const EventPage = () => {
  const events = [
    {
      title: "Championnat de ski alpin",
      date: "15 avril - 20 avril 2024",
      location: "Station alpine, Suisse",
      description:
        "Rejoignez-nous pour un championnat passionnant dans les Alpes ! Des skieurs du monde entier s'affronteront pour le titre.",
      image: skiingImage,
    },
    {
      title: "Expédition d'escalade en montagne",
      date: "10 mai - 15 mai 2024",
      location: "Sommets alpins, France",
      description:
        "Partez pour une aventure palpitante en escaladant les plus hauts sommets des Alpes. Vivez des vues à couper le souffle !",
      image: climbingImage,
    },
    {
      title: "Atelier de photographie alpine",
      date: "5 juin - 7 juin 2024",
      location: "Refuge alpin, Autriche",
      description:
        "Apprenez les techniques de photographie tout en capturant les paysages époustouflants des Alpes. Convient aux débutants et aux experts.",
      image: photographyImage,
    },
  ];

  return (
    <>
      <MyNavbar />
      <Container className="py-4">
        <div style={{}}>
          <h1 className="m-5 h1">Événements à venir :</h1>
        </div>

        <Row xs={1} md={2} lg={3} className="g-4">
          {events.map((event, index) => (
            <Col key={index}>
              <EventCard
                title={event.title}
                date={event.date}
                location={event.location}
                description={event.description}
                image={event.image}
              />
            </Col>
          ))}
        </Row>

        <section className="mt-5 p-5 reasons-section">
          <h2 className="text-center mb-4 h2">
            Pourquoi participer à ces événements alpins ?
          </h2>
          <Row className="justify-content-center g-4">
            <Col md={6} lg={3}>
              <ReasonToParticipate
                icon={<BsGeoAlt size={40} />}
                title="Des paysages incroyables"
                description="Les Alpes offrent des vues à couper le souffle, avec leurs sommets enneigés, leurs vallées verdoyantes et leurs lacs cristallins."
              />
            </Col>
            <Col md={6} lg={3}>
              <ReasonToParticipate
                icon={<BsCalendar size={40} />}
                title="Dates flexibles"
                description="Les événements ont lieu à différentes périodes de l'année, vous permettant de choisir celle qui vous convient le mieux."
              />
            </Col>
            <Col md={6} lg={3}>
              <ReasonToParticipate
                icon={<BsFillPeopleFill size={40} />}
                title="Rencontres enrichissantes"
                description="Rencontrez d'autres passionnés de montagne et partagez des expériences inoubliables avec des personnes partageant les mêmes idées."
              />
            </Col>
            <Col md={6} lg={3}>
              <ReasonToParticipate
                icon={<BsFillLightningFill size={40} />}
                title="Des aventures inoubliables"
                description="Vivez des aventures palpitantes, que ce soit en ski, en escalade ou en photographie, et repoussez vos limites."
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
