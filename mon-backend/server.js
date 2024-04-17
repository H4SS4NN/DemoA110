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
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(fileUpload());

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
    <img src="A110/src/assets/logoPhoenix78.png" alt="logo" style="width: 70px; margin-bottom: 20px;">
    <hr style="border: 0; height: 1px; background-color: #ddd; margin-bottom: 20px;">
    <h1 style="color: #0275d8; margin-bottom: 20px;">Nouvelle réservation de l'A110</h1>
    <p style="margin-bottom: 10px; font-size: 16px; color: #555;">Le véhicule veut être réservé par <strong>${prenom} ${nom}</strong></p>
    <p style="margin-bottom: 20px; font-size: 16px; color: #555;">La validation n'attend plus que vous, Franck ! Ou peut-être pas..</p>
    <a href="https://example.com/validation" style="display: inline-block; background-color: #0275d8; color: #ffffff; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-weight: bold;">Valider la réservation</a>
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

app.get("/test-token", authenticateToken, (req, res) => {
  res.json({ message: "Token valide!", user: req.user });
});

app.get("/reservations", (req, res) => {
  db.query("SELECT * FROM Reservations", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

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
          "UPDATE Reservations SET etat = ?, commentaire = ? WHERE id = ?",
          [nouvelEtat, commentaire, id],
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
                await sendConfirmationEmail(
                  reservation.email,
                  commentaire,
                  reservation.nom
                );
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

app.post("/reservations/updates", authenticateToken, (req, res) => {
  console.log("Données reçues pour la mise à jour :", req.body);
  const {
    id,
    nom,
    prenom,
    email,
    telephone,
    date_debut,
    date_fin,
    prix_estime,
    commentaire,
    etat,
  } = req.body;

  const query = `
      UPDATE Reservations 
      SET 
        nom = ?, 
        prenom = ?, 
        email = ?, 
        telephone = ?, 
        date_debut = ?, 
        date_fin = ?, 
        prix_estime = ?, 
        commentaire = ?, 
        etat = ?
      WHERE id = ?
    `;

  db.query(
    query,
    [
      nom,
      prenom,
      email,
      telephone,
      date_debut,
      date_fin,
      prix_estime,
      commentaire,
      etat,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de la réservation:", err);
        return res
          .status(500)
          .send("Erreur lors de la mise à jour de la réservation");
      }

      res.send("Réservation mise à jour avec succès");
    }
  );
});
async function sendConfirmationEmail(email, commentaire, nom) {
  const emailContent = {
    to: [{ address: email, personalName: nom }],
    msg: {
      from: {
        personalName: "Phoenix78",
        address: "f.decker@ortrium.fr",
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
          <p>Bonjour ${nom},</p>
          <p>Votre réservation a été confirmée.</p>
          <p>Raison: ${commentaire}</p>
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
        address: "f.decker@ortrium.fr",
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

app.post("/contact", authenticateToken, async (req, res) => {
  const { recaptchaToken, ...formData } = req.body;

  try {
    const response = await axios.post(
      "URL_DE_VALIDATION_RECAPTCHA",
      { token: recaptchaToken },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data.success) {
      // Le token reCAPTCHA est valide, traitez le formulaire ici
      res.send("Formulaire soumis avec succès !");
    } else {
      // Le token reCAPTCHA est invalide, renvoyez un message d'erreur au frontend
      res.status(400).send("Échec de la validation reCAPTCHA.");
    }
  } catch (error) {
    console.error("Erreur lors de la validation reCAPTCHA :", error);
    res.status(500).send("Erreur serveur.");
  }
});

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
app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
