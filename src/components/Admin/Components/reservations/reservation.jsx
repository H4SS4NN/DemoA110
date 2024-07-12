import React, { useState } from "react";
import { Layout, Button } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

import Dashboard from "./Tableaudebord";
import EditReservationPage from "./editreservationpage";

const { Header, Content } = Layout;

function ReservationPage() {
  const [selectedPage, setSelectedPage] = useState("reservations");
  const [editingReservation, setEditingReservation] = useState(null);

  const handleButtonClick = (page) => {
    setSelectedPage(page);
    setEditingReservation(null);
  };

  const handleEditClick = (reservation) => {
    setEditingReservation(reservation);
  };

  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: "#0061A4" }}>
        <div className="logo" style={{ color: "white", fontSize: "20px" }}>
          Gestion des Réservations
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
            type={selectedPage === "reservations" ? "primary" : "default"}
            icon={<CalendarOutlined />}
            onClick={() => handleButtonClick("reservations")}
          >
            Réservations
          </Button>
        </div>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: "80px" }}>
        <div className="site-layout-content">
          {/* Afficher le composant de modification de réservation si une réservation est en cours de modification */}
          {editingReservation && (
            <EditReservationPage
              reservation={editingReservation}
              onCancel={() => setEditingReservation(null)}
            />
          )}
          {/* Sinon, afficher la liste des réservations */}
          {selectedPage === "reservations" && !editingReservation && (
            <div>
              <h1>Liste des réservations</h1>
              <Dashboard onEditClick={handleEditClick} />
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
}

export default ReservationPage;
