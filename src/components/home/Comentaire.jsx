import React from "react";
import { Card, Carousel } from "react-bootstrap";

// Carte de commentaire individuelle
const CommentaireCard = ({ image, nom, lieu, note, commentaire }) => (
  <Card className="shadow-sm" style={{ width: "18rem", borderRadius: "15px" }}>
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <div
            className="profile-placeholder"
            style={{
              backgroundColor: "#ccc",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <i class="bi bi-person-fill"></i>
          </div>
          <div className="ms-3">
            <h5 className="mb-0">{nom}</h5>
            <p className="mb-0 text-muted">{lieu}</p>
          </div>
        </div>
        <div className="note" style={{ fontSize: "1.5rem" }}>
          {note}
        </div>
      </div>
      <Card.Text>{commentaire}</Card.Text>
    </Card.Body>
  </Card>
);

// Composant de carousel qui affiche les cartes de commentaires
const CommentairesCarousel = ({ commentaires }) => {
  // Groupez les commentaires par 3 pour le carousel
  const groupeCommentaires = commentaires.reduce(
    (result, value, index, array) => {
      if (index % 3 === 0) result.push(array.slice(index, index + 3));
      return result;
    },
    []
  );

  return (
    <Carousel indicators={false}>
      {groupeCommentaires.map((groupe, idx) => (
        <Carousel.Item key={idx}>
          <div className="d-flex justify-content-around">
            {groupe.map((commentaire) => (
              <CommentaireCard key={commentaire.id} {...commentaire} />
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

// Composant principal
const CommentairesClients = () => {
  const commentaires = [
    {
      id: 1,
      nom: "yoann strubel",
      note: 5,
      commentaire:
        "Je recommande fortement Franck qui est une personne très à l’écoute, patient et sympathique. Sa voiture est très bien entretenue, voir neuve .Quel plaisir d’avoir pu célébrer mon mariage avec votre voiture merci encore !Yoann",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      nom: "Dohy Hong",
      lieu: "",
      note: 5,
      commentaire:
        "Belle voiture à essayer. Propriétaire très aimable et attentionné. Je recommande sans réserve.",
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjUoRG5kEKwXlpAcTHRgRSyNlKTWycpgulfk15PVarphgHE7vumfJw=w60-h60-p-rp-mo-ba5-br100",
    },
    {
      id: 3,
      nom: "Gery Belletti",

      note: 5.0,
      commentaire:
        "Superbe expérience au volant de cette magnifique alpine, effet garanti.Très bon accueil de la part de Franck, je recommande grandement !",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      nom: "Templ Li",
      lieu: "",
      note: 5,
      commentaire:
        "Franck est très sympathique et arrangeant.La voiture est très belle, très bien entretenue. Comme neuve.Nous avons passé un très bon moment avec mon compagnon. Je recommande",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      nom: "Robert REYMOND",
      lieu: "",
      note: 5,
      commentaire:
        "Expérience absolument parfaite. Franck est un propriétaire très sympathique qui nous a accueilli avec gentillesse et bienveillance.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      nom: "philippe MOYAT",
      lieu: "",
      note: 5,
      commentaire:
        "Un accueil personnalisé, des consignes claires, un véhicule magnifique et bichonné , j'ai passé 4 jours de vrai plaisir avec cette petite française qui n'a rien à envier à ces cousines allemandes!Merci beaucoup Franck et à bientôt!Philippe",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="container my-5 mt-5">
      <h1 className=" display-3 fw-bold text-center my-2 mb-5">
        Il nous font confiances ...
      </h1>

      <CommentairesCarousel commentaires={commentaires} />
    </div>
  );
};

export default CommentairesClients;
