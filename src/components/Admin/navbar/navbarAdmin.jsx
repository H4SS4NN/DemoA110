import React, { useState, useEffect } from "react";
import { Layout, Menu, Badge } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import Dashboard from "../Components/reservations/Tableaudebord";
import logo from "../../../assets/logoPhoenix78.png";
import EventPage from "../Components/evenements/evenement";
import DatePage from "../Components/datevalidee/datepage";
import ListPage from "../Components/Listepage/listpage";
import ReservationPage from "../Components/reservations/reservation";
import config from "../../../config";
import Dashboard2 from "../Components/dashboard/dashboardchiffre";

const { Sider, Content } = Layout;

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState("reservations");
  const [pendingReservationsCount, setPendingReservationsCount] = useState(0); // Initialize state

  useEffect(() => {
    // Function to fetch the pending reservations count
    const fetchPendingReservationsCount = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/reservations/pending-count`,
          {
            // Add the Authorization header to the request
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setPendingReservationsCount(response.data.count);
      } catch (error) {
        console.error("Failed to fetch pending reservations count", error);
      }
    };

    fetchPendingReservationsCount();

    let inactivityTimeout = setTimeout(() => {
      handleLogout();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        handleLogout();
      }, 10 * 60 * 1000);
    };

    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("keydown", resetInactivityTimer);
    document.addEventListener("click", resetInactivityTimer);

    return () => {
      document.removeEventListener("mousemove", resetInactivityTimer);
      document.removeEventListener("keydown", resetInactivityTimer);
      document.removeEventListener("click", resetInactivityTimer);
      clearTimeout(inactivityTimeout);
    };
  }, []);

  const handleMenuClick = (e) => {
    setSelectedPage(e.key);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    navigate("/administration");
  };

  const items = [
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <HomeOutlined />,
    },
    {
      label: "Réservations",
      key: "reservations",
      icon: (
        <Badge size="small" count={pendingReservationsCount}>
          <UserOutlined />
        </Badge>
      ),
    },
    {
      label: "Événements",
      key: "events",
      icon: <CalendarOutlined />,
    },
    {
      label: "Dates d'ajout",
      key: "addDates",
      icon: <PlusCircleOutlined />,
    },
    {
      label: "Liste des Contacts",
      key: "List",
      icon: <UnorderedListOutlined />,
    },
    {
      label: "Déconnexion",
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true,
      type: "primary",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ width: "250px", backgroundColor: "white" }}>
        <div className="logo" style={{ padding: 20 }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "100%",
              height: "auto",
              filter: "drop-shadow(0px 5px 8px black)",
            }}
          />
        </div>

        <Menu
          theme="light"
          mode="inline"
          items={items}
          onClick={handleMenuClick}
          style={{ backgroundColor: "#0061A4 !important" }}
          defaultSelectedKeys={["reservations"]}
        />
      </Sider>
      <Layout className="site-layout">
        <Content>
          {selectedPage === "dashboard" && <Dashboard2 />}
          {selectedPage === "reservations" && <ReservationPage />}
          {selectedPage === "events" && <EventPage />}
          {selectedPage === "addDates" && <DatePage />}
          {selectedPage === "List" && <ListPage />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default NavbarAdmin;
