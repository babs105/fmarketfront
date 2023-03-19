import React from "react";
import { Link } from "react-router-dom";
const ParcAuto = () => {
  return (
    <div>
      <div className="container">
        <h5 className="card-header">Gestion du Parc Automobile </h5>
        <div className="row my-3">
          <div className="col">
            <div className="card">
              <h5 className="card-header">Panne </h5>
              <div className="card-body">
                <Link
                  activeclassname="active"
                  to={"/carburant/cuves"}
                  className="btn btn-primary"
                >
                  Gestion des Pannes
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <h5 className="card-header">Interventions</h5>
              <div className="card-body">
                {/* <p className="card-text">Modules Ravitaillements.</p> */}
                <Link to={"/trace/accidents"} className="btn btn-primary">
                  Gestion des Interventions
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <h5 className="card-header">Test Véhicules</h5>
              <div className="card-body">
                {/* <p className="card-text">Modules Remorquages..</p> */}
                <Link to={"/trace/remorquages"} className="btn btn-primary">
                  Gestion des Tests
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcAuto;
