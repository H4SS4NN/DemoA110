import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

function EditReservationModal({ show, onHide, reservation, onSave }) {
  const [formData, setFormData] = useState({ ...reservation });

  useEffect(() => {
    if (reservation) {
      // S'assurer que reservation n'est pas null avant d'utiliser
      const formattedReservation = {
        ...reservation,
        date_debut: reservation.date_debut
          ? formatDateWithoutTimezoneShift(reservation.date_debut)
          : "",
        date_fin: reservation.date_fin
          ? formatDateWithoutTimezoneShift(reservation.date_fin)
          : "",
      };
      setFormData(formattedReservation);
    }
  }, [reservation]);

  const formatDateWithoutTimezoneShift = (isoDateString) => {
    if (!isoDateString) return "";
    // Extrayez simplement la date, sans conversion de fuseau horaire.
    return isoDateString.split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifier la réservation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* Partie gauche du formulaire */}
            <div style={{ flex: 1, paddingRight: "10px" }}>
              <Form.Group className="mb-3" controlId="formNom">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  name="nom"
                  value={formData.nom || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPrenom">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  name="prenom"
                  value={formData.prenom || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formTelephone">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="tel"
                  name="telephone"
                  value={formData.telephone || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            {/* Partie droite du formulaire */}
            <div style={{ flex: 1, paddingLeft: "10px" }}>
              <Form.Group className="mb-3" controlId="formDateDebut">
                <Form.Label>Date de Début</Form.Label>
                <Form.Control
                  type="date"
                  name="date_debut"
                  value={formData.date_debut || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDateFin">
                <Form.Label>Date de Fin</Form.Label>
                <Form.Control
                  type="date"
                  name="date_fin"
                  value={formData.date_fin || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPrixEstime">
                <Form.Label>Prix Estimé</Form.Label>
                <Form.Control
                  type="number"
                  name="prix_estime"
                  value={formData.prix_estime || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCommentaire">
                <Form.Label>Commentaire</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="commentaire"
                  value={formData.commentaire || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              Sauvegarder les modifications
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditReservationModal;
