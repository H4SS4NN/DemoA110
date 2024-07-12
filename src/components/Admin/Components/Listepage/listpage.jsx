import React, { useState } from "react";
import { Layout, Button } from "antd";
import { UserOutlined, ShopOutlined } from "@ant-design/icons";
import ParticuliersList from "./particulier/ParticulierList";
import ProfessionnelsList from "./professionel/professionelList";

const { Header, Content } = Layout;

function ListPage() {
  const [selectedList, setSelectedList] = useState("particulier");

  const handleListButtonClick = (listType) => {
    setSelectedList(listType);
  };

  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: "#0061a4" }}>
        <div className="logo" style={{ color: "white", fontSize: "20px" }}>
          Liste
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Button
            type={selectedList === "particulier" ? "primary" : "default"}
            icon={<UserOutlined />}
            onClick={() => handleListButtonClick("particulier")}
            style={{ marginRight: "10px" }}
          >
            Liste Particulier
          </Button>
          <Button
            type={selectedList === "entreprise" ? "primary" : "default"}
            icon={<ShopOutlined />}
            onClick={() => handleListButtonClick("entreprise")}
          >
            Liste Entreprise
          </Button>
        </div>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: "80px" }}>
        <div className="site-layout-content">
          {/* Contenu en fonction de la liste sélectionnée */}
          {selectedList === "particulier" && (
            <div>
              {/* Afficher la liste des particuliers */}
              <h1>Liste des particuliers</h1>
              <ParticuliersList />
            </div>
          )}
          {selectedList === "entreprise" && (
            <div>
              {/* Afficher la liste des entreprises */}
              <h1>Liste des entreprises</h1>
              <ProfessionnelsList />
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
}

export default ListPage;
