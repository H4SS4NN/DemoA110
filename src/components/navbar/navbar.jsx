import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/logoPhoenix78.png";

function MyNavbar() {
  const linkStyle = {
    color: "rgba(255, 255, 255, 0.55)", // Couleur par défaut de Bootstrap pour les liens de la navbar
    textDecoration: "none",
    padding: "0.5rem 1rem", // Espace autour des liens pour un meilleur rendu visuel
  };

  const activeLinkStyle = {
    ...linkStyle,
    color: "#fff", // Couleur de Bootstrap pour les liens actifs de la navbar
    borderBottom: "3px solid #fff", // Bordure sous le lien actif
  };

  return (
    <Navbar
      style={{ backgroundColor: "#0061a4" }}
      variant="dark"
      className="py-3"
    >
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="50"
            height="50"
            alt="Logo"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink
              to="/"
              exact
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              Home
            </NavLink>
            <NavLink
              to="/History"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              Histoire
            </NavLink>
            <NavLink
              to="/Price"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              Aide
            </NavLink>
            <NavLink
              to="/Events"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              Events
            </NavLink>
            <NavLink
              to="/Contact"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              Contact
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
