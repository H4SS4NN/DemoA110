import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MyNavbar from "../navbar/navbar";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "../footer/footer";
import ScrollToTopButton from "../utils/ButtonTOp";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import config from "../../config";

const ContactPage = () => {
  const recaptchaRef = React.createRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("vérif de bots ...");
    if (event.target.elements.honeypot.value) {
      console.log("Détection de bot, soumission ignorée.");
      return;
    } else {
      console.log("Pas de bot détecté, soumission acceptée.");
    }

    const form = event.target;
    const formData = {
      name: form.elements.name.value,
      firstName: form.elements.firstName.value,
      phone: form.elements.phone.value,
      email: form.elements.email.value,
      comment: form.elements.comment.value,
    };
    const response = await fetch(`${config.API_URL}/send-contact-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("Contact email sent successfully");
      setIsSubmitted(true);
    } else {
      setErrorMessage(
        "Erreur lors de l'envoi du message. Veuillez réessayer plus tard."
      );
      console.error("Failed to send contact email");
    }
    console.log("Formulaire soumis", formData);
  };

  return (
    <>
      <MyNavbar />

      <Container className="pt-3 w-100">
        <h4 className="display-4 text-center">Contactez-nous</h4>
        {isSubmitted ? (
          <Alert variant="success" className="mt-3">
            <i className="fas fa-check-circle fa-3x"></i>
            Votre demande a été prise en compte. Nous vous répondrons ou
            appellerons dans les plus brefs délais.
          </Alert>
        ) : (
          <Row className="my-4 p-2">
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Col md={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Entrez votre nom"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    name="firstName"
                    type="text"
                    placeholder="Entrez votre prénom"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Téléphone</Form.Label>
                  <Form.Control
                    name="phone"
                    type="tel"
                    placeholder="Entrez votre numéro de téléphone"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Adresse Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Entrez votre email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicComment">
                  <Form.Label>Commentaire</Form.Label>
                  <Form.Control
                    name="comment"
                    as="textarea"
                    rows={3}
                    placeholder="Votre commentaire"
                    required
                  />
                </Form.Group>

                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey="votre_clé_site"
                />

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="J'accepte la politique de confidentialité et les termes et conditions."
                    required
                  />
                </Form.Group>

                <p>
                  En soumettant ce formulaire, vous acceptez que vos données
                  soient traitées conformément à notre politique de
                  confidentialité .
                </p>
                <div style={{ display: "none" }}>
                  <Form.Control type="text" name="honeypot" />
                </div>

                <Button variant="primary" type="submit">
                  Envoyer
                </Button>
              </Form>
            </Col>

            <Col
              className="p-3"
              style={{
                backgroundColor: "#d23847",
                color: "white",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
              }}
              md={6}
            >
              <h2>Adresse :</h2>
              <p>
                12 Avenue des Prés
                <br />
                78180 Montigny-le-Bretonneux
                <br />
                France
              </p>
              <br />
              <p>
                <strong>Téléphone:</strong> +33 1 23 45 67 89
                <br />
                <strong>
                  Email:{" "}
                  <a href="mailto:contact78@a110.club">contact78@a110.club</a>
                </strong>
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2629.317503786923!2d2.013262426959874!3d48.77582845651245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6814e6f757357%3A0x1b563a7dbabb47be!2s12%20Av.%20des%20Pr%C3%A9s%2C%2078180%20Montigny-le-Bretonneux!5e0!3m2!1sfr!2sfr!4v1709718663631!5m2!1sfr!2sfr"
                width="100%"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Col>
          </Row>
        )}
        <ScrollToTopButton />
      </Container>

      <Footer />
    </>
  );
};

export default ContactPage;
