import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import DateDisplayComponent from "../Resultat_location/Result_date";
import StationCard from "../Resultat_location/Resultat_station";
import EstimationLoc from "../Resultat_location/Resultat_estimation";
import CarCardOverlay from "../Resultat_location/Result_Carcard";
import FormulaireLocation from "./Formulaire_location";
import RecapFinale from "./Recapfinale/RecapFinale";
import Imagecar from "../../../assets/test.png";
const car = {
  imageUrl: Imagecar,
  name: "Alpine A110 Legends",
  type: "Sportive",
  seats: "2 Sièges",
  suitcases: "1 Valise",
  transmission: "automatique",
  doors: "3 Portes",
  minAge: "25 ans",
};

// Composants d'étape avec style Bootstrap
const StepOne = ({ next, deliveryInfo }) => (
  <div style={{ position: "relative", borderRadius: "30px !important" }}>
    <Container style={{ position: "relative", zIndex: "1" }} className="mt-5 ">
      <h2 className="mb-4">Étape 1: Informations personnelles</h2>
      <Row>
        <Col xs={12} md={12} lg={4} className="mb-3">
          <Col className="mb-3" xs={12}>
            <DateDisplayComponent deliveryInfo={deliveryInfo} />
          </Col>

          <Col xs={12}>
            <StationCard deliveryInfo={deliveryInfo} />
          </Col>
          <Col xs={12}>
            <EstimationLoc deliveryInfo={deliveryInfo} />
          </Col>
        </Col>

        <Col xs={12} md={12} lg={8} className="mb-3">
          <CarCardOverlay car={car} />
        </Col>
      </Row>

      <button className="btn btn-primary" onClick={next}>
        Suivant
      </button>
    </Container>
    <svg
      id="wave"
      style={{
        transform: "rotate(0deg)",
        transition: "0.3s",
        position: "absolute",
        bottom: "-30",
        left: "0",
        width: "100%",
        zIndex: "0",
        opacity: "0.5",
      }}
      viewBox="0 0 1440 170"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
          <stop stopColor="rgba(57.42, 56.411, 86.838, 1)" offset="0%"></stop>
          <stop stopColor="rgba(11, 35.968, 255, 1)" offset="100%"></stop>
        </linearGradient>
      </defs>
      <path
        style={{ transform: "translate(0, 0px)", opacity: 1 }}
        fill="url(#sw-gradient-0)"
        d="M0,102L24,102C48,102,96,102,144,85C192,68,240,34,288,17C336,0,384,0,432,14.2C480,28,528,57,576,68C624,79,672,74,720,59.5C768,45,816,23,864,14.2C912,6,960,11,1008,28.3C1056,45,1104,74,1152,85C1200,96,1248,91,1296,82.2C1344,74,1392,62,1440,62.3C1488,62,1536,74,1584,85C1632,96,1680,108,1728,113.3C1776,119,1824,119,1872,116.2C1920,113,1968,108,2016,107.7C2064,108,2112,113,2160,119C2208,125,2256,130,2304,116.2C2352,102,2400,68,2448,56.7C2496,45,2544,57,2592,68C2640,79,2688,91,2736,104.8C2784,119,2832,136,2880,130.3C2928,125,2976,96,3024,76.5C3072,57,3120,45,3168,34C3216,23,3264,11,3312,8.5C3360,6,3408,11,3432,14.2L3456,17L3456,170L3432,170C3408,170,3360,170,3312,170C3264,170,3216,170,3168,170C3120,170,3072,170,3024,170C2976,170,2928,170,2880,170C2832,170,2784,170,2736,170C2688,170,2640,170,2592,170C2544,170,2496,170,2448,170C2400,170,2352,170,2304,170C2256,170,2208,170,2160,170C2112,170,2064,170,2016,170C1968,170,1920,170,1872,170C1824,170,1776,170,1728,170C1680,170,1632,170,1584,170C1536,170,1488,170,1440,170C1392,170,1344,170,1296,170C1248,170,1200,170,1152,170C1104,170,1056,170,1008,170C960,170,912,170,864,170C816,170,768,170,720,170C672,170,624,170,576,170C528,170,480,170,432,170C384,170,336,170,288,170C240,170,192,170,144,170C96,170,48,170,24,170L0,170Z"
      />
      <defs>
        <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
          <stop
            stopColor="rgba(157.418, 147.959, 144.92, 1)"
            offset="0%"
          ></stop>
          <stop stopColor="rgba(255, 255, 255, 1)" offset="100%"></stop>
        </linearGradient>
      </defs>
      <path
        style={{ transform: "translate(0, 50px)", opacity: 0.9 }}
        fill="url(#sw-gradient-1)"
        d="M0,85L24,87.8C48,91,96,96,144,102C192,108,240,113,288,119C336,125,384,130,432,119C480,108,528,79,576,70.8C624,62,672,74,720,79.3C768,85,816,85,864,70.8C912,57,960,28,1008,28.3C1056,28,1104,57,1152,70.8C1200,85,1248,85,1296,70.8C1344,57,1392,28,1440,36.8C1488,45,1536,91,1584,99.2C1632,108,1680,79,1728,82.2C1776,85,1824,119,1872,127.5C1920,136,1968,119,2016,119C2064,119,2112,136,2160,136C2208,136,2256,119,2304,113.3C2352,108,2400,113,2448,113.3C2496,113,2544,108,2592,90.7C2640,74,2688,45,2736,53.8C2784,62,2832,108,2880,124.7C2928,142,2976,130,3024,116.2C3072,102,3120,85,3168,68C3216,51,3264,34,3312,31.2C3360,28,3408,40,3432,45.3L3456,51L3456,170L3432,170C3408,170,3360,170,3312,170C3264,170,3216,170,3168,170C3120,170,3072,170,3024,170C2976,170,2928,170,2880,170C2832,170,2784,170,2736,170C2688,170,2640,170,2592,170C2544,170,2496,170,2448,170C2400,170,2352,170,2304,170C2256,170,2208,170,2160,170C2112,170,2064,170,2016,170C1968,170,1920,170,1872,170C1824,170,1776,170,1728,170C1680,170,1632,170,1584,170C1536,170,1488,170,1440,170C1392,170,1344,170,1296,170C1248,170,1200,170,1152,170C1104,170,1056,170,1008,170C960,170,912,170,864,170C816,170,768,170,720,170C672,170,624,170,576,170C528,170,480,170,432,170C384,170,336,170,288,170C240,170,192,170,144,170C96,170,48,170,24,170L0,170Z"
      />
      <defs>
        <linearGradient id="sw-gradient-2" x1="0" x2="0" y1="1" y2="0">
          <stop stopColor="rgba(139.204, 33.84, 0, 1)" offset="0%"></stop>
          <stop stopColor="rgba(255, 11, 11, 1)" offset="100%"></stop>
        </linearGradient>
      </defs>
      <path
        style={{ transform: "translate(0, 100px)", opacity: 0.8 }}
        fill="url(#sw-gradient-2)"
        d="M0,51L24,53.8C48,57,96,62,144,56.7C192,51,240,34,288,39.7C336,45,384,74,432,76.5C480,79,528,57,576,45.3C624,34,672,34,720,53.8C768,74,816,113,864,107.7C912,102,960,51,1008,28.3C1056,6,1104,11,1152,36.8C1200,62,1248,108,1296,107.7C1344,108,1392,62,1440,45.3C1488,28,1536,40,1584,59.5C1632,79,1680,108,1728,113.3C1776,119,1824,102,1872,93.5C1920,85,1968,85,2016,93.5C2064,102,2112,119,2160,113.3C2208,108,2256,79,2304,68C2352,57,2400,62,2448,73.7C2496,85,2544,102,2592,90.7C2640,79,2688,40,2736,45.3C2784,51,2832,102,2880,124.7C2928,147,2976,142,3024,124.7C3072,108,3120,79,3168,56.7C3216,34,3264,17,3312,34C3360,51,3408,102,3432,127.5L3456,153L3456,170L3432,170C3408,170,3360,170,3312,170C3264,170,3216,170,3168,170C3120,170,3072,170,3024,170C2976,170,2928,170,2880,170C2832,170,2784,170,2736,170C2688,170,2640,170,2592,170C2544,170,2496,170,2448,170C2400,170,2352,170,2304,170C2256,170,2208,170,2160,170C2112,170,2064,170,2016,170C1968,170,1920,170,1872,170C1824,170,1776,170,1728,170C1680,170,1632,170,1584,170C1536,170,1488,170,1440,170C1392,170,1344,170,1296,170C1248,170,1200,170,1152,170C1104,170,1056,170,1008,170C960,170,912,170,864,170C816,170,768,170,720,170C672,170,624,170,576,170C528,170,480,170,432,170C384,170,336,170,288,170C240,170,192,170,144,170C96,170,48,170,24,170L0,170Z"
      />
    </svg>
  </div>
);

const StepTwo = ({ next, prev }) => (
  <div>
    <h2 className="mb-4">Étape 2: Détails supplémentaires</h2>
    <FormulaireLocation />
    <button className="btn btn-secondary me-2" onClick={prev}>
      Précédent
    </button>
    <button className="btn btn-primary" onClick={next}>
      Suivant
    </button>
  </div>
);

const StepThree = ({ prev, deliveryInfo }) => (
  <div style={{ position: "relative" }}>
    <h2 className="mb-4">Étape 3: Récap et confirmation</h2>
    <RecapFinale deliveryInfo={deliveryInfo} />
    <button className="btn btn-secondary" onClick={prev}>
      Précédent
    </button>
  </div>
);

function WizardComponent({ deliveryInfo }) {
  console.log(deliveryInfo);

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const infoComplete =
    deliveryInfo &&
    deliveryInfo.startDate &&
    deliveryInfo.startTime &&
    deliveryInfo.startLocation &&
    deliveryInfo.endDate &&
    deliveryInfo.endTime &&
    deliveryInfo.endLocation;

  if (!infoComplete) {
    return (
      <div className="alert alert-warning mt-5" role="alert">
        Certaines informations sont manquantes. Veuillez compléter tous les
        champs du formulaire.
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne deliveryInfo={deliveryInfo} next={nextStep} />;
      case 2:
        return (
          <FormulaireLocation deliveryInfo={deliveryInfo} next={nextStep} />
        );
      case 3:
        return <RecapFinale prev={prevStep} />;
      default:
        return <StepOne next={nextStep} />;
    }
  };

  return <div className="container mt-5">{renderStep()}</div>;
}

export default WizardComponent;
