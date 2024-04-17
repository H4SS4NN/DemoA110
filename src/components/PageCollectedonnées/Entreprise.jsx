import React, { useState } from "react";

import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    siret: "",
    nomEntreprise: "",
    adressePostaleEntreprise: "",
    codePostalEntreprise: "",
    villeEntreprise: "",
    mobileEntreprise: "",
    kbis: null,

    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuNaissance: "",
    adressePostale: "",
    codePostal: "",
    ville: "",
    mobile: "",
    email: "",
    carteIdentite: null,
    permisConduire: null,
    justificatifDomicile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };
  function formaterSIRET() {
    const siret = document.getElementById("siret");
    let siretValue = siret.value.replace(/\s/g, "").replace(/\D/g, "");
    if (siretValue.length >= 10) {
      siretValue = siretValue.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{1,5})$/,
        "$1 $2 $3 $4"
      );
    } else if (siretValue.length >= 1) {
      siretValue = siretValue.match(/.{1,3}/g).join(" ");
    }
    siret.value = siretValue;
    handleChange({ target: siret }); // Appelle handleChange pour mettre à jour l'état
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      dataToSubmit.append(key, formData[key]);
    });

    axios
      .post("http://localhost:3000/professionnels", dataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Form submitted successfully", response);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("There was an error submitting the form", error);
        setIsSubmitted(false);
      });
  };
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      {isSubmitted ? (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">
            <i className="bi bi-check-circle-fill text-success"></i> Bien
            envoyé!
          </h4>
          <p>Vos informations ont été soumises avec succès.</p>
          <hr />
          <p className="mb-0">Merci de votre participation.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center ">
            <div>
              <h2>Entreprise :</h2>
              <div className="mb-3">
                <label htmlFor="siret" className="form-label">
                  SIRET* :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="siret"
                  name="siret"
                  required
                  value={formData.siret}
                  onChange={formaterSIRET}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="nomEntreprise" className="form-label">
                  Nom d'entreprise* :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nomEntreprise"
                  name="nomEntreprise"
                  required
                  value={formData.nomEntreprise}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="adressePostaleEntreprise"
                  className="form-label"
                >
                  Adresse postale de l'entreprise* :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="adressePostaleEntreprise"
                  name="adressePostaleEntreprise"
                  required
                  value={formData.adressePostaleEntreprise}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="codePostalEntreprise" className="form-label">
                  Code postal de l'entreprise* :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="codePostalEntreprise"
                  name="codePostalEntreprise"
                  required
                  value={formData.codePostalEntreprise}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="villeEntreprise" className="form-label">
                  Ville de l'entreprise* :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="villeEntreprise"
                  name="villeEntreprise"
                  required
                  value={formData.villeEntreprise}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobileEntreprise" className="form-label">
                  Mobile de l'entreprise* :
                </label>
                <input
                  type="phone"
                  className="form-control"
                  id="mobileEntreprise"
                  name="mobileEntreprise"
                  required
                  value={formData.mobileEntreprise}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="kbis" className="form-label">
                  KBIS* :
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="kbis"
                  name="kbis"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="w-25">
              {" "}
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">
                  Nom* :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  name="nom"
                  required
                  value={formData.nom}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">
                  Prénom* :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prenom"
                  name="prenom"
                  required
                  value={formData.prenom}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dateNaissance" className="form-label">
                  Date de naissance* :
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateNaissance"
                  name="dateNaissance"
                  required
                  value={formData.dateNaissance}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lieuNaissance" className="form-label">
                  Lieu de naissance* :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lieuNaissance"
                  name="lieuNaissance"
                  required
                  value={formData.lieuNaissance}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="adressePostale" className="form-label">
                  Adresse postale* :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="adressePostale"
                  name="adressePostale"
                  required
                  value={formData.adressePostale}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="codePostal" className="form-label">
                  Code postal* :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="codePostal"
                  name="codePostal"
                  required
                  value={formData.codePostal}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="mb-3">
                <label htmlFor="ville" className="form-label">
                  Ville* :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ville"
                  name="ville"
                  required
                  value={formData.ville}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile* :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email* :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="carteIdentite" className="form-label">
                  Copie carte identité/passeport valide* :
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="carteIdentite"
                  name="carteIdentite"
                  required
                  onChange={handleFileChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="permisConduire" className="form-label">
                  Copie permis de conduire valide* :
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="permisConduire"
                  name="permisConduire"
                  required
                  onChange={handleFileChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="justificatifDomicile" className="form-label">
                  Justificatif de domicile* :
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="justificatifDomicile"
                  name="justificatifDomicile"
                  required
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
