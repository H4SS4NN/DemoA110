import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const RegistrationForm = () => {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuNaissance: "",
    adressePostale: "",
    codePostal: "",
    ville: "",
    telephone: "",
    email: "",
    carteIdentite: null,
    permisConduire: null,
    justificatifDomicile: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      // Vérifie si la propriété est un fichier ou non
      if (form[key] instanceof File) {
        formData.append(key, form[key]);
      } else {
        formData.append(key, form[key] || ""); // Utilisez une chaîne vide pour les valeurs non définies
      }
    }

    axios
      .post("http://localhost:3000/particuliers", formData, {
        headers: {
          // `Content-Type` will be set to `multipart/form-data` by `axios` automatically
        },
      })
      .then((response) => {
        // Gestion de la réponse du serveur
        console.log(response.data);
      })
      .catch((error) => {
        // Gestion des erreurs
        console.error("Erreur lors de l'envoi du formulaire", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center justify-content-between">
        <img
          src="src/assets/logoPhoenix78.png"
          alt="logophoenix78"
          width={"50px"}
        />
        <h1 className="h4 text-center">
          Enregistrez-vous pour vibrer à bord de l'Alpine A110.
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Section Conducteur principal */}
        <h3 className="mb-3">Conducteur principal :</h3>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="nom" className="form-label">
              Nom* :
            </label>
            <input
              type="text"
              className="form-control"
              id="nom"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="prenom" className="form-label">
              Prénom* :
            </label>
            <input
              type="text"
              className="form-control"
              id="prenom"
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="dateNaissance" className="form-label">
              Date de naissance* :
            </label>
            <input
              type="date"
              className="form-control"
              id="dateNaissance"
              name="dateNaissance"
              value={form.dateNaissance}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lieuNaissance" className="form-label">
              Lieu de naissance* :
            </label>
            <input
              type="text"
              className="form-control"
              id="lieuNaissance"
              name="lieuNaissance"
              value={form.lieuNaissance}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="adressePostale" className="form-label">
              Adresse postale* :
            </label>
            <input
              type="text"
              className="form-control"
              id="adressePostale"
              name="adressePostale"
              value={form.adressePostale}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="codePostal" className="form-label">
              Code postal* :
            </label>
            <input
              type="text"
              className="form-control"
              id="codePostal"
              name="codePostal"
              value={form.codePostal}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="ville" className="form-label">
              Ville* :
            </label>
            <input
              type="text"
              className="form-control"
              id="ville"
              name="ville"
              value={form.ville}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="telephone" className="form-label">
              Téléphone* :
            </label>
            <input
              type="tel"
              className="form-control"
              id="telephone"
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email* :
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="carteIdentite" className="form-label">
              Copie carte identité/passeport valide* :
            </label>
            <input
              type="file"
              className="form-control"
              id="carteIdentite"
              name="carteIdentite"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="permisConduire" className="form-label">
              Copie permis de conduire valide* :
            </label>
            <input
              type="file"
              className="form-control"
              id="permisConduire"
              name="permisConduire"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="justificatifDomicile" className="form-label">
              Justificatif de domicile* :
            </label>
            <input
              type="file"
              className="form-control"
              id="justificatifDomicile"
              name="justificatifDomicile"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Valider
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
