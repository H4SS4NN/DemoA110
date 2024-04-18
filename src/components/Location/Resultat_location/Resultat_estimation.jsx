import React from "react";
import { Card } from "react-bootstrap";

const EstimationLoc = ({ deliveryInfo }) => {
  const convertirDateFRVersISO = (dateFR) => {
    const [jour, mois, annee] = dateFR.split("/");
    return `${annee}-${mois.padStart(2, "0")}-${jour.padStart(2, "0")}`;
  };

  const calculerPrix = () => {
    const dateDebutISO = convertirDateFRVersISO(deliveryInfo.startDate);
    const dateFinISO = convertirDateFRVersISO(deliveryInfo.endDate);

    const dateDebut = new Date(dateDebutISO);
    const dateFin = new Date(dateFinISO);

    let joursEnSemaine = 0;
    let joursEnWeekend = 0;
    let jourActuel = new Date(dateDebut);

    while (jourActuel <= dateFin) {
      const dayOfWeek = jourActuel.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        joursEnWeekend++;
      } else {
        joursEnSemaine++;
      }
      jourActuel.setDate(jourActuel.getDate() + 1);
    }

    const prixBaseParJour = 330; // Prix de base par jour
    const totalJours = joursEnSemaine + joursEnWeekend;
    const prixBaseTotal = prixBaseParJour * totalJours;

    let prixTotal = 0;
    // Les calculs spécifiques des tarifs par nombre de jours en semaine et weekend
    prixTotal += joursEnSemaine * (joursEnSemaine <= 10 ? 297 : 277.2); // Simplification pour exemple
    prixTotal += joursEnWeekend * (joursEnWeekend <= 10 ? 315.0 : 266.0);

    const reduction = prixBaseTotal - prixTotal;
    const pourcentageReduction = (reduction / prixBaseTotal) * 100;

    return { prixTotal, prixBaseTotal, reduction, pourcentageReduction };
  };

  const { prixTotal, prixBaseTotal, reduction, pourcentageReduction } =
    calculerPrix();

  return (
    <Card className="mt-3 shadow" style={{ maxWidth: "18rem", margin: "auto" }}>
      <Card.Body>
        <Card.Title>
          Estimation de la location <i className="bi bi-car-front"></i>
        </Card.Title>
        <Card.Text style={{ textAlign: "center" }}>
          <strong>
            <strike>{prixBaseTotal.toFixed(2)} €</strike>{" "}
            <i className="bi bi-arrow-right"></i> {prixTotal.toFixed(2)} €
          </strong>
        </Card.Text>
        <Card.Text style={{ textAlign: "center" }}>
          Réduction : <strong>{reduction.toFixed(2)} €</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EstimationLoc;
