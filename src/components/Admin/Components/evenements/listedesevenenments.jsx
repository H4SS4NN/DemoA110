import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Form, Input, DatePicker } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Container, Row, Col } from "react-bootstrap";
import config from "../../../../config";
import axios from "axios";
import moment from "moment";

const { TextArea } = Input;

const Eventadmin = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/evenements`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const filteredEvents = response.data.filter(
          (event) => event.is_past === null
        );
        const eventsWithBase64Images = filteredEvents.map((event) => ({
          ...event,
          image: event.image ? arrayBufferToBase64(event.image.data) : null,
        }));
        setEvents(eventsWithBase64Images);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements:", error);
      }
    };
    fetchEvents();
  }, [trigger]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredRegistrations(registrations);
    } else if (filter === "possesseur") {
      setFilteredRegistrations(registrations.filter((reg) => reg.has_vehicle));
    } else if (filter === "non-possesseur") {
      setFilteredRegistrations(registrations.filter((reg) => !reg.has_vehicle));
    }
  }, [filter, registrations]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${config.API_URL}/evenements/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        console.log("Événement supprimé avec succès");
        setTrigger((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'événement", error);
      });
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer cet événement ?",
      icon: <ExclamationCircleOutlined />,
      content: "Cette action est irréversible.",
      okText: "Oui, supprimer",
      okType: "danger",
      cancelText: "Non",
      onOk() {
        handleDelete(id);
      },
    });
  };

  const handleViewRegistrations = async (event) => {
    try {
      const response = await axios.get(
        `${config.API_URL}/events/${event.id}/registrations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRegistrations(response.data);
      setSelectedEvent(event);
      setIsModalVisible(true);
      setFilter("all");
    } catch (error) {
      console.error("Erreur lors de la récupération des inscriptions:", error);
    }
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsEditModalVisible(true);
  };

  const handleUpdateEvent = async (values) => {
    try {
      await axios.put(
        `${config.API_URL}/evenements/${selectedEvent.id}`,
        {
          title: values.title,
          event_date: values.event_date.format("YYYY-MM-DD"),
          description: values.description,
          location: values.location,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsEditModalVisible(false);
      setTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'événement", error);
    }
  };

  return (
    <Container className="py-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {events.length > 0 ? (
          events.map((event) => (
            <Col key={event.id}>
              <Card className="mb-4" style={{ width: 300 }}>
                <img
                  alt={event.title}
                  src={`data:image/jpeg;base64,${event.image}`}
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
                <Card.Meta
                  title={event.title}
                  description={
                    <>
                      <p className="mb-2 text-muted">{event.event_date}</p>
                      <p>{event.description}</p>
                      <p className="text-muted">Lieu : {event.location}</p>
                    </>
                  }
                />
                <Button
                  type="primary"
                  onClick={() => handleViewRegistrations(event)}
                >
                  Voir les inscriptions
                </Button>
                <Button type="default" onClick={() => handleEditEvent(event)}>
                  Modifier
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => showDeleteConfirm(event.id)}
                >
                  Supprimer
                </Button>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>Aucun événement à afficher.</p>
          </Col>
        )}
      </Row>

      {/* Modal pour afficher les inscriptions */}
      <Modal
        title={`Inscriptions pour ${selectedEvent?.title}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div>
          <p>Total d'inscriptions: {registrations.length}</p>
          <Button onClick={() => setFilter("all")}>Tous</Button>
          <Button onClick={() => setFilter("possesseur")}>Possesseur</Button>
          <Button onClick={() => setFilter("non-possesseur")}>
            Non Possesseur
          </Button>
        </div>
        {filteredRegistrations.length > 0 ? (
          <ul>
            {filteredRegistrations.map((registration) => (
              <li key={registration.id}>
                {registration.name} {registration.surname} -{" "}
                {registration.email} - {registration.phone} -{" "}
                {registration.has_vehicle ? "Possesseur" : "Non possesseur"}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune inscription pour cet événement.</p>
        )}
      </Modal>

      {/* Modal pour modifier un événement */}
      <Modal
        title={`Modifier l'événement`}
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        {selectedEvent && (
          <Form
            initialValues={{
              title: selectedEvent.title,
              event_date: moment(selectedEvent.event_date),
              description: selectedEvent.description,
              location: selectedEvent.location,
            }}
            onFinish={handleUpdateEvent}
          >
            <Form.Item
              name="title"
              label="Titre"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer le titre de l'événement",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="event_date"
              label="Date de l'événement"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer la date de l'événement",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="location" label="Lieu">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Mettre à jour
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </Container>
  );
};

export default Eventadmin;
