import React from "react";
import MyNavbar from "../navbar/navbar";
import Footer from "../footer/footer";

const LegalNotice = () => {
  return (
    <>
      <MyNavbar />
      <div
        style={{
          backgroundColor: "#0061A4",
        }}
      >
        <div className="container pt-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-header bg-primary text-white">
                  <h2 className="h5 mb-0">
                    <i className="bi bi-building pe-2"></i>Propriétaire du site
                  </h2>
                </div>
                <div className="card-body">
                  <p>
                    <strong>SAS PHOENIX78</strong>
                  </p>
                  <p>Ce site est l’entière propriété de la SAS PHOENIX78.</p>
                  <p>
                    Toute reproduction, même partielle, de ce site est
                    strictement interdite.
                  </p>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header bg-secondary text-white">
                  <h2 className="h5 mb-0">
                    <i className="bi bi-person-badge-fill pe-2"></i>Editeur
                  </h2>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Société PROGEDOC</strong>
                  </p>
                  <address>
                    12, Avenue des Prés
                    <br />
                    78180 Montigny-le-Bretonneux
                    <br />
                    Tél.: +33 (0)1 86 90 08 98
                  </address>
                  <p>
                    Responsable de la publication:{" "}
                    <strong>Franck DECKER</strong>
                  </p>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header bg-success text-white">
                  <h2 className="h5 mb-0">
                    <i className="bi bi-info-circle-fill pe-2"></i>Informations
                    Administratives
                  </h2>
                </div>
                <div className="card-body">
                  <p>Société par Actions Simplifiées (SAS)</p>
                  <p>– Capital de 1.000,00 euros</p>
                  <p>– SIRET 97749967200011</p>
                  <p>– APE 7711A</p>
                  <p>– RCS Versailles B 977 499 672</p>
                  <p>– Num TVA Intracommunautaire FR72977499672</p>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header bg-danger text-white">
                  <h2 className="h5 mb-0">
                    <i className="bi bi-server pe-2"></i>Hébergement
                  </h2>
                </div>
                <div className="card-body">
                  <p>SCALEWAY SAS</p>
                  <p>BP 438 75366 PARIS CEDEX 08 FRANCE</p>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header bg-warning text-dark">
                  <h2 className="h5 mb-0">
                    <i className="bi bi-heart-fill pe-2"></i>Remerciements
                  </h2>
                </div>
                <div className="card-body">
                  <p>Images fournies par ©Alpine.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LegalNotice;
