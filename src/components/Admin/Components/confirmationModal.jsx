import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ConfirmationModal = ({ show, onHide, onConfirm, reservationId }) => {
  const [commentaire, setCommentaire] = useState("");
  const [objet, setObjet] = useState("");

  const handleConfirm = () => {
    // Appelle la fonction onConfirm avec le commentaire et l'objet
    onConfirm(reservationId, commentaire, objet);
    onHide(); // Ferme la modal
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmer l'action</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Commentaire (optionnel)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Objet (optionnel)</Form.Label>
            <Form.Control
              type="text"
              value={objet}
              onChange={(e) => setObjet(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Annuler</Button>
        <Button onClick={handleConfirm}>Confirmer</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
