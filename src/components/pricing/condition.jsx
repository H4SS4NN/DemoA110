import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import conditionsGenerales from "../../assets/2024_CONDITIONS_GENERALES_LOCATIONS_PHOENIX78.pdf";

const RentalTerms = () => (
  <div className="container my-5">
    <h2 className="mb-4">Conditions de Location</h2>
    <div className="row g-4">
      <TermCard
        icon="credit-card-2-front"
        title="Permis de conduire"
        description="Vous devez être agé(e) de 27 ans et être titulaire d’un permis de conduire valide depuis au moins 9 ans. Veuillez nous envoyer une copie de votre permis de conduite par e-mail à contact78@a110.club au moins 48 heures avant le début de la location."
      />
      <TermCard
        icon="bank2"
        title="Dépôt de garantie"
        description="Un dépôt de garantie (caution) sera exigé lors de la prise en charge du véhicule. Le montant du dépôt est fixé à 3.000 euros et sera restitué intégralement à la fin de la location, sous réserve de l’état du véhicule après inspection."
      />
      <TermCard
        icon="shield"
        title="Assurance"
        description="Le véhicule est assuré avec une responsabilité civile, garantie conducteur à concurrence de 500.000 euros, bris de glaces, dommages tous accidents."
      />
      <TermCard
        icon="speedometer"
        title="Kilométrage"
        description="Le forfait kilométrique quotidien est de 250 kms. Des frais supplémentaires seront facturés en cas de dépassement du kilométrage inclus."
      />
      <TermCard
        icon="ban"
        title="Utilisation du véhicule"
        description="Le véhicule doit être utilisé conformément aux lois et réglementations en vigueur. Il est interdit de conduire le véhicule sous l’influence de l’alcool, de drogues ou de tout autre substance pouvant affecter la capacité de conduite. La conduite sur circuit est interdite."
      />
      <TermCard
        icon="fuel-pump"
        title="Carburant"
        description="Le véhicule doit être restitué avec le plein de carburant (SP98). Si le véhicule est retourné avec un niveau inférieur, des frais supplémentaires seront facturés pour le remplissage du réservoir."
      />
      <TermCard
        icon="calendar-x"
        title="Annulation"
        description="En cas d’annulation de la réservation, veuillez nous en informer au moins 48 heures avant le début de la location. Les annulations tardives peuvent entrainer des frais."
      />
      <TermCard
        icon="clock"
        title="Restitution du véhicule"
        description="Le véhicule doit être restitué à l’heure convenue à la fin de la période de location. Tout retard non préalablement convenu entrainera des frais supplémentaires."
      />
    </div>
    <Button className="m-3" target="/blank" href={conditionsGenerales}>
      Condition Géneral
    </Button>
  </div>
);

const TermCard = ({ icon, title, description }) => (
  <div className="col-md-6">
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">
          <i className={`bi bi-${icon} me-2`}></i>
          {title}
        </h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  </div>
);

export default RentalTerms;
