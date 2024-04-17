import React from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import MyNavbar from "../navbar/navbar";
import Footer from "../footer/footer";

const GDPRPrivacyStatement = () => {
  return (
    <>
      <MyNavbar />
      <Container className="my-5">
        <h1 className="text-center h2 mb-5">
          Déclarations de Confidentialité RGPD
        </h1>

        <Card className="mb-4 shadow">
          <Card.Body>
            <Card.Text>
              Nous vous remercions de votre visite sur notre site Internet et de
              votre intérêt pour notre entreprise. Nous considérons la
              protection des données comme un gage de qualité envers notre
              clientèle. La protection de vos données personnelles et le respect
              de vos droits personnels revêtent pour nous une grande importance.
            </Card.Text>
            <Card.Text>
              Avec cette déclaration de confidentialité, nous souhaitons
              expliquer de manière transparente à tous les visiteurs de notre
              site Internet la nature, l’étendue et la finalité des données à
              caractère personnel que nous collectons, utilisons et traitons, et
              vous informer de vos droits.
            </Card.Text>
          </Card.Body>
        </Card>

        {/* Répétez la structure de la carte pour les autres sections du texte */}

        <ListGroup variant="flush" className="shadow">
          <ListGroup.Item>
            <h2 className="h5">Coordonnées du responsable du traitement</h2>
            <address>
              <strong>Entreprise :</strong> SAS PHOENIX78
              <br />
              Rue François Geoffre
              <br />
              78180 Montigny-le-Bretonneux
              <br />
              <strong>Tél.:</strong> +33 (0)1 86 90 08 98
              <br />
              <strong>E-mail :</strong> contact78@a110.club
            </address>
          </ListGroup.Item>

          <ListGroup.Item>
            <h2 className="h5">Délégué à la protection des données</h2>
            <p>Franck DECKER</p>
            <p>
              <strong>Tél.:</strong> +33 (0)1 86 90 08 98
            </p>
            <p>
              <strong>E-mail :</strong> f.decker@ortrium.fr
            </p>
          </ListGroup.Item>
        </ListGroup>

        {/* ... Autres sections ... */}

        <Card className="mt-5 mb-3 shadow">
          <Card.Body>
            <h2 className="h5">
              Droits en matière de protection des données de la personne
              concernée
            </h2>
            <Card.Text>
              Vous disposez de plusieurs droits concernant vos données à
              caractère personnel, incluant le droit d'accès, de rectification,
              d'effacement ("droit à l'oubli"), de portabilité des données,
              d'opposition, et de retrait du consentement. Ces droits vous
              permettent de contrôler l'utilisation de vos informations
              personnelles.
            </Card.Text>
            <Card.Text>
              Pour toute question portant sur vos données à caractère personnel,
              vous pouvez à tout moment nous contacter par écrit.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default GDPRPrivacyStatement;
