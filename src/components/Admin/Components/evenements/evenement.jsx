import React, { useState } from "react";
import { Layout, Button } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import EventForm from "./addevenements";
import Eventadmin from "./listedesevenenments";

const { Header, Content } = Layout;

function EventPage() {
  const [selectedPage, setSelectedPage] = useState("events");

  const handleButtonClick = (page) => {
    setSelectedPage(page);
  };

  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: "#0061A4" }}>
        <div className="logo" style={{ color: "white", fontSize: "20px" }}>
          Gestion des Événements
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            justifyContent: "center",
          }}
        >
          <Button
            type={selectedPage === "events" ? "primary" : "default"}
            icon={<CalendarOutlined />}
            onClick={() => handleButtonClick("events")}
            style={{ marginRight: "10px" }}
          >
            Événements
          </Button>
          <Button
            type={selectedPage === "add-event" ? "primary" : "default"}
            icon={<PlusOutlined />}
            onClick={() => handleButtonClick("add-event")}
            style={{ marginRight: "10px" }}
          >
            Ajouter
          </Button>
        </div>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: "80px" }}>
        <div className="site-layout-content">
          {/* Contenu en fonction de la page sélectionnée */}
          {selectedPage === "events" && (
            <div>
              {/* Afficher la liste des événements */}
              <h1>Liste des événements</h1>
              <Eventadmin />
            </div>
          )}
          {selectedPage === "add-event" && (
            <div>
              {/* Afficher le formulaire d'ajout d'événement */}
              <h2>Ajouter un événement</h2>
              <EventForm />
            </div>
          )}
          {selectedPage === "delete-event" && (
            <div>
              {/* Afficher le formulaire de suppression d'événement */}
              <h1>Supprimer un événement</h1>
              {/* Ajouter votre composant pour afficher le formulaire de suppression ici */}
            </div>
          )}
          {selectedPage === "edit-event" && (
            <div>
              {/* Afficher le formulaire de modification d'événement */}
              <h1>Modifier un événement</h1>
              {/* Ajouter votre composant pour afficher le formulaire de modification ici */}
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
}

export default EventPage;
