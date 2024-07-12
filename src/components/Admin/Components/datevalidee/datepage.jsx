import React, { useState } from "react";
import { Layout, Button } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import AddReservedDates from "./adddate";
import ReservedDatesList from "./listedate";

const { Header, Content } = Layout;

function DatePage() {
  const [selectedPage, setSelectedPage] = useState("dates");

  const handleButtonClick = (page) => {
    setSelectedPage(page);
  };

  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: "#0061A4" }}>
        <div className="logo" style={{ color: "white", fontSize: "20px" }}>
          Gestion des Dates
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
            type={selectedPage === "dates" ? "primary" : "default"}
            icon={<CalendarOutlined />}
            onClick={() => handleButtonClick("dates")}
            style={{ marginRight: "10px" }}
          >
            Dates
          </Button>
          <Button
            type={selectedPage === "add-date" ? "primary" : "default"}
            icon={<PlusOutlined />}
            onClick={() => handleButtonClick("add-date")}
            style={{ marginRight: "10px" }}
          >
            Ajouter
          </Button>
        </div>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: "60px" }}>
        <div className="site-layout-content">
          {/* Contenu en fonction de la page sélectionnée */}
          {selectedPage === "dates" && (
            <div>
              {/* Afficher la liste des dates */}
              <h1>Liste des dates</h1>
              <ReservedDatesList />
            </div>
          )}
          {selectedPage === "add-date" && (
            <div>
              {/* Afficher le formulaire d'ajout de date */}
              <h2>Ajouter une date</h2>
              <AddReservedDates />
            </div>
          )}
          {selectedPage === "delete-date" && (
            <div>
              {/* Afficher le formulaire de suppression de date */}
              <h1>Supprimer une date</h1>
              {/* Ajouter votre composant pour afficher le formulaire de suppression ici */}
            </div>
          )}
          {selectedPage === "edit-date" && (
            <div>
              {/* Afficher le formulaire de modification de date */}
              <h1>Modifier une date</h1>
              {/* Ajouter votre composant pour afficher le formulaire de modification ici */}
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
}

export default DatePage;
