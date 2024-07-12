import React from "react";
import { useState } from "react";

const offers = [
  {
    title: "Jour week-end",
    price: "300 € TTC",
    details: [
      "Du samedi au dimanche",
      "Inclus 250 Kms/jour",
      "Tarif dégressif",
      "Prix Km supp. : 1,00€ TTC",
    ],
  },
  {
    title: "Jour semaine",
    price: "290 € TTC",
    details: [
      "Du Lundi au Vendredi",
      "Plage horaire : 09h00 à 18h00",
      "Inclus 250 Kms/jour",
      "Prix Km supp. : 1,00€ TTC",
    ],
  },
  {
    title: "Tarif horaire",
    price: "75 € TTC",
    details: [
      "Du lundi au samedi de 09h00 à 18h00",
      "Toute heure dépassée de 15 min est dûe",
    ],
  },
  {
    title: "Baptême",
    price: "65 € TTC",
    details: [
      "Conduite avec accompagnateur",
      "Créneaux disponibles du lundi au samedi de 09h00 à 13h00 puis de 14h00 à 18h00",
    ],
  },
];

const OfferCard = ({ offer }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title text-primary mb-0">{offer.title}</h5>
            <button
              className="btn btn-link text-primary"
              onClick={handleToggleDetails}
            >
              <i
                className={`bi ${
                  showDetails ? "bi-chevron-up" : "bi-chevron-down"
                }`}
              ></i>
            </button>
          </div>
          <h6 className="card-subtitle mb-2 text-muted">{offer.price}</h6>
          <div
            className={`collapse ${showDetails ? "show" : ""}`}
            style={{ transition: "height 0.3s ease" }}
          >
            <ul className="list-group list-group-flush">
              {offer.details.map((detail, index) => (
                <li className="list-group-item" key={index}>
                  <i className="bi bi-check-lg text-success"></i> {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const OfferCards = () => {
  return (
    <div className="container my-5">
      <div className="row">
        {offers.map((offer, index) => (
          <OfferCard offer={offer} key={index} />
        ))}
      </div>
    </div>
  );
};

export default OfferCards;
