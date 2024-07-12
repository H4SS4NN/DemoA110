import BookingForm from "./searchform";
import { useNavigate } from "react-router-dom";
import "../home/firstpart.css";
import imageacc from "../../assets/alpinevoyage.webp";

const FirstPart = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#0061A4",
      }}
    >
      <div className="row align-items-center ">
        <div className="col-lg-6 ">
          <div className=" p-5 text-left">
            {/* Navigation */}

            {/* Titre */}
            <h1 className="display-4 fw-bold my-2 ">
              LOUEZ VOTRE MOMENT DE PARTAGE, PLAISIR, PASSION !
            </h1>

            {/* Paragraphe */}
            <p className="lead my- text-light">
              Découvrez l'Alpine A110 GT Légende en location, et ressentez les
              valeurs de Partage, Plaisir et Passion. Avec son design élégant et
              sa puissance, l'Alpine A110 GT Légende vous offre une expérience
              de conduite exceptionnelle. Parcourez les routes de votre choix,
              au volant de cette icône sportive.
            </p>

            {/* Boutons */}
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-left">
              {/* <button
                type="button"
                style={{ backgroundColor: "white", color: "#0160A4" }}
                className="btn btn-light px-4 gap-3"
                onClick={() => navigate("/location")}
              >
                LOUER
              </button> */}
              <button
                type="button"
                className="btn btn-outline-light btn-lg"
                onClick={() => navigate("/History")}
              >
                Voir l'histoire
              </button>
            </div>
          </div>
        </div>

        {/* Colonne pour l'image */}
        <div className="col-lg-6 ">
          <img
            style={{
              width: "100%",
              height: "100%",
            }}
            src={imageacc}
            alt="Illustration Alpine A110"
          />
        </div>
      </div>
      <BookingForm />
    </div>
  );
};

export default FirstPart;
