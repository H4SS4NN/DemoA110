import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  Badge,
  Input,
  Space,
  DatePicker,
  Select,
  Layout,
  Spin,
} from "antd";
import axios from "axios";
import config from "../../../../config";
import moment from "moment";

const { Content } = Layout;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Dashboard = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [stateFilter, setStateFilter] = useState("");

  const handleModifier = (reservation) => {
    navigate(`/edit-reservation/${reservation}`);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/administration");
    } else {
      fetchReservations();
    }
  }, [navigate]);

  const fetchReservations = () => {
    setLoading(true);
    axios
      .get(`${config.API_URL}/reservations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const sortedReservations = response.data.sort((a, b) =>
          moment(b.date_debut).diff(moment(a.date_debut))
        );
        setReservations(sortedReservations);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des réservations!",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchReservationsBySearch = (searchText, dateRange, stateFilter) => {
    setLoading(true);
    const params = {};
    if (searchText) params.nom = searchText;
    if (dateRange.length === 2) {
      params.startDate = dateRange[0].format("YYYY-MM-DD");
      params.endDate = dateRange[1].format("YYYY-MM-DD");
    }
    if (stateFilter) params.etat = stateFilter;

    axios
      .get(`${config.API_URL}/reservations/search`, {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des réservations par recherche:",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAccept = (id) => () => {
    const data = {
      id: id,
      nouvelEtat: "validé",
      commentaire: "Votre réservation a été validée.",
    };

    axios
      .post(`${config.API_URL}/reservations/update`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        alert("Réservation acceptée avec succès!");
        fetchReservations(); // Re-fetch reservations to update the list
      })
      .catch((error) => {
        console.error("Erreur lors de l'acceptation de la réservation", error);
        alert("Erreur lors de l'acceptation de la réservation");
      });
  };

  const handleRefuse = (id) => () => {
    const data = {
      id: id,
      nouvelEtat: "refusé",
      commentaire: "Votre réservation a été refusée.",
    };

    axios
      .post(`${config.API_URL}/reservations/update`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        alert("Réservation refusée avec succès!");
        fetchReservations(); // Re-fetch reservations to update the list
      })
      .catch((error) => {
        console.error("Erreur lors du refus de la réservation", error);
        alert("Erreur lors du refus de la réservation");
      });
  };

  const stateBadge = (etat) => {
    let color;
    switch (etat) {
      case "validé":
        color = "green";
        break;
      case "refusé":
        color = "red";
        break;
      case "en attente":
        color = "orange";
        break;
      default:
        color = "gray"; // Une couleur par défaut pour les états non spécifiés
    }
    return <Badge color={color} text={etat} />;
  };

  const handleSearch = () => {
    fetchReservationsBySearch(searchText, dateRange, stateFilter);
  };

  const columns = [
    {
      title: "Nom, Prénom & Contact",
      dataIndex: "nom",
      key: "nom",
      render: (text, record) => (
        <>
          <div>
            <strong>
              {record.nom} {record.prenom}
            </strong>
          </div>
          <div>
            <small>{record.telephone}</small>
          </div>
          <div>
            <small>{record.email}</small>
          </div>
        </>
      ),
    },
    {
      title: "Date & Heure de Départ",
      dataIndex: "date_debut",
      key: "date_debut",
      render: (text, record) => (
        <>
          <div>
            <strong>Date:</strong>{" "}
            {new Date(record.date_debut).toLocaleDateString()}
          </div>
          <div>
            <strong>Heure:</strong> {record.heure_depart}
          </div>
        </>
      ),
    },
    {
      title: "Date & Heure de Retour",
      dataIndex: "date_fin",
      key: "date_fin",
      render: (text, record) => (
        <>
          <div>
            <strong>Date:</strong>{" "}
            {new Date(record.date_fin).toLocaleDateString()}
          </div>
          <div>
            <strong>Heure:</strong> {record.heure_retour}
          </div>
        </>
      ),
    },

    {
      title: "État",
      dataIndex: "etat",
      key: "etat",
      render: (etat) => stateBadge(etat),
    },

    {
      title: "Prix Estimé",
      dataIndex: "prix_estime",
      key: "prix_estime",
    },
    {
      title: "Commentaire",
      dataIndex: "commentaire",
      key: "commentaire",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={handleAccept(record.id)} type="primary">
            Accepter
          </Button>
          <Button onClick={handleRefuse(record.id)} danger type="primary">
            Refuser
          </Button>
          <Button onClick={() => handleModifier(record.id)}>Modifier</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Layout style={{ padding: "0 24px 24px", width: "auto" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <Space>
              <Search
                placeholder="Recherche par nom de famille"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={handleSearch}
              />
              <RangePicker
                value={dateRange}
                onChange={(dates) => setDateRange(dates)}
              />
              <Select
                value={stateFilter}
                onChange={(value) => setStateFilter(value)}
                style={{ width: 120 }}
              >
                <Option value="">Tous</Option>
                <Option value="en attente">En attente</Option>
                <Option value="validé">Validé</Option>
                <Option value="refusé">Refusé</Option>
              </Select>
              <Button type="primary" onClick={handleSearch}>
                Rechercher
              </Button>
              <Button
                onClick={() => {
                  setSearchText("");
                  setDateRange([]);
                  setStateFilter("");
                  fetchReservations();
                }}
              >
                Réinitialiser
              </Button>
            </Space>
          </div>
          {loading ? (
            <Spin size="large" />
          ) : reservations.length > 0 ? (
            <Table columns={columns} dataSource={reservations} rowKey="id" />
          ) : (
            <p>Aucune donnée disponible</p>
          )}
        </Content>
      </Layout>
    </>
  );
};

export default Dashboard;
