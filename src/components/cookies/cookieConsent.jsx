import React from "react";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

const CookieConsentBanner = () => {
  const handleDeclineCookie = () => {
    console.log("Cookies declined");
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accepter"
      declineButtonText="Refuser"
      enableDeclineButton
      onDecline={handleDeclineCookie}
      cookieName="userCookieConsent"
      style={{ background: "#2B373B", textAlign: "left" }}
      buttonStyle={{
        color: "#4e503b",
        fontSize: "16px",
        background: "#e0e0e0",
      }}
      declineButtonStyle={{ color: "#fff", background: "#c33" }}
      expires={150}
    >
      Nous utilisons des cookies pour améliorer votre expérience sur notre site.
      Veuillez accepter ou refuser notre politique de cookies.
    </CookieConsent>
  );
};

export default CookieConsentBanner;
