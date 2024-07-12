import React from "react";
import MyNavbar from "../navbar/navbar";
import FirstPart from "./firstpart";
import SecondPart from "./secondpart";
import StepsComponent from "./secondpart";
import SpecificationTech from "./Specificationtech";
import PourquoiNousChoisir from "./Pourquoi";
import VoiturePresentation from "./Iconedestyle";
import CommentairesClients from "./Comentaire";
import Footer from "../footer/footer";
import HistoryComponent from "../History/history";
import PricingPlans from "../pricing/price";
import ResultatLocation from "../Location/Resultat_location/Result_Location";
import RecapFinale from "../Location/Formulaire_location/Recapfinale/RecapFinale";
import ScrollToTopButton from "../utils/ButtonTOp";
import CookieConsentBanner from "../cookies/cookieConsent";

const Home = () => {
  return (
    <>
      <CookieConsentBanner />
      <MyNavbar />

      <FirstPart />
      <StepsComponent />
      <ScrollToTopButton />
      <SpecificationTech />
      <PourquoiNousChoisir />
      <VoiturePresentation />
      <CommentairesClients />
      <Footer />
    </>
  );
};

export default Home;
