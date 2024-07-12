import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/logoPhoenix78.png";

function MyNavbar() {
  const linkStyle = {
    color: "rgba(255, 255, 255, 0.55)",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    transition: "color 0.3s ease", // Ajout de la transition pour le hover
  };

  const activeLinkStyle = {
    ...linkStyle,
    color: "#fff",
    borderBottom: "3px solid #fff",
  };

  const logoStyle = {
    width: "70px",
    height: "auto",
    filter: "drop-shadow(5px 4px 4px black)",
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{ backgroundColor: "#0061a4", padding: "0px" }}
      variant="dark"
    >
      <Container style={{ padding: "0px" }}>
        <Navbar.Brand href="">
          <img src={logo} alt="Logo" style={logoStyle} className=" align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavLink
              to="/"
              exact
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
              onMouseEnter={(e) => (e.target.style.color = "#e0e0e0")}
              onMouseLeave={(e) =>
                (e.target.style.color = isActive
                  ? "#fff"
                  : "rgba(255, 255, 255, 0.55)")
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to="/History"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
              onMouseEnter={(e) => (e.target.style.color = "#e0e0e0")}
              onMouseLeave={(e) =>
                (e.target.style.color = isActive
                  ? "#fff"
                  : "rgba(255, 255, 255, 0.55)")
              }
            >
              Histoire
            </NavLink>
            <NavLink
              to="/Aide"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
              onMouseEnter={(e) => (e.target.style.color = "#e0e0e0")}
              onMouseLeave={(e) =>
                (e.target.style.color = isActive
                  ? "#fff"
                  : "rgba(255, 255, 255, 0.55)")
              }
            >
              FAQ
            </NavLink>
            <NavLink
              to="/Events"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
              onMouseEnter={(e) => (e.target.style.color = "#e0e0e0")}
              onMouseLeave={(e) =>
                (e.target.style.color = isActive
                  ? "#fff"
                  : "rgba(255, 255, 255, 0.55)")
              }
            >
              Évènement
            </NavLink>
            <NavLink
              to="/Contact"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
              onMouseEnter={(e) => (e.target.style.color = "#e0e0e0")}
              onMouseLeave={(e) =>
                (e.target.style.color = isActive
                  ? "#fff"
                  : "rgba(255, 255, 255, 0.55)")
              }
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
