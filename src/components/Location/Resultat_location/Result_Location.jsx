import CarCardOverlay from "./Result_Carcard";

import DateDisplayComponent from "./Result_date";
import StationCard from "./Resultat_station";
import { Container, Row, Col } from "react-bootstrap";
import EstimationLoc from "./Resultat_estimation";
import ImageAlpine from "../../../assets/test.png";
import { Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
const car = {
  imageUrl: ImageAlpine,
  name: "Alpine A110 Legends",
  type: "Sportive",
  seats: "2 Sièges",
  suitcases: "1 Valise",
  transmission: "automatique",
  doors: "3 Portes",
  minAge: "27 ans",
};

const ResultatLocation = ({ deliveryInfo }) => {
  const navigate = useNavigate();
  const { activeStep, nextStep } = useSteps(); // Accéder à activeStep via useSteps

  const handleNextStep = () => {
    nextStep();
    navigate("/renseignement"); // Utilisez navigate pour la navigation
  };
  console.log(deliveryInfo);

  const infoComplete =
    deliveryInfo &&
    deliveryInfo.startDate &&
    deliveryInfo.startTime &&
    deliveryInfo.startLocation &&
    deliveryInfo.endDate &&
    deliveryInfo.endTime &&
    deliveryInfo.endLocation;

  if (!deliveryInfo) {
    console.log("deliveryInfo is null");
  } else {
    return (
      <>
        {!infoComplete ? (
          <div className="alert alert-warning mt-5" role="alert">
            Certaines informations sont manquantes. Veuillez compléter tous les
            champs du formulaire.
          </div>
        ) : (
          <Container className="mt-5 ">
            <Row>
              <Col xs={12} md={12} lg={4} className="mb-3">
                <Col className="mb-3" xs={12}>
                  <DateDisplayComponent deliveryInfo={deliveryInfo} />
                </Col>
                <Col className="mb-3" xs={12}>
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
          </Container>
        )}
      </>
    );
  }
};

export default ResultatLocation;
