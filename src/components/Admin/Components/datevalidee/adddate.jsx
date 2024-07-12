import React, { useState, useEffect } from "react";
import { Button, DatePicker, Form, Select, Table, Layout, message } from "antd";
import moment from "moment"; // Assurez-vous d'avoir installé moment : npm install moment

import axios from "axios";
import NavbarAdmin from "../../navbar/navbarAdmin";
import { useNavigate } from "react-router-dom";

import config from "../../../../config";
const { Content } = Layout;
const { Option } = Select;

const AddReservedDates = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [etat, setEtat] = useState("confirmée");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/administration");
    } else {
      fetchReservations();
    }
  }, [navigate]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/reservations/dates`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const formattedReservations = response.data.map((reservation) => ({
        ...reservation,
        date_debut: moment(reservation.date_debut).format("DD/MM/YYYY"),
        date_fin: moment(reservation.date_fin).format("DD/MM/YYYY"),
      }));
      setReservations(formattedReservations);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      message.error("Veuillez sélectionner les dates de début et de fin.");
      return;
    }

    try {
      const formattedStartDate = startDate.format("YYYY-MM-DD");
      const formattedEndDate = endDate.format("YYYY-MM-DD");

      console.log(
        "Submitting with dates:",
        formattedStartDate,
        formattedEndDate
      );

      const response = await axios.post(
        `${config.API_URL}/reservationsdate/add`,
        {
          date_debut: formattedStartDate,
          date_fin: formattedEndDate,
          etat: etat,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        message.success("Réservation ajoutée avec succès !");
        fetchReservations();
        setStartDate(null);
        setEndDate(null);
        setEtat("confirmée");
      } else {
        message.error("Erreur lors de l'ajout de la réservation.");
        console.error("Erreur lors de l'ajout de la réservation", response);
      }
    } catch (error) {
      message.error("Erreur lors de l'ajout de la réservation.");
      console.error("Erreur lors de l'ajout de la réservation", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date de début",
      dataIndex: "date_debut",
      key: "date_debut",
    },
    {
      title: "Date de fin",
      dataIndex: "date_fin",
      key: "date_fin",
    },
    {
      title: "État",
      dataIndex: "etat",
      key: "etat",
    },
  ];

  return (
    <>
      <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Date de début">
            <DatePicker
              value={startDate}
              onChange={(date) => setStartDate(date)}
              format="DD/MM/YYYY"
            />
          </Form.Item>
          <Form.Item label="Date de fin">
            <DatePicker
              value={endDate}
              onChange={(date) => setEndDate(date)}
              format="DD/MM/YYYY"
            />
          </Form.Item>
          <Form.Item label="État">
            <Select value={etat} onChange={(value) => setEtat(value)}>
              <Option value="confirmée">Confirmée</Option>
              <Option value="annulée">Annulée</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Ajouter
            </Button>
          </Form.Item>
        </Form>
        <h2>Liste des Réservations</h2>
        <Table dataSource={reservations} columns={columns} rowKey="id" />
      </div>
    </>
  );
};

export default AddReservedDates;
