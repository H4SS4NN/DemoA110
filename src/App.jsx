import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import HistoryAlpine from "./components/History/history";
import Home from "./components/home/home";
import PricingPlans from "./components/pricing/price";
import Contact from "./components/Contact/Contact";
import ResultatLocation from "./components/Location/Resultat_location/Result_Location";
import FormulaireLocation from "./components/Location/Formulaire_location/Formulaire_location";
import LoginPage from "./components/Admin/Components/Connexion";
import Dashboard from "./components/Admin/Components/Tableaudebord";
import LegalNotice from "./components/Annexe/MentionLegale";
import GDPRPrivacyStatement from "./components/Annexe/Confidentialite";
import EventPage from "./components/Admin/Components/Event/event";
import RegistrationForm from "./components/PageCollectedonnées/Particulier";
import RegistrationFormEntreprise from "./components/PageCollectedonnées/Entreprise";
import ParticuliersList from "./components/PageCollectedonnées/contact";
import ProfessionnelsList from "./components/PageCollectedonnées/contactPro";
import ProfessionnelDetails from "./components/PageCollectedonnées/details";
import ParticulierDetails from "./components/PageCollectedonnées/Particulierdetails";

const App = () => {
  const [key, setKey] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/History" element={<HistoryAlpine key={key} />} />
        <Route path="/" element={<Home key={key} />} />
        <Route path="/Price" element={<PricingPlans key={key} />} />
        <Route path="/Contact" element={<Contact key={key} />} />
        <Route path="/estimation" element={<ResultatLocation key={key} />} />
        <Route
          path="/renseignement"
          element={<FormulaireLocation key={key} />}
        />
        <Route path="/administration" element={<LoginPage key={key} />} />
        <Route path="/admin" element={<Dashboard key={key} />} />
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
      </Routes>
    </Router>
  );
};

export default App;
