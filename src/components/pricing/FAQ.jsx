import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css"; // Assurez-vous que Bootstrap est bien importé
import "bootstrap-icons/font/bootstrap-icons.css"; // Importation des icônes Bootstrap

const FAQPage = () => {
  return (
    <div className="container py-5">
      <Accordion defaultActiveKey="0">
        {/* Accordion 1 */}
        <Accordion.Item eventKey="0" className="mb-4 shadow">
          <Accordion.Header>
            <i className="bi bi-info-circle-fill me-2"></i>
            Questions générales sur la location
          </Accordion.Header>
          <Accordion.Body>
            <Card.Body>
              <h5 className="mb-3">
                <b>
                  Quelles sont les conditions d'âge pour louer une Alpine A110 ?
                </b>
              </h5>
              <p>
                Vous devez être âgé(e) de 27 ans et être titulaire d'un permis
                de conduire valide depuis au moins 9 ans.
              </p>
            </Card.Body>
            <Card.Body>
              <h5 className="mb-3">
                <b>
                  {" "}
                  Est-il nécessaire de laisser une caution pour la location de
                  l'Alpine A110 ?
                </b>
              </h5>
              <p>
                Oui, un dépôt de garantie de 3.000 € sera exigé et sera restitué
                intégralement à la fin de la location, sous réserve de l'état du
                véhicule après inspection.
              </p>
            </Card.Body>
            <Card.Body>
              <h5 className="mb-3">
                <b>Puis-je conduire l'Alpine A110 à l'étranger ?</b>
              </h5>
              <p>
                La circulation dans les pays étrangers nécessite une validation
                préalable de l'Agence.
              </p>
            </Card.Body>
            <Card.Body>
              <h5 className="mb-3">
                <b>
                  {" "}
                  Quels sont les documents nécessaires pour louer une Alpine
                  A110 ?
                </b>
              </h5>
              <p>
                <u> Particuliers : </u> Permis de conduire en cours de validité,
                un justificatif de domicile de moins de trois mois (facture
                d'énergie ou de télécom), une pièce d'identité, un moyen de
                paiement, une adresse courriel valide et un numéro de téléphone
                mobile.
              </p>
              <p>
                <u> Entreprises : </u>Permis de conduire en cours de validité,
                un extrait Kbis de moins de trois mois, un pouvoir du mandataire
                social accompagné d'un bon de commande et de sa copie de pièce
                d'identité, un moyen de paiement, une adresse courriel valide et
                un numéro de téléphone mobile.
              </p>
            </Card.Body>
          </Accordion.Body>
        </Accordion.Item>

        {/* Accordion 2 */}
        <Accordion.Item eventKey="1" className="mb-4 shadow">
          <Accordion.Header>
            <i className="bi bi-geo-fill me-2"></i>
            Questions sur les lieux de prise en charge
          </Accordion.Header>
          <Accordion.Body>
            <Card.Body>
              <h5 className="mb-3">
                <b> Puis-je récupérer le véhicule à l'étranger ?</b>
              </h5>
              <p>
                La prise en charge du véhicule doit se faire à notre agence
                située au 12 avenue des prés, 78180 Montigny-le-Bretonneux.
              </p>
            </Card.Body>
            <Card.Body>
              <h5 className="mb-3">
                <b>Où rendre le véhicule à la fin de la location ?</b>
              </h5>
              <p>
                Le véhicule doit être restitué à notre agence au même endroit où
                il a été récupéré.
              </p>
            </Card.Body>
          </Accordion.Body>
        </Accordion.Item>

        {/* Accordion 3 */}
        <Accordion.Item eventKey="2" className="mb-4 shadow">
          <Accordion.Header>
            <i className="bi bi-card-heading-fill me-2"></i>
            Questions sur les modalités de paiement
          </Accordion.Header>
          <Accordion.Body>
            <Card.Body>
              <h5 className="mb-3">
                <b> Quels sont les moyens de paiement acceptés ?</b>
              </h5>
              <p>
                Nous acceptons les espèces ainsi que les cartes de crédits
                (Visa, MasterCard...).
              </p>
            </Card.Body>
            <Card.Body>
              <h5 className="mb-3">
                <b> Y a-t-il un paiement en plusieurs fois possible ?</b>
              </h5>
              <p>
                Non, le paiement doit être effectué en une seule fois au début
                de la location.
              </p>
            </Card.Body>
          </Accordion.Body>
        </Accordion.Item>

        {/* Accordion 4 */}
        <Accordion.Item eventKey="3" className="mb-4 shadow">
          <Accordion.Header>
            <i className="bi bi-telephone-fill me-2"></i>
            Questions sur le service client
          </Accordion.Header>
          <Accordion.Body>
            <Card.Body>
              <h5 className="mb-3">
                <b> Comment contacter le service client en cas de problème ?</b>
              </h5>
              <p>
                Vous pouvez nous contacter par téléphone au 01 23 45 67 89 ou
                par email à contact@location-a110.com.
              </p>
            </Card.Body>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FAQPage;
