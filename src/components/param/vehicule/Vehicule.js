import React from "react";
import { Link } from "react-router-dom";
const Vehicule = () => {
  return (
    <div>
      <div className="container">
        <h5 className="card-header">Paramètrage des Véhicules</h5>
        <div className="row my-3">
          <div className="col">
            <div className="card">
              <h5 className="card-header">Véhicules </h5>
              <div className="card-body">
                <Link
                  activeclassname="active"
                  to={"/paramvhl/vehicules"}
                  className="btn btn-primary"
                >
                  Gestion des Véhicules
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <h5 className="card-header">Affectations</h5>
              <div className="card-body">
                <Link
                  activeclassname="active"
                  to={"/paramvhl/affectations"}
                  className="btn btn-primary"
                >
                  Gestion Services Affectations
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <h5 className="card-header">Rajouts</h5>
              <div className="card-body">
                <Link to={"/trace/remorquages"} className="btn btn-primary">
                  Gestion des remorrquages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicule;
