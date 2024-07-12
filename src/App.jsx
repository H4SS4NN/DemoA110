import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import HistoryAlpine from "./components/History/history";
import Home from "./components/home/home";
import PricingPlans from "./components/pricing/price";
import Contact from "./components/Contact/Contact";
import ResultatLocation from "./components/Location/Resultat_location/Result_Location";
import FormulaireLocation from "./components/Location/Formulaire_location/Formulaire_location";
import LoginPage from "./components/Admin/Components/Connexion";
import LegalNotice from "./components/Annexe/MentionLegale";
import GDPRPrivacyStatement from "./components/Annexe/Confidentialite";

import EventPage from "./components/Event/event";
import RegistrationForm from "./components/Admin/PageCollectedonnées/Entreprise";
import RegistrationFormEntreprise from "./components/Admin/PageCollectedonnées/Entreprise";
import ParticuliersList from "./components/Admin/Components/Listepage/particulier/ParticulierList";
import ProfessionnelsList from "./components/Admin/Components/Listepage/professionel/professionelList";
import ProfessionnelDetails from "./components/Admin/Components/Listepage/professionel/details";
import ParticulierDetails from "./components/Admin/Components/Listepage/particulier/Particulierdetails";
import AddReservedDates from "./components/Admin/Components/datevalidee/adddate";
import AddEventForm from "./components/Admin/Components/evenements/addevenements";
import NavbarAdmin from "./components/Admin/navbar/navbarAdmin";
import EditReservationPage from "./components/Admin/Components/reservations/editreservationpage";

const App = () => {
  const [key, setKey] = useState(0);
  return (
    <Router>
      <Routes>
        <Route path="/History" element={<HistoryAlpine key={key} />} />
        <Route path="/" element={<LoginPage key={key} />} />
        <Route path="/Aide" element={<PricingPlans key={key} />} />
        <Route path="/Contact" element={<Contact key={key} />} />
        <Route path="/estimation" element={<ResultatLocation key={key} />} />
        <Route
          path="/renseignement"
          element={<FormulaireLocation key={key} />}
        />
        <Route path="/administration" element={<LoginPage key={key} />} />
        <Route path="/admin" element={<NavbarAdmin key={key} />} />
        <Route path="/mentionLegale" element={<LegalNotice key={key} />} />
        <Route
          path="/Confidentialite"
          element={<GDPRPrivacyStatement key={key} />}
        />
        <Route path="/Events" element={<EventPage />} />
        <Route path="/Loc_part" element={<RegistrationForm />} />
        <Route path="/Loc_pro" element={<RegistrationFormEntreprise />} />
        <Route path="/Loc_Contact" element={<ParticuliersList />} />
        <Route path="/Contact_pro" element={<ProfessionnelsList />} />
        <Route path="/professionnels" element={<ProfessionnelsList />} />
        <Route path="/professionnel/:id" element={<ProfessionnelDetails />} />
        <Route path="/particuliers/:id" element={<ParticulierDetails />} />
        <Route path="/Optiondates" element={<AddReservedDates />} />
        <Route path="/ajoutevent" element={<AddEventForm />} />
        <Route path="/edit-reservation/:id" element={<EditReservationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
