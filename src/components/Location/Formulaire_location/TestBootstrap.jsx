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
  minAge: "27 ans",
};


const StepOne = ({ next, deliveryInfo }) => (
  <div style={{ position: "relative", borderRadius: "30px !important" }}>
    <Container style={{ position: "relative", zIndex: "1" }} className="mt-5 ">
      <h2 className="mb-4">Étape 1: Informations personnelles</h2>
      <Row className="align-items-center">
        <Col xs={12} md={12} lg={4} className="mb-3">
          <Col className="mb-3" xs={12}>
            <DateDisplayComponent deliveryInfo={deliveryInfo} />
          </Col>
          <Col className="mb-4" xs={12}>
            <EstimationLoc deliveryInfo={deliveryInfo} />
          </Col>

          <Col xs={12}>
            <StationCard deliveryInfo={deliveryInfo} />
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
