import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import imageAlpine from "../../assets/alpinevoyage.webp"; // Assurez-vous de remplacer ceci par le chemin de votre image
import MyNavbar from "../navbar/navbar";

import Footer from "../footer/footer";
import ScrollToTopButton from "../utils/ButtonTOp";

const HistoryAlpine = () => {
  const cardStyle = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "0vh",
    color: "white",
    height: "60vh",
    width: "80vw",
    borderRadius: "20px !important",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)", // Ajoute une ombre au texte pour améliorer la lisibilité
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "60vh",
    backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))", // Dégradé de noir en bas à transparent en haut
  };
  return (
    <>
      <MyNavbar />

      <Card className="text-center" style={cardStyle}>
        <Card.Img
          src={
            "https://cdn.group.renault.com/alp/master/alpine-new-cars/homepage/editorial/history/alpine-history-01%20desktop.jpg.ximg.largex2.webp/5aedf6d4ad.webp"
          }
          alt="Alpine A110 Rallye"
          style={{
            height: "100%",
            objectFit: "cover",
            borderRadius: "20px !important",
          }}
        />
        <div style={overlayStyle}></div>{" "}
        {/* Superpose le dégradé sur l'image */}
        <Card.ImgOverlay className="d-flex flex-column justify-content-end">
          <h1 className="display-3 fw-bold text-center my-4">
            NÉE DE LA VISION D'UN HOMME
          </h1>
        </Card.ImgOverlay>
      </Card>

      <Container style={{ maxWidth: "1200px", margin: "auto" }}>
        <Row className="my-5">
          <Col>
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                "C'est en sillonnant les Alpes à bord de ma 4 CV Renault que je
                me suis le plus amusé. J'ai donc décidé d'appeler mes futures
                voitures, Alpine. Il fallait que mes clients retrouvent ce
                plaisir de conduire au volant de la voiture que je voulais
                construire"
              </p>
              <footer className="blockquote-footer mt-2">
                Jean Rédélé, fondateur d'Alpine
              </footer>
            </blockquote>
          </Col>
        </Row>

        <Row className="justify-content-center my-5 ">
          <Col lg={6} className="text-center">
            <Image src={imageAlpine} fluid />
          </Col>
          <Col lg={6} className="d-flex flex-column justify-content-center">
            <h2 className="mb-3 h1">
              Jean Rédélé, la légende à l'origine du mythe
            </h2>
            <p>
              Alpine est une marque automobile française emblématique, reconnue
              pour son héritage sportif et sa passion pour les voitures de
              course. Fondée en 1955 par Jean Rédélé, un jeune entrepreneur
              français, Alpine s'est rapidement fait un nom dans le monde de la
              compétition automobile. Au départ, Alpine était un constructeur de
              voitures de sport basé à Dieppe, en France. M. Rédélé a commencé
              par modifier des voitures de série pour les adapter à la
              compétition. Sa première création, l'Alpine A106, était basée sur
              une Renault 4CV et a marqué le début de l'aventure Alpine.
            </p>
          </Col>
        </Row>
        <Row
          className="justify-content-center my-5"
          style={{
            backgroundColor: "#0160a4",
            color: "white",
            padding: "50px",

            borderRadius: "20px",
          }}
        >
          <Col lg={6} className="d-flex flex-column justify-content-center">
            <h2 className="mb-3 h1">Le Mythe renait</h2>
            <p>
              Le constructeur français de voiture de sport Alpine, fondé par le
              pilote Jean Rédélé (1922-2007) en 1955, puis disparu en 1995,
              renaît en 2017 à l'occasion du lancement du nouveau coupé de la
              marque. Cette relance est officiellement annoncée le 05 novembre
              2012. L'Alpine A110 est officiellement présentée le 07 mars 2017
              sur le stand Alpine du Salon de Genève. La nouvelle Alpine ne
              porte pas le nom Renault, propriétaire de la marque. En effet, la
              marque Alpine est la marque premium et sportive du groupe Renault.
              Alpine fait le choix de reprendre la dénomination du mythique
              modèle de 1962, l'A110.
            </p>
          </Col>
          <Col lg={6} className="text-center">
            <Image src={imageAlpine} fluid />
          </Col>
        </Row>
        <Row className="d-flex flex-column justify-content-center">
          <Col className="mt-5 mb-5">
            <h1 className="h2"> Notre raison d'être</h1>
            <p>
              Tel un Phoenix qui renait, la création de la SAS PHOENIX78 prend
              tout son sens, pour promouvoir ce véhicule de Légende. Par le
              principe de la location, nous voulons surtout rendre accessible,
              par des valeurs de Partage, Plaisir et Passion, cette sportive
              française. Merci à tous les contributeurs, dont vous ferez
              peut-être parti, de vivre l'aventure Alpine avec nous.
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default HistoryAlpine;
