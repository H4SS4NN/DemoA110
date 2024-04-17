import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ImageAlpine from "../../../assets/test.png";

const CarCardOverlay = ({ car }) => {
  return (
    <div className="card bg-dark text-white">
      <img
        src={ImageAlpine}
        className="card-img"
        alt={car.name}
        style={{ opacity: 0.7 }}
      />
      <div className="card-img-overlay d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{car.name}</h5>
          <p className="card-text">{car.type}</p>
        </div>
        <div className="mt-auto">
          {" "}
          {/* This ensures that the bottom content is pushed to the bottom */}
          <p className="card-text text-center">
            <span className="me-2">
              <i className="bi bi-people-fill"></i> {car.seats}
            </span>
            <span className="me-2">
              <i className="bi bi-suitcase-fill"></i> {car.suitcases}
            </span>
            <span className="me-2">
              <i className="bi bi-gear-fill"></i> {car.transmission}
            </span>
            <span className="me-2">
              <i className="bi bi-door-closed-fill"></i> {car.doors}
            </span>
            <span className="me-2">
              <i className="bi bi-person-fill"></i> Âge min: {car.minAge}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarCardOverlay;
