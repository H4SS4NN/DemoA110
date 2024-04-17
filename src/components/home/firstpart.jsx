import BookingForm from "./searchform";
import { useNavigate } from "react-router-dom";
import "../home/firstpart.css";

const FirstPart = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#0061A4",
      }}
    >
      <div className="row align-items-center ">
        <div className="col-lg-6 p-2">
          <div className=" p-5 text-left">
            {/* Navigation */}
            <nav>
              <ul className="nav justify-content-left mb-3">
                <li className="nav-item">
                  <a className="nav-link text-light" href="#">
                    Location
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light" href="#">
                    Alpine A110 GT Legend
                  </a>
                </li>
              </ul>
            </nav>

            {/* Titre */}
            <h1 className="display-4 fw-bold my-4 ">
              LOUEZ VOTRE MOMENT DE PARTAGE, PLAISIR, PASSION !
            </h1>

            {/* Paragraphe */}
            <p className="lead my-4 text-light">
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
                className="btn btn-outline-light btn-lg px-4"
                onClick={() => navigate("/History")}
              >
                Voir l'histoire
              </button>
            </div>
          </div>
        </div>

        {/* Colonne pour l'image */}
        <div className="col-lg-6 pt-5">
          <img
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: "50px",
              borderBottomLeftRadius: "50px",
            }}
            src="assets/alpinevoyage.webp"
            alt="Illustration Alpine A110"
          />
        </div>
      </div>
      <BookingForm />
    </div>
  );
};

export default FirstPart;
