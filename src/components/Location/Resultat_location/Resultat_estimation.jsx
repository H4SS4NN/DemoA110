import React from "react";
import { Card } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const EstimationLoc = ({ deliveryInfo }) => {
  const convertirDateEtHeureFRVersISO = (dateFR, heure) => {
    const [jour, mois, annee] = dateFR.split("/");
    return new Date(
      `${annee}-${mois.padStart(2, "0")}-${jour.padStart(2, "0")}T${heure}`
    );
  };

  const calculerPrix = () => {
    const tarifBaseSemaine = 290;
    const tarifBaseWeekend = 350;
    const reductions = [1, 0.92, 0.90, 0.88, 0.86, 0.84, 0.82, 0.80, 0.78, 0.76];

    // Conversion des dates et heures en format ISO
    const dateTimeDebut = convertirDateEtHeureFRVersISO(
      deliveryInfo.startDate,
      deliveryInfo.startTime
    );
    const dateTimeFin = convertirDateEtHeureFRVersISO(
      deliveryInfo.endDate,
      deliveryInfo.endTime
    );

    // Calcul du temps total en millisecondes et conversion en heures et jours
    let totalMilliseconds = dateTimeFin - dateTimeDebut;
    let totalHours = totalMilliseconds / (1000 * 60 * 60); // Convertir en heures
    let totalDays = Math.ceil(totalHours / 24); // Convertir en jours complets

    // Trouver l'index de la réduction correspondant au nombre de jours
    let reductionIndex = Math.min(totalDays - 1, reductions.length - 1);
    let reduction = reductions[reductionIndex];

    // Calculer le prix total en fonction du type de jour
    let prixTotalSansReduction = 0;
    let prixTotalAvecReduction = 0;
    let currentDateTime = new Date(dateTimeDebut);

    for (let i = 0; i < totalDays; i++) {
      let dayOfWeek = currentDateTime.getDay();
      let tarifBase;

      // Vérifier si la période chevauche de vendredi 12h à samedi 12h
      if (
        (dayOfWeek === 5 && currentDateTime.getHours() >= 12) ||
        (dayOfWeek === 6 && currentDateTime.getHours() < 12)
      ) {
        tarifBase = tarifBaseWeekend;
      } else {
        tarifBase = (dayOfWeek === 0 || dayOfWeek === 6) ? tarifBaseWeekend : tarifBaseSemaine;
      }

      prixTotalSansReduction += tarifBase;
      prixTotalAvecReduction += tarifBase * reduction;
      currentDateTime.setDate(currentDateTime.getDate() + 1);
    }

    return { prixTotalSansReduction, prixTotalAvecReduction };
  };

  const { prixTotalSansReduction, prixTotalAvecReduction } = calculerPrix();

  return (
    <Card className="mt-3 shadow" style={{ maxWidth: "18rem", margin: "auto" }}>
      <Card.Body>
        <Card.Title className="text-center">
          Estimation de la location <i className="bi bi-car-front"></i>
        </Card.Title>
        <Card.Text className="d-flex justify-content-center align-items-center">
          <span style={{ textDecoration: 'line-through', marginRight: '10px' }}>
            {prixTotalSansReduction.toFixed(2)} €
          </span>
          <i className="bi bi-arrow-right" style={{ marginRight: '10px' }}></i>
          <span>
            <strong>{prixTotalAvecReduction.toFixed(2)} €</strong>
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EstimationLoc;
