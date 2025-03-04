import React from "react";
import { Button, Carousel } from "react-bootstrap";
import srccar1 from "../../assets/04 1.jpg";
import srccar2 from "../../assets/08 1.jpg";
import srccar3 from "../../assets/294 1.jpg";

const VoiturePresentation = () => {
  return (
    <div
      style={{
        backgroundColor: "#0061A4",
        padding: "20px !important",
        borderRadius: "10px",
        color: "white",
      }}
      className="container  my-5"
    >
      <div className="row align-items-center p-5">
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={srccar1}
                alt="Intérieur de voiture"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={srccar2}
                alt="Intérieur de voiture"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={srccar3}
                alt="Intérieur de voiture"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="col-md-6">
          <h2>ICÔNE DE STYLE</h2>
          <br />
          <p>
            L'A110 : une voiture légendaire qui allie design moderne et
            performances exceptionnelles. Découvrez l'A110, un chef-d'œuvre
            automobile qui rend hommage à la mythique berlinette tout en
            intégrant des éléments de design contemporains. <br />
            Son allure racée et ses lignes fluides en font une voiture
            sensationnelle dès le premier regard. Avec un aérodynamisme
            optimisé, l'A110 se distingue par son allure unique et ses
            performances époustouflantes. L'Alpine A110, héritière de
            l'emblématique berlinette, revisite avec audace ses traits
            intemporels. Grâce à un design soigneusement étudié, cette voiture
            sportive associe éléments classiques et touches modernes pour créer
            une esthétique captivante. L'A110 séduit immédiatement grâce à ses
            courbes sculptées et ses lignes musclées qui évoquent la puissance
            qui sommeille sous son capot. En intégrant des éléments de design
            contemporains, l'A110 se démarque par son allure résolument moderne.
            La calandre épurée, accompagnée de phares effilés à LED, confère à
            l'A110 une expression percutante.
            <br />
            De plus, ses prises d'air latérales stratégiquement positionnées
            optimisent le refroidissement du moteur tout en améliorant son
            aérodynamisme, augmentant ainsi ses performances et son efficacité.
            {/* Le reste du texte */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiturePresentation;
