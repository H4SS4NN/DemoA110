import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Fonction pour remonter en haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Fonction pour détecter le scroll
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Nettoyage de l'effet
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <button onClick={scrollToTop} style={styles.button}>
        ↑
      </button>
    )
  );
};

// Vous pouvez ajuster les styles selon vos préférences
const styles = {
  button: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    zIndex: 1000,
  },
};

export default ScrollToTopButton;
