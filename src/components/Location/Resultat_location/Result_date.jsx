import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const DateDisplayComponent = ({ deliveryInfo }) => {
  console.log(deliveryInfo);
  return (
    <>
      <Container
        style={{
          borderRadius: "15px",
          color: "black",
          width: "",
        }}
        className="p-3 "
      >
        <Row className="justify-content-center align-items-center">
          <Col xs={12} className="text-center mb-2 h5">
            <i className="bi bi-calendar-check-fill me-2"></i>
            Mes dates
          </Col>
          <Col xs={5} className="text-center">
            <div className="fs-5">{deliveryInfo.startDate}</div>
            <div className="text-muted">{deliveryInfo.startTime}</div>
            {console.log(deliveryInfo.startTime)}
          </Col>
          <Col xs={2} className="text-center">
            <i className="bi bi-arrow-left-right"></i>
          </Col>
          <Col xs={5} className="text-center">
            <div className="fs-5">{deliveryInfo.endDate}</div>
            <div className="text-muted">{deliveryInfo.endTime}</div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DateDisplayComponent;
