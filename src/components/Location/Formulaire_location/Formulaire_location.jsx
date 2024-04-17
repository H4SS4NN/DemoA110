import React, { useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import EstimationLoc from "../Resultat_location/Resultat_estimation";
import StationCard from "../Resultat_location/Resultat_station";
import DateDisplayComponent from "../Resultat_location/Result_date";
import { useState } from "react";
import { Alert } from "react-bootstrap";

const FormulaireLocation = ({ next, deliveryInfo }) => {
  console.log(deliveryInfo);
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

  console.log(prix);

  const formRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const convertDateToISO = (dateString) => {
      const [day, month, year] = dateString.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    };

    const convertedStartDate = convertDateToISO(deliveryInfo.startDate);
    const convertedEndDate = convertDateToISO(deliveryInfo.endDate);

    const formData = new FormData(event.currentTarget);

    const formValues = {
      nom: formData.get("nom"),
      prenom: formData.get("prenom"),
      email: formData.get("email"),
      telephone: formData.get("telephone"),
      commentaire: formData.get("commentaire"),
      date_debut: convertedStartDate,
      date_fin: convertedEndDate,
      lieu_depart: deliveryInfo.startLocation,
      lieu_arrivee: deliveryInfo.endLocation,
      heure_depart: deliveryInfo.startTime,
      heure_retour: deliveryInfo.endTime,
      prix_estime: prix,
    };

    try {
      const response = await fetch("http://localhost:3000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi des données au serveur");
      }

      console.log("Données envoyées avec succès au serveur");
      alert("Votre réservation a été soumise avec succès.");
      setIsSubmitted(true);

      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      alert(
        "Une erreur est survenue lors de la soumission de votre formulaire."
      );
    }
  };
  if (isSubmitted) {
    return (
      <Container className="text-center">
        <Alert variant="success" className="mt-5">
          <i className="fas fa-check-circle fa-3x"></i>
          <Alert.Heading>
            Demande de location envoyée avec succès!
          </Alert.Heading>
          <p>
            <i className="fas fa-check-circle"></i> Votre demande a été soumise
            et sera traitée prochainement.
          </p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col lg={8}>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1 className="h3 mb-3">Formulaire de location</h1>

            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                placeholder="Entrez votre nom"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupFirstName">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                name="prenom"
                placeholder="Entrez votre prénom"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Adresse email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Entrez votre email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPhone">
              <Form.Label>Numéro de téléphone</Form.Label>
              <Form.Control
                type="tel"
                name="telephone"
                placeholder="Entrez votre numéro de téléphone"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupComment">
              <Form.Label>Commentaire</Form.Label>
              <Form.Control
                as="textarea"
                name="commentaire"
                rows={3}
                placeholder="Laissez un commentaire (facultatif)"
              />
            </Form.Group>

            <Button variant="primary" type="">
              Confirmer la location
            </Button>
          </Form>
        </Col>
        <Col lg={4} className="mt-5">
          <div className="bg-light p-4 rounded">
            <h4>Détails de la réservation</h4>
            <DateDisplayComponent deliveryInfo={deliveryInfo} />
            <StationCard deliveryInfo={deliveryInfo} />
            <EstimationLoc deliveryInfo={deliveryInfo} prix={prix} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FormulaireLocation;
