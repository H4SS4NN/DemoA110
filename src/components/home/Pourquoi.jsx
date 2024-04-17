import React from "react";

const PourquoiNousChoisir = () => {
  return (
    <div className="container my-4 mt-5 mb-5">
      <h1 className="display-3 fw-bold text-center my-4">
        Pourquoi nous choisir ?
      </h1>

      <div className="row justify-content-center align-items-center my-4">
        <div className="col-lg-6">
          <iframe
            className="w-100"
            style={{ height: "315px" }}
            src="https://www.youtube.com/embed/HywsBxhGlwg?si=Y0VV-1b-qhujpLQK&amp;controls=0&amp;start=19"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="col-lg-6">
          <div className="features p-2">
            <div className="feature d-flex align-items-center gap-3 p-4">
              <i className="bi bi-telephone fs-1"></i>
              <div>
                <h1 className="h4">Support personnalisé</h1>
                <p>
                  Chaque client est unique, et c'est pourquoi notre équipe est
                  dédiée à vous offrir une assistance personnalisée. Nous
                  écoutons attentivement vos besoins et vous guidons à chaque
                  étape pour garantir une expérience sans souci. Notre objectif
                  est de résoudre vos préoccupations avec efficacité et
                  empathie.
                </p>
              </div>
            </div>
            <div className="feature d-flex align-items-center gap-3 p-4">
              <i className="bi bi-tags fs-1"></i>
              <div>
                <h1 className="h4">Meilleurs prix</h1>
                <p>
                  Nous nous engageons à vous fournir des services de qualité au
                  meilleur prix du marché. Nous veillons à ce que vous
                  bénéficiez des offres les plus compétitives, en mettant en
                  avant la transparence des coûts et en évitant les frais
                  cachés. Avec nous, le prix que vous voyez est le prix
                </p>
              </div>
            </div>
            <div className="feature d-flex align-items-center gap-3 p-4">
              <i className="bi bi-shield-check fs-1"></i>
              <div>
                <h1 className="h4">Annulation sans frais</h1>
                <p>
                  Nous comprenons que vos plans peuvent changer. C'est pour cela
                  que nous offrons une politique d'annulation flexible, vous
                  permettant de modifier ou d'annuler vos réservations sans
                  frais supplémentaires. Profitez de la liberté de planifier en
                  toute confiance, sachant que vous pouvez vous adapter à toute
                  situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PourquoiNousChoisir;
