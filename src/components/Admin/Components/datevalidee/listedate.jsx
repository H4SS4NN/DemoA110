import React, { useState, useEffect } from "react";
import { Button, Table, Layout, Popconfirm, message } from "antd";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import config from "../../../../config";

const { Content } = Layout;

const ReservedDatesList = () => {
  const navigate = useNavigate();
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/administration");
    } else {
      fetchReservedDates();
    }
  }, [navigate]);

  const fetchReservedDates = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/reservations/dates`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const formattedDates = response.data.map((date) => ({
        ...date,
        date_debut: moment(date.date_debut).format("DD/MM/YYYY"),
        date_fin: moment(date.date_fin).format("DD/MM/YYYY"),
      }));
      setReservedDates(formattedDates);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des dates réservées",
        error
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.API_URL}/reservationsdate/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      message.success("La date réservée a été supprimée avec succès.");
      fetchReservedDates();
    } catch (error) {
      console.error("Erreur lors de la suppression de la date réservée", error);
      message.error("Erreur lors de la suppression de la date réservée.");
    }
  };

  const handleEdit = (record) => {
    alert("Edit record " + record.id);
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
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer cette date réservée?"
            onConfirm={() => handleDelete(record.id)}
            okText="Oui"
            cancelText="Non"
          >
            <Button
              type="danger"
              size="small"
              icon={<DeleteOutlined />}
              style={{ marginLeft: 8 }}
            />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={reservedDates} columns={columns} rowKey="id" />
    </>
  );
};

export default ReservedDatesList;
