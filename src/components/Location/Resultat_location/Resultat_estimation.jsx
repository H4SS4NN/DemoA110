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

    const tarifs_semaine = [
      330, 297, 290.4, 283.8, 277.2, 270.6, 264, 257.4, 250.8, 244.2,
    ];

    //haute saison : 1er avril au 30 septembre
    const tarifs_weekend = [
      350, 315.0, 308.0, 301.0, 294.0, 287.0, 280.0, 273.0, 266.0, 259.0,
    ];
    //basse saison : 1er octobre au 31 mars
    const tarifs_weekend_basse_saison = [
      300, 261, 255.2, 249.4, 243.6, 237.8, 232, 226.2, 220.4, 214.6,
    ];

    const enHauteSaison = true;
    console.log(deliveryInfo.startDate);

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

    let prixTotal = 0;
    if (enHauteSaison) {
    }
    prixTotal +=
      joursEnSemaine > 0
        ? tarifs_semaine[Math.min(joursEnSemaine - 1, 9)] * joursEnSemaine
        : 0;
    prixTotal +=
      joursEnWeekend > 0
        ? tarifs_weekend[Math.min(joursEnWeekend - 1, 9)] * joursEnWeekend
        : 0;

    return prixTotal;
  };

  const prix = calculerPrix();

  return (
    <Card className="mt-3 shadow" style={{ maxWidth: "18rem", margin: "auto" }}>
      <Card.Body>
        <Card.Title>
          Estimation de la location <i class="bi bi-car-front"></i>
        </Card.Title>
        <Card.Text>
          Prix estimé: <strong>{prix.toFixed(2)} €</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EstimationLoc;
