import React from "react";
import { Card, Button, ListGroup, Navbar, Container } from "react-bootstrap";
import MyNavbar from "../navbar/navbar";
import CarCard from "../Location/Details_Location/card_voiture";
import FAQAccordion from "./FAQ";
import WizardComponent from "../Location/Formulaire_location/TestBootstrap";
import Footer from "../footer/footer";
import ScrollToTopButton from "../utils/ButtonTOp";
import RentalTerms from "./condition";

const PricingPlans = () => {
  return (
    <>
      <MyNavbar />

      <Container className="p-5">
        <h1 className="h1">
          <span>Foire aux question ?</span>
        </h1>
        <FAQAccordion />
        <RentalTerms />
      </Container>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default PricingPlans;
