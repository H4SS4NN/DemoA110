import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MyNavbar from "../navbar/navbar";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "../footer/footer";
import ScrollToTopButton from "../utils/ButtonTOp";

const ContactPage = () => {
  const recaptchaRef = React.createRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const recaptchaToken = await recaptchaRef.current.executeAsync();

    const formData = {
      name: event.target[0].value,
      firstName: event.target[1].value,
      phone: event.target[2].value,
      email: event.target[3].value,
      comment: event.target[4].value,
    };

    // Envoi des données et du token reCAPTCHA au backend
    console.log("Formulaire soumis", formData);
    console.log("Token reCAPTCHA", recaptchaToken);
  };

  return (
    <>
      <MyNavbar />

      <div className="mw-25 container pt-3 w-100">
        <h4 className="display-4 text-center">Contactez-nous</h4>
        <Row className="my-4 p-2">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" placeholder="Entrez votre nom" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>Prénom</Form.Label>
                <Form.Control type="text" placeholder="Entrez votre prénom" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Entrez votre numéro de téléphone"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adresse Email</Form.Label>
                <Form.Control type="email" placeholder="Entrez votre email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicComment">
                <Form.Label>Commentaire</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Votre commentaire"
                />
              </Form.Group>
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey="6LezOKwpAAAAAOKb0Jh4YBp6-bJvOHhSnp3dCI5G"
              />
              <Button
                className="btn btn-primary"
                style={{ backgroundColor: "#0160a4" }}
                type="submit"
              >
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
        <ScrollToTopButton />
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
