/* eslint-disable react/prop-types */

import "./carCard.css";

const CarCard = ({
  title,
  subTitle,
  passengers,
  luggage,
  transmission,
  includedKm,
  pricePerDay,
  totalPrice,
}) => {
  return (
    <div
      className="card text-bg-dark d-flex w-25"
      style={{ maxWidth: "20rem" }}
    >
      <img
        src="src/assets/toitalpine.jpg"
        className="card-img"
        alt="..."
        style={{ paddingTop: "29vh", backgroundColor: "white" }}
      />
      <div className="card-img-overlay flex-column d-flex justify-content-between">
        <div>
          <h1 className="card-title  text-dark h2 text-center">{title}</h1>
          <p className="h4  text-dark text-center"> {subTitle}</p>
          <div className="card-text text-dark car-card-details">
            {" "}
            <span className="text-center">
              <i className="bi bi-people-fill"></i> &nbsp;
              {passengers}
            </span>
            <span className="text-center">
              <i className="bi bi-suitcase-lg-fill"></i> &nbsp;
              {luggage}
            </span>
            <span className="text-center">
              <i className="bi bi-gear"></i> &nbsp;
              {transmission}
            </span>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <span>
          <i style={{ color: "green" }} className="bi bi-check-circle-fill"></i>{" "}
          Incl. {includedKm} km
        </span>
        <div className="car-card-pricing">
          <span className="price-per-day">{pricePerDay}€ / jour</span>
          <span className="fs-6">{totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
