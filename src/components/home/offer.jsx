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
  const [detailsMaxHeight, setDetailsMaxHeight] = useState("0px");

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
    // Set a max-height for the transition effect. This value may need to be adjusted depending on your content
    setDetailsMaxHeight(showDetails ? "0px" : `${offer.details.length * 56}px`);
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title text-primary mb-0">{offer.title}</h5>
            <i className="bi bi-info-circle-fill text-primary"></i>{" "}
            {/* Change the icon as needed */}
          </div>
          <h6 className="card-subtitle mb-2 text-muted">{offer.price}</h6>
          <div
            style={{
              maxHeight: detailsMaxHeight,
              overflow: "hidden",
              transition: "max-height 0.5s ease",
            }}
          >
            <ul className="list-group list-group-flush mb-3">
              {offer.details.map((detail, index) => (
                <li className="list-group-item" key={index}>
                  <i className="bi bi-check-lg text-success"></i> {detail}
                </li>
              ))}
            </ul>
          </div>
          <button
            className="btn btn-outline-primary btn-sm mb-2"
            onClick={handleToggleDetails}
          >
            {showDetails ? "Cacher les détails" : "Afficher les détails"}
          </button>
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
