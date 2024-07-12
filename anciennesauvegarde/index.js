const express = require("express");
require("dotenv").config();

const axios = require("axios");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fileUpload = require("express-fileupload");
const app = express();
const port = 3000;

const cors = require("cors");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // par exemple, une limite de 50MB pour les fichiers
    safeFileNames: true,
    preserveExtension: true,
  })
);

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const sarbacaneAPI =
  "https://sarbacaneapis.com/v1/lists/LmknKBzZTJ-MK-ZG_LzjUA/contacts";
const sarbacaneHeaders = {
  "Content-Type": "application/json",
  AccountId: process.env.SARBACANE_ACCOUNT_ID,
  ApiKey: process.env.SARBACANE_API_KEY,
};

const sarbacaneEmailAPI = "https://api.sarbacane.com/sendkit/email/send";
const sarbacaneEmailApiKey = process.env.SARBACANE_EMAIL_API_KEY;

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'api de A110");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Erreur du serveur" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Nom d'utilisateur incorrect" });
      }
      const user = results[0];
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET_KEY // Utilisation de la clé secrète du fichier .env
      );
      return res.json({ token }); // Envoi du token au client
    }
  );
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    console.log("Aucun token fourni.");
    return res.sendStatus(401); // Pas de token, renvoi d'une réponse Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log("Erreur lors de la vérification du token: ", err.message);
      return res.sendStatus(403); // Token non valide, renvoi d'une réponse Forbidden
    }
    req.user = user; // Si le token est valide, stockage des infos utilisateur dans req.user
    next(); // Passage au middleware/route suivant(e)
  });
};
////////////////////////////////////////////////////////////////////////envoie de mail via la page contact //////////////////////////////////////////////////////////////////////
app.post("/send-contact-email", async (req, res) => {
  const { name, firstName, phone, email, comment } = req.body;
  const message = `Nom: ${name} \nPrénom: ${firstName} \nTéléphone: ${phone} \nEmail: ${email} \nCommentaire: ${comment}`;

  const dataEmail = {
    to: [
      {
        address: "f.decker@ortrium.fr",
        personalName: "Service Client",
      },
    ],
    msg: {
      from: { personalName: "A110.club", address: "f.decker@ortrium.fr" },
      subject: "Nouveau message page contact",
      text: message,
      html: `
      <div style="background-color: #f2f2f2; padding: 40px; text-align: center; color: #333; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <img src="https://demo.a110.club/assets/logoPhoenix78.png" alt="logo" style="width: 70px; margin-bottom: 20px;">
        <h1 style="color: #0275d8; margin-bottom: 20px;">Vous avez un nouveau message de la page contact</h1>
        <p style="margin-bottom: 10px; font-size: 16px; color: #555;">
          De : <strong>${firstName} ${name}</strong>
        </p>
        <p style="margin-bottom: 10px; font-size: 16px; color: #555;">
          Email : <strong>${email}</strong>
        </p>
        <p style="margin-bottom: 10px; font-size: 16px; color: #555;">
          Téléphone : <strong>${phone}</strong>
        </p>
        <p style="margin-bottom: 20px; font-size: 16px; color: #555;">
          Commentaire : <strong>${comment}</strong>
        </p>
      </div>
    </div>
      `,
    },
  };

  try {
    await axios.post(sarbacaneEmailAPI, dataEmail, {
      headers: {
        "Content-Type": "application/json",
        "x-apikey": sarbacaneEmailApiKey,
      },
    });
    console.log("Contact email sent via Sarbacane successfully.");
    res.send("Contact message recorded and email sent successfully!");
  } catch (emailError) {
    console.error("Error sending contact email via Sarbacane:", emailError);
    res.status(500).send("Failed to send contact email.");
  }
});

/////////////////////////////// Envoi de données de réservation à Sarbacane et enregistrement dans la base de données//////////////////////////////////////////////////////////////////////

app.post("/send", async (req, res) => {
  const {
    nom,
    prenom,
    email,
    telephone,

    commentaire,
    prix_estime,
    date_debut,
    date_fin,
    lieu_depart,

    heure_depart,
    heure_retour,
  } = req.body;

  try {
    await axios.post(
      sarbacaneAPI,
      {
        LASTNAME_ID: nom,
        FIRSTNAME_ID: prenom,
        email,
        phone: telephone,
        "5fypmpyyxkf4pdt9oxf6ug": commentaire,
      },
      { headers: sarbacaneHeaders }
    );
    console.log("Data sent to Sarbacane successfully.");
  } catch (error) {
    console.error("Error sending data to Sarbacane:", error);
    return res.status(500).send("Error sending data to Sarbacane.");
  }

  const insertQuery = `
  INSERT INTO Reservations 
  (nom, prenom, email, telephone, commentaire, prix_estime, date_debut, date_fin, lieu, heure_depart, heure_retour, etat) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  const reservationData = [
    nom,
    prenom,
    email,
    telephone,
    commentaire,
    prix_estime,
    date_debut,
    date_fin,
    "12 avenue des pres 78180 Montigny-le-Bretonneux",
    heure_depart,
    heure_retour,
    "en attente",
  ];

  db.query(insertQuery, reservationData, async (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).send("Error inserting data.");
    }
    console.log("Data inserted into the database successfully.");

    const dataEmail = {
      to: [
        {
          address: "f.decker@ortrium.fr",
          personalName: "Recipient Name",
        },
      ],
      msg: {
        from: { personalName: "A110.club", address: "f.decker@ortrium.fr" },
        subject: "Nouvelle demande de réservation ALPINE A110",
        text: "text version",
        html: `
      <div style="background-color: #f2f2f2; padding: 40px; text-align: center; color: #333; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <img src="https://demo.a110.club/assets/logoPhoenix78.png" alt="logo" style="width: 70px; margin-bottom: 20px;">
    <hr style="border: 0; height: 1px; background-color: #ddd; margin-bottom: 20px;">
    <h1 style="color: #0275d8; margin-bottom: 20px;">Nouvelle réservation de l'A110</h1>
    <p style="margin-bottom: 10px; font-size: 16px; color: #555;">Le véhicule veut être réservé par <strong>${prenom} ${nom}</strong></p>
    <p style="margin-bottom: 20px; font-size: 16px; color: #555;">La validation n'attend plus que vous, Franck ! Ou peut-être pas..</p>
    <a href="https://demo.a110.club/#/administration" style="display: inline-block; background-color: #0275d8; color: #ffffff; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-weight: bold;">Valider la réservation</a>
  </div>
</div>

      `,
      },
    };

    try {
      await axios.post(sarbacaneEmailAPI, dataEmail, {
        headers: {
          "Content-Type": "application/json",
          "x-apikey": sarbacaneEmailApiKey,
        },
      });
      console.log("Email sent via Sarbacane successfully.");
      res.send("Reservation recorded and email sent successfully!");
    } catch (emailError) {
      console.error("Error sending email via Sarbacane:", emailError);
    }
  });
});

app.use(cors());

//////////////////////////////////////////////////////////////////////TEST TOKEN ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/test-token", authenticateToken, (req, res) => {
  res.json({ message: "Token valide!", user: req.user });
});

//////////////////////////////////////////////////////////////////////////////////////////////  GET  RESERVATIONS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/reservations", authenticateToken, (req, res) => {
  db.query("SELECT * FROM Reservations", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Route pour ajouter une date réservée
app.post("/reservationsdate/add", authenticateToken, (req, res) => {
  const { date_debut, date_fin, etat } = req.body;
  const insertQuery =
    "INSERT INTO Reservationsdate (date_debut, date_fin, etat) VALUES (?, ?, ?)";
  db.query(insertQuery, [date_debut, date_fin, etat], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'insertion des dates réservées:", err);
      return res
        .status(500)
        .send("Erreur lors de l'ajout des dates réservées.");
    }
    res.send("Dates réservées ajoutées avec succès.");
  });
});

// Endpoint pour récupérer les dates réservées
app.get("/reservations/dates", authenticateToken, (req, res) => {
  db.query("SELECT * FROM Reservationsdate", (err, results) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération des dates réservées :",
        err
      );
      return res
        .status(500)
        .send("Erreur lors de la récupération des dates réservées.");
    }
    res.json(results);
  });
});

// Route pour obtenir les détails d'une réservation par ID
app.post("/reservations/update", authenticateToken, (req, res) => {
  const { id, nouvelEtat, commentaire } = req.body;

  db.query(
    "SELECT * FROM Reservations WHERE id = ?",
    [id],
    async (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération de la réservation:", err);
        return res
          .status(500)
          .send("Erreur lors de la récupération de la réservation");
      }

      if (results.length > 0) {
        const reservation = results[0];

        db.query(
          "UPDATE Reservations SET etat = ? WHERE id = ?",
          [nouvelEtat, id],
          async (updateErr, updateResults) => {
            if (updateErr) {
              console.error(
                "Erreur lors de la mise à jour de la réservation:",
                updateErr
              );
              return res
                .status(500)
                .send("Erreur lors de la mise à jour de la réservation");
            }

            try {
              if (nouvelEtat === "validé") {
                await sendConfirmationEmail(reservation.email, reservation);
              } else if (nouvelEtat === "refusé") {
                await sendRefusalEmail(
                  reservation.email,
                  commentaire,
                  reservation.nom
                );
              }

              res.send("Réservation mise à jour avec succès et email envoyé.");
            } catch (emailError) {
              console.error("Erreur lors de l'envoi de l'email:", emailError);
              res.status(500).send("Erreur lors de l'envoi de l'email.");
            }
          }
        );
      } else {
        res.status(404).send("Réservation non trouvée.");
      }
    }
  );
});

/////////////////////////////////////////////////////////////////////////////////////////////////// RESERVATIONS mis a jour ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/reservations/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM Reservations WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération de la réservation:", err);
      return res.status(500).send("Erreur interne du serveur");
    }
    if (result.length === 0) {
      return res.status(404).send("Réservation non trouvée");
    }
    res.json(result[0]);
  });
});

//////////////////////////////////////////////////////////////// UPDATE RESERVATIONS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.put("/reservations/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const {
    nom,
    prenom,
    email,
    telephone,
    date_debut,
    date_fin,
    prix_estime,
    commentaire,
  } = req.body;
  const updateQuery = `
    UPDATE Reservations 
    SET nom = ?, prenom = ?, email = ?, telephone = ?, date_debut = ?, date_fin = ?, prix_estime = ?, commentaire = ?
    WHERE id = ?;
  `;
  db.query(
    updateQuery,
    [
      nom,
      prenom,
      email,
      telephone,
      date_debut,
      date_fin,
      prix_estime,
      commentaire,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de la réservation:", err);
        return res.status(500).send("Erreur interne du serveur");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Réservation non trouvée");
      }
      res.send("Réservation mise à jour avec succès");
    }
  );
});

app.delete("/reservations/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Reservations WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de la réservation:", err);
      return res.status(500).send("Erreur interne du serveur");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Réservation non trouvée");
    }
    res.send("Réservation supprimée avec succès");
  });
});

// //////////////////////////////////////////////////////// EMAILS REFUS ET ACCEPTE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function sendConfirmationEmail(email, reservation) {
  const {
    nom,
    prenom,
    commentaire,
    prix_estime,
    date_debut,
    date_fin,
    lieu,
    heure_depart,
    heure_retour,
  } = reservation;

  const emailContent = {
    to: [{ address: email, personalName: `${nom} ${prenom}` }],
    msg: {
      from: {
        personalName: "Service de Réservation Phoenix78",
        address: "contact78@a110.club",
      },
      subject: "Confirmation de votre réservation",
      html: `<!DOCTYPE html>
      <html>
      <head>
      <title>Confirmation de Réservation</title>
      <style>
        .email-container {
          font-family: Arial, sans-serif;
          margin: 0 auto;
          max-width: 600px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: #f9f9f9;
        }
      
        .header {
          background-color: #007bff;
          color: #ffffff;
          padding: 10px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
      
        .body {
          padding: 20px;
          color: #333;
        }
      
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 0.8em;
          color: #666;
        }
      </style>
      </head>
      <body>
      <div class="email-container">
        <div class="header">Confirmation de Votre Réservation</div>
        <div class="body">
          <img src="https://demo.a110.club/assets/logoPhoenix78.png" alt="logo" style="width: 70px; margin-bottom: 20px;">
          <p>Bonjour ${nom} ${prenom},</p>
          <p>Votre réservation a été confirmée. Voici les détails de votre réservation :</p>
          <ul>
            <li>Date de début: ${new Date(date_debut).toLocaleDateString()}</li>
            <li>Heure de départ: ${heure_depart}</li>
            <li>Date de fin: ${new Date(date_fin).toLocaleDateString()}</li>
            <li>Heure de retour: ${heure_retour}</li>
            <li>Lieu: ${lieu}</li>
            <li>Prix estimé: €${prix_estime}</li>
          </ul>
        </div>
        <div class="footer">
          Merci d'avoir choisi notre service.
        </div>
      </div>
      </body>
      </html>
      `,
    },
  };
  await axios.post(sarbacaneEmailAPI, emailContent, {
    headers: {
      "Content-Type": "application/json",
      "x-apikey": sarbacaneEmailApiKey,
    },
  });
}

async function sendRefusalEmail(email, commentaire, nom) {
  const emailContent = {
    to: [{ address: email, personalName: nom }],
    msg: {
      from: {
        personalName: "Phoenix78",
        address: "contact78@a110.club",
      },
      subject: "Votre réservation a été refusée",
      html: `<!DOCTYPE html>
      <html>
      <head>
      <title>Réservation Refusée</title>
      <style>
        .email-container {
          font-family: Arial, sans-serif;
          margin: 0 auto;
          max-width: 600px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: #f9f9f9;
        }
      
        .header {
          background-color: #dc3545;
          color: #ffffff;
          padding: 10px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
      
        .body {
          padding: 20px;
          color: #333;
        }
      
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 0.8em;
          color: #666;
        }
      </style>
      </head>
      <body>
      <div class="email-container">
        <div class="header">Votre Réservation a été Refusée</div>
        <div class="body">
          <p>Bonjour ${nom},</p>
          <p>Malheureusement, votre réservation a été refusée.</p>
          <p>Raison: ${commentaire}</p>
        </div>
        <div class="footer">
          Pour plus d'informations, n'hésitez pas à nous contacter.
        </div>
      </div>
      </body>
      </html>
      `,
    },
  };
  await axios.post(sarbacaneEmailAPI, emailContent, {
    headers: {
      "Content-Type": "application/json",
      "x-apikey": sarbacaneEmailApiKey,
    },
  });
}

////////////// LISTE CONTACTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/particuliers", (req, res) => {
  const {
    nom,
    prenom,
    email,
    telephone,
    adressePostale,
    codePostal,
    ville,
    dateNaissance,
    lieuNaissance,
  } = req.body;
  const carteIdentite = req.files.carteIdentite.data;
  const justificatifDomicile = req.files.justificatifDomicile.data;
  const permisConduire = req.files.permisConduire.data;

  const query = `INSERT INTO Particulier (nom, prenom, email, telephone, adressePostale, codePostal, ville, dateNaissance, lieuNaissance, carteIdentite, justificatifDomicile, permisConduire) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      nom,
      prenom,
      email,
      telephone,
      adressePostale,
      codePostal,
      ville,
      dateNaissance,
      lieuNaissance,
      carteIdentite,
      justificatifDomicile,
      permisConduire,
    ],
    (err, results) => {
      if (err) {
        console.error(
          "Erreur lors de l'insertion dans la base de données",
          err
        );
        return res
          .status(500)
          .send("Erreur lors de l'enregistrement des données");
      }
      res.send("Particulier enregistré avec succès");
    }
  );
});

app.get("/particuliers", authenticateToken, async (req, res) => {
  try {
    db.query("SELECT * FROM Particulier", (err, result) => {
      if (err) {
        console.error("Erreur lors de la récupération des particuliers", err);
        return res
          .status(500)
          .send("Erreur lors de la récupération des données");
      }
      res.json(result);
    });
  } catch (error) {
    console.error("Erreur serveur", error);
    res.status(500).send("Erreur interne du serveur");
  }
});

app.post("/particuliers/update", authenticateToken, (req, res) => {
  const { id, nom, prenom, email, telephone } = req.body;

  let query = `UPDATE Particulier SET nom = ?, prenom = ?, email = ?, telephone = ?`;
  let parameters = [nom, prenom, email, telephone];

  if (req.files) {
    if (req.files.carteIdentite) {
      query += `, carteIdentite = ?`;
      parameters.push(req.files.carteIdentite.data);
    }
    if (req.files.justificatifDomicile) {
      query += `, justificatifDomicile = ?`;
      parameters.push(req.files.justificatifDomicile.data);
    }
    if (req.files.permisConduire) {
      query += `, permisConduire = ?`;
      parameters.push(req.files.permisConduire.data);
    }
  }

  if (!id) {
    return res.status(400).send("L'ID du particulier est requis.");
  }

  query += ` WHERE id = ?`;
  parameters.push(id);

  db.query(query, parameters, (err, results) => {
    if (err) {
      console.error(
        "Erreur lors de la mise à jour dans la base de données",
        err
      );
      return res.status(500).send("Erreur lors de la mise à jour des données.");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Particulier non trouvé avec l'ID fourni.");
    }
    res.send("Particulier mis à jour avec succès.");
  });
});

app.post("/professionnels", (req, res) => {
  const {
    siret,
    nomEntreprise,
    adressePostaleEntreprise,
    codePostalEntreprise,
    villeEntreprise,
    mobileEntreprise,
    kbis,

    nom,
    prenom,
    dateNaissance,
    lieuNaissance,
    adressePostale,
    codePostal,
    ville,
    mobile,
    email,
  } = req.body;

  const carteIdentite = req.files?.carteIdentite?.data;
  const permisConduire = req.files?.permisConduire?.data;
  const justificatifDomicile = req.files?.justificatifDomicile?.data;

  const sql = `
    INSERT INTO Professionnels (
      siret, nomEntreprise, adressePostaleEntreprise, codePostalEntreprise, villeEntreprise, mobileEntreprise, kbis,
      nom, prenom, dateNaissance, lieuNaissance, adressePostale, codePostal, ville, mobile, email, 
      carteIdentite, permisConduire, justificatifDomicile
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `;

  const values = [
    siret,
    nomEntreprise,
    adressePostaleEntreprise,
    codePostalEntreprise,
    villeEntreprise,
    mobileEntreprise,
    kbis,
    nom,
    prenom,
    dateNaissance,
    lieuNaissance,
    adressePostale,
    codePostal,
    ville,
    mobile,
    email,
    carteIdentite,
    permisConduire,
    justificatifDomicile,
  ];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error(
        "Erreur lors de l'insertion dans la base de données",
        error
      );
      return res.status(500).send("Erreur lors de l'insertion des données.");
    }
    res.send("Enregistrement ajouté avec succès.");
  });
});

app.get("/professionnels", authenticateToken, (req, res) => {
  db.query("SELECT * FROM Professionnels", (err, results) => {
    if (err) {
      console.error("Error fetching data: ", err);
      res.status(500).send("Error fetching data");
    } else {
      res.json(results);
    }
  });
});

// Route pour obtenir les détails d'un professionnel par ID
app.get("/professionnels/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM Professionnels WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des données :", err);
        return res
          .status(500)
          .send("Erreur lors de la récupération des données.");
      }
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).send("Professionnel non trouvé avec l'ID fourni.");
      }
    }
  );
});

// Route pour obtenir les détails d'un particulier par ID
app.get("/particuliers/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Particulier WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des données :", err);
      return res
        .status(500)
        .send("Erreur lors de la récupération des données.");
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send("Particulier non trouvé avec l'ID fourni.");
    }
  });
});

// route des evenements

// Endpoint pour ajouter un événement
app.post("/evenements", async (req, res) => {
  const { title, date, description, location, is_past } = req.body;
  let image = null;
  if (req.files && req.files.image) {
    image = req.files.image.data; // Accès direct aux données du fichier uploadé
  }

  const insertQuery = `
      INSERT INTO events (title, event_date, description, location, image, is_past)
      VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    insertQuery,
    [title, date, description, location, image, is_past],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de l'insertion de l'événement :", err);
        return res.status(500).send("Erreur lors de l'ajout de l'événement.");
      }
      res.send("Événement ajouté avec succès.");
    }
  );
});

//selectionne les evenemnts ou is past est null
app.get("/evenements/null", (req, res) => {
  const selectQuery = `
      SELECT * FROM events WHERE is_past IS NULL;
  `;

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des événements :", err);
      return res
        .status(500)
        .send("Erreur lors de la récupération des événements.");
    }
    res.json(results);
  });
});

// Endpoint pour récupérer tous les événements
app.get("/evenements", (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des événements :", err);
      return res
        .status(500)
        .send("Erreur lors de la récupération des événements.");
    }
    res.json(results);
  });
});

// Endpoint pour mettre a jour un événement
app.put("/evenements/:id", authenticateToken, (req, res) => {
  const { title, date, description, location, image_url, is_past } = req.body;
  const { id } = req.params;
  const updateQuery = `
    UPDATE events 
    SET title = ?, event_date = ?, description = ?, location = ?, image_url = ?, is_past = ?
    WHERE id = ?
  `;
  db.query(
    updateQuery,
    [title, date, description, location, image_url, is_past, id],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de l'événement :", err);
        return res
          .status(500)
          .send("Erreur lors de la mise à jour de l'événement.");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Événement non trouvé avec l'ID fourni.");
      }
      res.send("Événement mis à jour avec succès.");
    }
  );
});

// Endpoint pour supprimer un événement
app.delete("/evenements/:id", authenticateToken, (req, res) => {
  const { id } = req.params; // Récupère l'ID de l'événement à partir de l'URL

  const deleteQuery = "DELETE FROM events WHERE id = ?";

  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de l'événement:", err);
      return res.status(500).send("Erreur interne du serveur");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Événement non trouvé");
    }
    res.send("Événement supprimé avec succès");
  });
});

const convertirDateEtHeureFRVersISO = (dateFR, heureFR) => {
  const [jour, mois, annee] = dateFR.split("/").map(Number);
  const [heures, minutes] = heureFR.split(":").map(Number);
  return new Date(Date.UTC(annee, mois - 1, jour, heures - 1, minutes));
};

const calculerPrix = (startDate, startTime, endDate, endTime) => {
  const tarifBaseSemaine = 290;
  const tarifBaseWeekend = 350;
  const reductions = [1, 0.92, 0.9, 0.88, 0.86, 0.84, 0.82, 0.8, 0.78, 0.76];
  const kmParJour = 250;

  // Conversion des dates et heures en format ISO
  const dateTimeDebut = convertirDateEtHeureFRVersISO(startDate, startTime);
  const dateTimeFin = convertirDateEtHeureFRVersISO(endDate, endTime);

  // Calcul du temps total en millisecondes et conversion en heures et jours
  let totalMilliseconds = dateTimeFin - dateTimeDebut;
  let totalHours = totalMilliseconds / (1000 * 60 * 60); // Convertir en heures
  let totalDays = Math.ceil(totalHours / 24); // Convertir en jours complets

  // Trouver l'index de la réduction correspondant au nombre de jours
  let reductionIndex = Math.min(totalDays - 1, reductions.length - 1);
  let reduction = reductions[reductionIndex];

  // Calculer le prix total en fonction du type de jour
  let prixTotalSansReduction = 0;
  let prixTotalAvecReduction = 0;
  let currentDateTime = new Date(dateTimeDebut);

  for (let i = 0; i < totalDays; i++) {
    let dayOfWeek = currentDateTime.getDay();
    let tarifBase;

    // Vérifier si la période chevauche de vendredi 12h à samedi 12h
    if (
      (dayOfWeek === 5 && currentDateTime.getHours() >= 12) ||
      (dayOfWeek === 6 && currentDateTime.getHours() < 12)
    ) {
      tarifBase = tarifBaseWeekend;
    } else {
      tarifBase =
        dayOfWeek === 0 || dayOfWeek === 6
          ? tarifBaseWeekend
          : tarifBaseSemaine;
    }

    prixTotalSansReduction += tarifBase;
    prixTotalAvecReduction += tarifBase * reduction;
    currentDateTime.setDate(currentDateTime.getDate() + 1);
  }

  // Calcul du kilométrage total et de la remise
  const kilometrageTotal = kmParJour * totalDays;
  const montantRemise = prixTotalSansReduction - prixTotalAvecReduction;

  // Calcul du prix pour un jour supplémentaire
  let prixTotalAvecUnJourDePlus = 0;
  let reductionAvecUnJourDePlus = reductions[Math.min(totalDays, reductions.length - 1)];
  currentDateTime = new Date(dateTimeDebut);
  
  for (let i = 0; i <= totalDays; i++) {
    let dayOfWeek = currentDateTime.getDay();
    let tarifBase;

    // Vérifier si la période chevauche de vendredi 12h à samedi 12h
    if (
      (dayOfWeek === 5 && currentDateTime.getHours() >= 12) ||
      (dayOfWeek === 6 && currentDateTime.getHours() < 12)
    ) {
      tarifBase = tarifBaseWeekend;
    } else {
      tarifBase =
        dayOfWeek === 0 || dayOfWeek === 6
          ? tarifBaseWeekend
          : tarifBaseSemaine;
    }

    prixTotalAvecUnJourDePlus += tarifBase * reductionAvecUnJourDePlus;
    currentDateTime.setDate(currentDateTime.getDate() + 1);
  }

  const messageUnJourDePlus = `Réservez un jour de plus pour un total de ${prixTotalAvecUnJourDePlus.toFixed(2)} € soit une remise supplémentaire de ${((1 - reductionAvecUnJourDePlus) * 100).toFixed(0)}%`;

  return {
    prixTotalSansReduction,
    prixTotalAvecReduction,
    kilometrageTotal,
    montantRemise,
    messageUnJourDePlus
  };
};

app.post("/calculer-prix", (req, res) => {
  const { startDate, startTime, endDate, endTime } = req.body;

  try {
    const {
      prixTotalSansReduction,
      prixTotalAvecReduction,
      kilometrageTotal,
      montantRemise,
      messageUnJourDePlus
    } = calculerPrix(startDate, startTime, endDate, endTime);
    res.json({
      prixTotalSansReduction,
      prixTotalAvecReduction,
      kilometrageTotal,
      montantRemise,
      messageUnJourDePlus
    });
  } catch (error) {
    console.error("Erreur lors du calcul du prix :", error);
    res.status(500).send("Erreur lors du calcul du prix");
  }
});


app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
