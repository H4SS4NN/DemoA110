import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DeliveryDetails = ({ deliveryInfo }) => {
  return (
    <div className="container my-4 g-0 h-100">
      <div className="card">
        <div className="card-header">Votre résultat ...</div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p className="card-text">
                <i className="bi bi-calendar-week mr-2"></i> &nbsp;
                <strong>Date d'aller:</strong> {deliveryInfo.startDate}
              </p>
              <p className="card-text">
                <i className="bi bi-clock mr-2"></i> &nbsp;
                <strong>Horaire de départ:</strong> {deliveryInfo.startTime}
              </p>
              <p className="card-text">
                <i className="bi bi-geo-alt mr-2"></i> &nbsp;
                <strong>Lieu de départ:</strong> {deliveryInfo.startLocation}
              </p>
            </div>
            <div className="col-md-6">
              <p className="card-text">
                <i className="bi bi-calendar-week mr-2"></i> &nbsp;
                <strong>Date de retour:</strong> {deliveryInfo.endDate}
              </p>
              <p className="card-text">
                <i className="bi bi-clock mr-2"></i> &nbsp;
                <strong>Horaire de retour:</strong> {deliveryInfo.endTime}
              </p>
              <p className="card-text">
                <i className="bi bi-geo-alt mr-2"></i> &nbsp;
                <strong>Lieu de retour:</strong> {deliveryInfo.endLocation}
              </p>
            </div>
          </div>
          <a href="#" className="btn btn-primary mt-3">
            Etape suivante
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
