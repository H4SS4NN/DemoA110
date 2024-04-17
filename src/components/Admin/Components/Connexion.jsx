import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", data.token);

        navigate("/admin");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error.message);

      localStorage.removeItem("token");
      localStorage.setItem("isLoggedIn", false);
    }
  };

  return (
    <Container fluid className="min-vh-100">
      <Row>
        <Col
          md={8}
          className="login-image-section min-vh-100"
          style={{
            backgroundImage: 'url("src/assets/backconnexion2.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Optionally, you can add content over your image here */}
        </Col>
        <Col
          md={4}
          className="d-flex align-items-center justify-content-center"
        >
          <Card style={{ width: "100%", maxWidth: "400px" }}>
            <Card.Body>
              <h2 className="text-center mb-4">Connexion Admin</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Nom d'utilisateur</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez le nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Entrez le mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  style={{
                    backgroundColor: "#007bff",
                  }}
                >
                  Connexion
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
