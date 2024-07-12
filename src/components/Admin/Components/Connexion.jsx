import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Row, Col, Form, Input, Button, Image } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import config from "../../../config";
import backconnexion from "../../../assets/backconnexion2.webp";
import logo from "../../../assets/logoPhoenix78.png";

const { Content } = Layout;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`https://back.demo.a110.club/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
    <Layout style={{ minHeight: "100vh" }}>
      <Row style={{ width: "100%" }}>
        <Col span={16}>
          <Image
            src={backconnexion}
            alt="background"
            preview={false}
            width="100%"
            height="100vh"
            style={{ objectFit: "cover" }}
          />
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: "300px",
              width: "100%",
              display: "flex",
              flexDirection: "column",

              alignItems: "center",
            }}
          >
            <img src={logo} alt="logophoenix" width={"100px"} />
            <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
              Connexion Admin
            </h2>
            <Form name="login" onFinish={handleSubmit}>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer votre nom d'utilisateur!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer votre mot de passe!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Connexion
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default LoginPage;
