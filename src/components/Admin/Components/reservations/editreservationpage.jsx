import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  DatePicker,
  notification,
  Row,
  Col,
  Card,
} from "antd";
import axios from "axios";
import config from "../../../../config";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

const EditReservationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/reservations/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const data = response.data;
        form.setFieldsValue({
          ...data,
          date_debut: data.date_debut ? moment(data.date_debut) : null,
          date_fin: data.date_fin ? moment(data.date_fin) : null,
        });
        console.log(data);
      })
      .catch((error) => {
        console.error("Failed to fetch reservation", error);
        notification.error({
          message: "Erreur de chargement",
          description: "Impossible de charger les données de la réservation.",
        });
      });
  }, [id, form]);

  const onFinish = (values) => {
    const submitValues = {
      ...values,
      date_debut: values.date_debut
        ? values.date_debut.format("YYYY-MM-DD")
        : null,
      date_fin: values.date_fin ? values.date_fin.format("YYYY-MM-DD") : null,
    };

    axios
      .put(`${config.API_URL}/reservations/${id}`, submitValues, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        notification.success({
          message: "Réservation mise à jour avec succès",
        });
        navigate("/admin");
      })
      .catch((error) => {
        notification.error({
          message: "Échec de la mise à jour",
          description: error.message,
        });
      });
  };

  const handleBack = () => {
    navigate("/admin");
  };

  return (
    <Card
      title="Modifier la réservation"
      bordered={false}
      style={{ maxWidth: 800, margin: "auto" }}
    >
      <Button onClick={handleBack} style={{ marginBottom: 16 }}>
        Retour
      </Button>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="nom" label="Nom">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="prenom" label="Prénom">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="email" label="Email">
              <Input type="email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="telephone" label="Téléphone">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="date_debut" label="Date de Début">
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="date_fin" label="Date de Fin">
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <Form.Item name="prix_estime" label="Prix">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="etat" label="État">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Sauvegarder les modifications
        </Button>
      </Form>
    </Card>
  );
};

export default EditReservationPage;
