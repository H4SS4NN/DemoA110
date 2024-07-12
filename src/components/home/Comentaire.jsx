import React from "react";
import { Card, Row, Col, Carousel, Rate, Avatar } from "antd"; // Importez les composants nécessaires d'Ant Design

// Carte de commentaire individuelle
const CommentaireCard = ({ image, nom, lieu, note, commentaire }) => (
  <Card className="shadow-sm mb-4" style={{ borderRadius: "15px" }}>
    <Card.Meta
      avatar={
        image ? (
          <Avatar src={image} size={50} />
        ) : (
          <Avatar icon={<i className="bi bi-person-fill"></i>} size={50} />
        )
      }
      title={nom}
      description={lieu}
    />
    <div className="d-flex justify-content-between align-items-center mb-3">
      <Rate disabled defaultValue={note} />
    </div>
    <div>{commentaire}</div>
  </Card>
);

// Composant de carousel qui affiche les cartes de commentaires
const CommentairesCarousel = ({ commentaires }) => {
  // Groupez les commentaires par 3 pour le carousel sur desktop
  const groupeCommentaires = commentaires.reduce(
    (result, value, index, array) => {
      if (index % 3 === 0) result.push(array.slice(index, index + 3));
      return result;
    },
    []
  );

  return (
    <Carousel autoplay>
      {groupeCommentaires.map((groupe, idx) => (
        <div key={idx}>
          <Row gutter={16} className="justify-content-center">
            {groupe.map((commentaire) => (
              <Col key={commentaire.id} xs={24} md={12} lg={8}>
                <CommentaireCard {...commentaire} />
              </Col>
            ))}
          </Row>
        </div>
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
      image: "",
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
      image: "",
    },
    {
      id: 4,
      nom: "Templ Li",
      lieu: "",
      note: 5,
      commentaire:
        "Franck est très sympathique et arrangeant.La voiture est très belle, très bien entretenue. Comme neuve.Nous avons passé un très bon moment avec mon compagnon. Je recommande",
      image: "",
    },
    {
      id: 5,
      nom: "Robert REYMOND",
      lieu: "",
      note: 5,
      commentaire:
        "Expérience absolument parfaite. Franck est un propriétaire très sympathique qui nous a accueilli avec gentillesse et bienveillance.",
      image: "",
    },
    {
      id: 6,
      nom: "philippe MOYAT",
      lieu: "",
      note: 5,
      commentaire:
        "Un accueil personnalisé, des consignes claires, un véhicule magnifique et bichonné , j'ai passé 4 jours de vrai plaisir avec cette petite française qui n'a rien à envier à ces cousines allemandes!Merci beaucoup Franck et à bientôt!Philippe",
      image: "",
    },
  ];

  return (
    <div className="container my-5">
      <CommentairesCarousel commentaires={commentaires} />
    </div>
  );
};

export default CommentairesClients;
