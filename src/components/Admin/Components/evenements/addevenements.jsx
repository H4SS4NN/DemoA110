import React, { useState } from "react";
import { Form, Input, DatePicker, Checkbox, Button, message } from "antd";
import axios from "axios";
import { Card } from "react-bootstrap";
import config from "../../../../config";

const { TextArea } = Input;

function EventForm({ onSubmit }) {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [isPast, setIsPast] = useState(false);
  const [cardData, setCardData] = useState(null);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("date", values.date.format("YYYY-MM-DD"));
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("image", image);

    try {
      await axios.post(`${config.API_URL}/evenements`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      message.success("Événement ajouté avec succès!");
      form.resetFields();
      setImage(null);
      setIsPast(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'événement:", error);
      message.error("Erreur lors de l'ajout de l'événement.");
    }
  };

  const handleFormChange = (changedValues, allValues) => {
    setCardData(allValues);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ isPast: false }}
            onValuesChange={handleFormChange}
          >
            <Form.Item
              name="title"
              label="Titre de l'événement"
              rules={[{ required: true, message: "Veuillez saisir le titre!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="date"
              label="Date de l'événement"
              rules={[
                { required: true, message: "Veuillez sélectionner la date!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Veuillez saisir la description!" },
              ]}
            >
              <TextArea rows={3} />
            </Form.Item>
            <Form.Item name="location" label="Lieu">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image">
              <input
                type="file"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Item>
            <Form.Item name="isPast" valuePropName="checked">
              <Checkbox onChange={(e) => setIsPast(e.target.checked)}>
                Événement passé
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Ajouter l'événement
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="col-md-4">
          {/* Affichage de l'aperçu de la carte */}
          {cardData && (
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{cardData.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {new Date(cardData.date).toLocaleDateString()}
                </Card.Subtitle>
                <Card.Text>{cardData.description}</Card.Text>
                <Card.Text className="text-muted">
                  Lieu : {cardData.location}
                </Card.Text>
                <Button variant="primary">S'inscrire</Button>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventForm;
