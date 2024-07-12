require("dotenv").config();

const express = require("express");
const axios = require("axios");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fileUpload = require("express-fileupload");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;
const moment = require("moment");
const cors = require("cors");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // par exemple, une limite de 50MB pour les fichiers
    safeFileNames: true,
    preserveExtension: true,
  })
);

const sarbacaneAPI =
  "https://sarbacaneapis.com/v1/lists/LmknKBzZTJ-MK-ZG_LzjUA/contacts";
const sarbacaneHeaders = {
  "Content-Type": "application/json",
  AccountId: process.env.SARBACANE_ACCOUNT_ID,
  ApiKey: process.env.SARBACANE_API_KEY,
};

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // email
    pass: process.env.EMAIL_PASS, // password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Vérifier la connexion SMTP
transporter.verify((error, success) => {
  if (error) {
    console.error(
      "Erreur lors de la vérification du transporteur SMTP;",
      error
    );
  } else {
    console.log("Transporteur SMTP prêt à envoyer des emails");
  }
});

// Fonction pour envoyer des e-mails
async function sendEmail(to, subject, text, html) {
  const mailOptions = {
    from: "<support78@progedoc.fr>",
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    console.log("Message ID:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Throw error to propagate it back to the caller
  }
}

app.get("/test", (req, res) => {
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
  const {
    name,
    firstName,
    phone,
    email,
    comment,
    "g-recaptcha-response": recaptchaResponse,
  } = req.body;
  const message = `Nom: ${name} \nPrénom: ${firstName} \nTéléphone: ${phone} \nEmail: ${email} \nCommentaire: ${comment}`;

  const adminHtmlContent = `
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
  `;

  const userHtmlContent = `
      <div style="background-color: #f2f2f2; padding: 40px; text-align: center; color: #333; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <img src="https://demo.a110.club/assets/logoPhoenix78.png" alt="logo" style="width: 70px; margin-bottom: 20px;">
              <h1 style="color: #0275d8; margin-bottom: 20px;">Confirmation de réception de votre demande de contact</h1>
              <p style="margin-bottom: 20px; font-size: 16px; color: #555;">
                  Bonjour ${firstName} ${name},<br><br>
                  Nous avons bien reçu votre demande de contact. Nous reviendrons vers vous dans les plus brefs délais.
              </p>
          </div>
      </div>
  `;

  try {
    const recaptchaSecretKey = "6Lc74fYpAAAAAEst4N6BAb6-BgJgKdIdjF9iFa4B";
    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaResponse}`;
    const recaptchaVerification = await axios.post(recaptchaVerifyUrl, null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!recaptchaVerification.data.success) {
      console.error(
        "reCAPTCHA verification error:",
        recaptchaVerification.data
      );
      return res.status(400).json({
        message: "reCAPTCHA validation failed. Please try again.",
        recaptchaDetails: recaptchaVerification.data,
      });
    }

    // Envoi de l'email à l'administrateur après validation de reCAPTCHA
    await sendEmail(
      "f.decker@ortrium.fr",
      "Nouveau message page contact",
      message,
      adminHtmlContent
    );

    // Envoi de l'email à l'utilisateur après validation de reCAPTCHA
    await sendEmail(
      email,
      "Confirmation de réception de votre demande de contact",
      "Nous avons bien reçu votre demande de contact.",
      userHtmlContent
    );

    res.json({
      message: "Contact message recorded and emails sent successfully!",
      recaptchaDetails: recaptchaVerification.data,
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    res.status(500).json({
      message: "Failed to send contact email.",
      error: error.message,
    });
  }
});

/////////////////////////////// Envoi de données de réservation à Sarbacane et enregistrement dans la base de données//////////////////////////////////////////////////////////////////////

// Route POST pour envoyer des e-mails de réservation
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
    "g-recaptcha-response": recaptchaResponse,
  } = req.body;

  // Désactivation temporaire de la vérification reCAPTCHA pour les tests
  /*
  const recaptchaSecretKey = "6Lc74fYpAAAAAEst4N6BAb6-BgJgKdIdjF9iFa4B";
  const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaResponse}`;

  try {
    // Vérification reCAPTCHA
    const recaptchaVerification = await axios.post(recaptchaVerifyUrl, null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!recaptchaVerification.data.success) {
      console.error(
        "reCAPTCHA verification error:",
        recaptchaVerification.data
      );
      return res.status(400).json({
        message: "reCAPTCHA validation failed. Please try again.",
        recaptchaDetails: recaptchaVerification.data,
      });
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return res.status(500).json({
      message: "Failed to verify reCAPTCHA.",
      error: error.message,
    });
  }
  */

  // Insertion dans la base de données
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
    lieu_depart,
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

    // Préparation des emails
    const adminEmail = "f.decker@ortrium.fr";
    const userEmailSubject =
      "Confirmation de votre demande de réservation ALPINE A110";
    const adminEmailSubject = "Nouvelle demande de réservation ALPINE A110";
    const userEmailText = `Votre demande de réservation ALPINE A110 a bien été reçue, ${prenom} ${nom}.`;
    const adminEmailText = `Nouvelle demande de réservation ALPINE A110 par ${prenom} ${nom}.`;
    const userEmailHtml = `
      <div style="background-color: #f2f2f2; padding: 40px; text-align: center; color: #333; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <img src="https://demo.a110.club/assets/logoPhoenix78.png" alt="logo" style="width: 70px; margin-bottom: 20px;">
          <hr style="border: 0; height: 1px; background-color: #ddd; margin-bottom: 20px;">
          <h1 style="color: #0275d8; margin-bottom: 20px;">Confirmation de votre demande de réservation</h1>
          <p style="margin-bottom: 10px; font-size: 16px; color: #555;">Bonjour ${prenom} ${nom},</p>
          <p style="margin-bottom: 20px; font-size: 16px; color: #555;">Votre demande de réservation ALPINE A110 a bien été reçue.</p>
        </div>
      </div>
    `;
    const adminEmailHtml = `
      <div style="background-color: #f2f2f2; padding: 40px; text-align: center; color: #333; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <img src="https://demo.a110.club/assets/logoPhoenix78.png" alt="logo" style="width: 70px; margin-bottom: 20px;">
          <hr style="border: 0; height: 1px; background-color: #ddd; margin-bottom: 20px;">
          <h1 style="color: #0275d8; margin-bottom: 20px;">Nouvelle réservation de l'A110</h1>
          <p style="margin-bottom: 10px; font-size: 16px; color: #555;">Le véhicule veut être réservé par <strong>${prenom} ${nom}</strong></p>
          <p style="margin-bottom: 20px; font-size: 16px; color: #555;">La validation n'attend plus que vous, Franck ! Ou peut-être pas..</p>
          <a href="https://back.demo.a110.club/" style="display: inline-block; background-color: #0275d8; color: #ffffff; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-weight: bold;">Valider la réservation</a>
        </div>
      </div>
    `;

    try {
      await sendEmail(email, userEmailSubject, userEmailText, userEmailHtml); // Email à l'utilisateur
      await sendEmail(
        adminEmail,
        adminEmailSubject,
        adminEmailText,
        adminEmailHtml
      ); // Email à l'administrateur

      res.json({
        message: "Reservation recorded and emails sent successfully!",
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      res.status(500).json({
        message: "Reservation recorded but failed to send emails.",
        error: emailError.message,
      });
    }
  });
});

app.post("/test-email", async (req, res) => {
  const { nom, prenom, email } = req.body;

  const adminEmail = "f.decker@ortrium.fr";
  const userEmailSubject =
    "Confirmation de votre demande de réservation ALPINE A110";
  const adminEmailSubject = "Nouvelle demande de réservation ALPINE A110";
  const userEmailText = `Votre demande de réservation ALPINE A110 a bien été reçue, ${prenom} ${nom}.`;
  const adminEmailText = `Nouvelle demande de réservation ALPINE A110 par ${prenom} ${nom}.`;
  const userEmailHtml = `
    <div style="background-color: #f2f2f2; padding: 40px; text-align: center; color: #333; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <img src="https://demo.a110.club/assets/logoPhoenix78.png" alt="logo" style="width: 70px; margin-bottom: 20px;">
        <hr style="border: 0; height: 1px; background-color: #ddd; margin-bottom: 20px;">
        <h1 style="color: #0275d8; margin-bottom: 20px;">Confirmation de votre demande de réservation</h1>
        <p style="margin-bottom: 10px; font-size: 16px; color: #555;">Bonjour ${prenom} ${nom},</p>
        <p style="margin-bottom: 20px; font-size: 16px; color: #555;">Votre demande de réservation ALPINE A110 a bien été reçue.</p>
      </div>
    </div>
  `;
  const adminEmailHtml = `
    <div style="background-color: #f2f2f2; padding: 40px; text-align: center; color: #333; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <img src="https://demo.a110.club/assets/logoPhoenix78.png" alt="logo" style="width: 70px; margin-bottom: 20px;">
        <hr style="border: 0; height: 1px; background-color: #ddd; margin-bottom: 20px;">
        <h1 style="color: #0275d8; margin-bottom: 20px;">Nouvelle réservation de l'A110</h1>
        <p style="margin-bottom: 10px; font-size: 16px; color: #555;">Le véhicule veut être réservé par <strong>${prenom} ${nom}</strong></p>
        <p style="margin-bottom: 20px; font-size: 16px; color: #555;">La validation n'attend plus que vous, Franck ! Ou peut-être pas..</p>
        <a href="https://back.demo.a110.club/" style="display: inline-block; background-color: #0275d8; color: #ffffff; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-weight: bold;">Valider la réservation</a>
      </div>
    </div>
  `;

  try {
    await sendEmail(email, userEmailSubject, userEmailText, userEmailHtml); // Email à l'utilisateur
    await sendEmail(
      adminEmail,
      adminEmailSubject,
      adminEmailText,
      adminEmailHtml
    ); // Email à l'administrateur

    res.json({
      message: "Test emails sent successfully!",
    });
  } catch (emailError) {
    console.error("Error sending test email:", emailError);
    res.status(500).json({
      message: "Failed to send test emails.",
      error: emailError.message,
    });
  }
});

//////////////////////////////////////////////////////////////////////TEST TOKEN ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/test-token", authenticateToken, (req, res) => {
  res.json({ message: "Token valide!", user: req.user });
});

//////////////////////////////////////////////////////////////////////////////////////////////  GET  RESERVATIONS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/reservations", authenticateToken, (req, res) => {
  const month = req.query.month;
  const year = req.query.year;

  let query = "SELECT * FROM Reservations";
  if (month && year) {
    const startDate = moment(`${year}-${month}-01`)
      .startOf("month")
      .format("YYYY-MM-DD");
    const endDate = moment(`${year}-${month}-01`)
      .endOf("month")
      .format("YYYY-MM-DD");
    query += ` WHERE date_debut BETWEEN '${startDate}' AND '${endDate}'`;
  }
  query += " ORDER BY created_at DESC";

  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/reservations/search", authenticateToken, (req, res) => {
  const { startDate, endDate, nom, etat } = req.query;

  let query = `SELECT * FROM Reservations WHERE 1=1`;
  const params = [];

  if (startDate && endDate) {
    const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
    const formattedEndDate = moment(endDate).format("YYYY-MM-DD");
    query += ` AND date_debut BETWEEN ? AND ?`;
    params.push(formattedStartDate, formattedEndDate);
  }

  if (nom) {
    query += ` AND nom LIKE ?`;
    params.push(`%${nom}%`);
  }

  if (etat) {
    query += ` AND etat = ?`;
    params.push(etat);
  }

  query += ` ORDER BY date_debut DESC`;

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des réservations:", err);
      return res
        .status(500)
        .send("Erreur lors de la récupération des réservations.");
    }
    res.json(results);
  });
});

/// Route pour obtenir le nombre de réservations en attente
app.get("/reservations/pending-count", authenticateToken, (req, res) => {
  db.query(
    "SELECT COUNT(*) AS count FROM Reservations WHERE etat = 'en attente'",
    (err, results) => {
      if (err) {
        res
          .status(500)
          .send({ error: "Failed to fetch pending reservations count" });
      } else {
        res.send({ count: results[0].count });
      }
    }
  );
});

// Route pour ajouter une date réservée
app.post("/reservationsdate/add", authenticateToken, (req, res) => {
  const { date_debut, date_fin, etat } = req.body;
  console.log("Dates reçues:", { date_debut, date_fin, etat }); // Ajout des logs
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
  const query = "SELECT * FROM Reservationsdate ORDER BY date_debut DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des dates réservées:", err);
      return res
        .status(500)
        .send("Erreur lors de la récupération des dates réservées.");
    }
    res.json(results);
  });
});

// Route pour supprimer une date réservée
app.delete("/reservationsdate/delete/:id", authenticateToken, (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM Reservationsdate WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de la date réservée:", err);
      return res.status(500).send("Erreur interne du serveur");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Date réservée non trouvée");
    }
    res.send("Date réservée supprimée avec succès");
  });
});

const sendConfirmationEmail = async (email, reservation) => {
  const {
    nom,
    prenom,

    prix_estime,
    date_debut,
    date_fin,
    lieu,
    heure_depart,
    heure_retour,
  } = reservation;

  const userHtmlContent = `
    <div style="background-color: #f2f2f2; padding: 40px; text-align: center; color: #333; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <img src="https://demo.a110.club/assets/logoPhoenix78.png" alt="logo" style="width: 70px; margin-bottom: 20px;">
        <h1 style="color: #0275d8; margin-bottom: 20px;">Confirmation de votre réservation</h1>
        <p style="margin-bottom: 10px; font-size: 16px; color: #555;">Bonjour ${prenom} ${nom},</p>
        <p style="margin-bottom: 20px; font-size: 16px; color: #555;">Votre réservation ALPINE A110 a été confirmée.</p>
        <ul style="list-style: none; padding: 0; text-align: left;">
          <li><strong>Date de début :</strong> ${new Date(
            date_debut
          ).toLocaleDateString()}</li>
          <li><strong>Heure de départ :</strong> ${heure_depart}</li>
          <li><strong>Date de fin :</strong> ${new Date(
            date_fin
          ).toLocaleDateString()}</li>
          <li><strong>Heure de retour :</strong> ${heure_retour}</li>
          <li><strong>Lieu :</strong> ${lieu}</li>
          <li><strong>Prix estimé :</strong> €${prix_estime}</li>

          <button> <a href="https://back.demo.a110.club">Renseigner</a></button>
        </ul>
      </div>
    </div>
  `;

  await sendEmail(
    email,
    "Confirmation de votre réservation",
    "Votre réservation ALPINE A110 a été confirmée.",
    userHtmlContent
  );
};

const sendRefusalEmail = async (email, commentaire, nom) => {
  const userHtmlContent = `
    <div style="background-color: #f2f2f2; padding: 40px; text-align: center; color: #333; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <img src="https://demo.a110.club/assets/logoPhoenix78.png" alt="logo" style="width: 70px; margin-bottom: 20px;">
        <h1 style="color: #dc3545; margin-bottom: 20px;">Votre réservation a été refusée</h1>
        <p style="margin-bottom: 10px; font-size: 16px; color: #555;">Bonjour ${nom},</p>
        <p style="margin-bottom: 20px; font-size: 16px; color: #555;">Malheureusement, votre réservation ALPINE A110 a été refusée.</p>
        <p style="margin-bottom: 20px; font-size: 16px; color: #555;"><strong>Raison :</strong> ${commentaire}</p>
        <p style="margin-bottom: 20px; font-size: 16px; color: #555;">Pour plus d'informations, n'hésitez pas à nous contacter.</p>
      </div>
    </div>
  `;

  await sendEmail(
    email,
    "Votre réservation a été refusée",
    "Votre réservation ALPINE A110 a été refusée.",
    userHtmlContent
  );
};

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
  const { nom, prenom, email, telephone, date_debut, date_fin, prix_estime } =
    req.body;
  const updateQuery = `
    UPDATE Reservations 
    SET nom = ?, prenom = ?, email = ?, telephone = ?, date_debut = ?, date_fin = ?, prix_estime = ?
    WHERE id = ?;
  `;
  db.query(
    updateQuery,
    [nom, prenom, email, telephone, date_debut, date_fin, prix_estime, id],
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

// Route pour envoyer un email
app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    await sendEmail(to, subject, text, html);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
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

// Endpoint pour ajouter des users par rapport a un events (inscription)
app.post("/register", (req, res) => {
  const { event_id, name, surname, email, phone, has_vehicle } = req.body;

  const sql =
    "INSERT INTO EventRegistrations (event_id, name, surname, email, phone, has_vehicle) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [event_id, name, surname, email, phone, has_vehicle],
    (err, result) => {
      if (err) {
        console.error("Error inserting into database:", err); // Log the error for debugging
        return res.status(500).send({ error: "Registration failed" });
      }
      res.send({
        message: "Registration successful",
        registrationId: result.insertId,
      });
    }
  );
});

// Endpoint pour récupérer les inscriptions à un événement
app.get("/events/:id/registrations", authenticateToken, (req, res) => {
  const eventId = req.params.id;
  const sql = "SELECT * FROM EventRegistrations WHERE event_id = ?";
  db.query(sql, [eventId], (err, results) => {
    if (err) {
      return res.status(500).send({ error: "Failed to fetch registrations" });
    }
    res.send(results);
  });
});

// Endpoint pour ajouter un événement
app.post("/evenements", authenticateToken, async (req, res) => {
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

// modifier un evenement

app.put("/evenements/:id", authenticateToken, (req, res) => {
  const eventId = req.params.id;
  const { title, event_date, description, location } = req.body;
  const sql =
    "UPDATE events SET title = ?, event_date = ?, description = ?, location = ? WHERE id = ?";
  db.query(
    sql,
    [title, event_date, description, location, eventId],
    (err, result) => {
      if (err) {
        return res.status(500).send({ error: "Failed to update event" });
      }
      res.send({ message: "Event updated successfully" });
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
  let reductionAvecUnJourDePlus =
    reductions[Math.min(totalDays, reductions.length - 1)];
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

  const messageUnJourDePlus = `Réservez un jour de plus pour un total de ${prixTotalAvecUnJourDePlus.toFixed(
    2
  )} € soit une remise de ${((1 - reductionAvecUnJourDePlus) * 100).toFixed(
    0
  )}%`;

  return {
    prixTotalSansReduction,
    prixTotalAvecReduction,
    kilometrageTotal,
    montantRemise,
    messageUnJourDePlus,
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
      messageUnJourDePlus,
    } = calculerPrix(startDate, startTime, endDate, endTime);
    res.json({
      prixTotalSansReduction,
      prixTotalAvecReduction,
      kilometrageTotal,
      montantRemise,
      messageUnJourDePlus,
    });
  } catch (error) {
    console.error("Erreur lors du calcul du prix :", error);
    res.status(500).send("Erreur lors du calcul du prix");
  }
});

app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
