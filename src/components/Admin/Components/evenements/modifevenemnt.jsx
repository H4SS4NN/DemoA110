import React, { useState } from "react";

const ModifEvenement = () => {
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission here
  };

  return (
    <div>
      <h1>Modifier un événement</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titre :</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default ModifEvenement;
