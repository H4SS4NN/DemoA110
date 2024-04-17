import React from "react";
import { Card } from "react-bootstrap";
import stationImage from "../../../assets/alpinevoyage.webp";

const StationCard = ({ deliveryInfo }) => {
  console.log(deliveryInfo);
  return (
    <div className="card">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2629.311168975928!2d2.013259376959863!3d48.775949406504004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6814e6f757357%3A0x1b563a7dbabb47be!2s12%20Av.%20des%20Pr%C3%A9s%2C%2078180%20Montigny-le-Bretonneux!5e0!3m2!1sfr!2sfr!4v1709887053595!5m2!1sfr!2sfr"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
      <div className="card-body">
        <h5 className="card-title">
          {" "}
          <i className="bi bi-geo-alt"></i> {deliveryInfo.startLocation}
        </h5>
        <p className="card-text">
          <i className="bi bi-telephone"></i>
          <a href="tel:+33186900898" id="telephone-link">
            &nbsp; +33 (0)1 86 90 08 98
          </a>
        </p>
        <p>
          <i className="bi bi-envelope"></i>
          <a href="mailto:contact78@a110.club">&nbsp; contact78@a110.club</a>
        </p>
      </div>
    </div>
  );
};

export default StationCard;
