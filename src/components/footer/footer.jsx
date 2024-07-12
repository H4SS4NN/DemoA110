import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../../assets/logoPhoenix78.png";

const Footer = () => {
  let navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <footer className="bg-light text-center text-lg-start">
      <Container className="p-4">
        <Row className="align-items-center">
          <Col lg={4} md={6} className="mb-4">
            <img width={50} src={logo} alt="Logo" />
            <p>
              SAS PHOENIX78 <br />
              Rue François Geoffre 78180 <br />
              Montigny-le-Bretonneux <br />
              <a href="tel:+33186900898">Tél.: +33 (0)1 86 90 08 98</a> <br />
              <a href="mailto:contact78@a110.club">contact78@a110.club</a>
            </p>
            <div>
              <a href="#" className="me-2 text-reset">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="me-2 text-reset">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="me-2 text-reset">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <h5 className="text-uppercase mb-4">À propos</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <NavLink
                  to="/Events"
                  className="text-reset"
                  onClick={() => handleNavigation("/Events")}
                >
                  <i className="bi bi-card-list me-2"></i>Evenements
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/Aide"
                  className="text-reset"
                  onClick={() => handleNavigation("/Aide")}
                >
                  <i className="bi bi-question-circle-fill"></i>FAQ
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/History"
                  className="text-reset"
                  onClick={() => handleNavigation("/History")}
                >
                  <i className="bi bi-book-half me-2"></i>Histoire
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="/mentionLegale"
                  className="text-reset"
                  onClick={() => handleNavigation("/mentionLegale")}
                >
                  Mentions légales
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Confidentialite"
                  className="text-reset"
                  onClick={() => handleNavigation("/Confidentialite")}
                >
                  Confidentialités des données
                </NavLink>
              </li>
            </ul>
          </Col>
          <Col lg={4} md={12}>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-header">Suivez-nous</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex align-items-center">
                  <i className="bi bi-linkedin me-2"></i>
                  <a
                    href="https://www.linkedin.com/in/franck-decker-013a72249/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <i className="bi bi-instagram me-2"></i>
                  <a
                    href="https://www.instagram.com/a110.club/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <i className="bi bi-facebook me-2"></i>
                  <a
                    href="https://www.facebook.com/profile.php?id=61556014750143"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
