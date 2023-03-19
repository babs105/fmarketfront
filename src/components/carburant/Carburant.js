import React from "react";
import { Link } from "react-router-dom";
const Carburant = () => {
  return (
    <div>
      <div className="container">
        <h5 className="card-header">Gestion du Carburant </h5>
        <div className="row my-3">
          <div className="col">
            <div className="card">
              <h5 className="card-header">Cuves </h5>
              <div className="card-body">
                <Link
                  activeclassname="active"
                  to={"/carburant/cuves"}
                  className="btn btn-primary"
                >
                  Gestion des Cuves
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <h5 className="card-header">Ravitaillements</h5>
              <div className="card-body">
                {/* <p className="card-text">Modules Ravitaillements.</p> */}
                <Link
                  to={"/carburant/ravitaillements"}
                  className="btn btn-primary"
                >
                  Gestion des Ravitaillements
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <h5 className="card-header">Rajouts</h5>
              <div className="card-body">
                {/* <p className="card-text">Modules Remorquages..</p> */}
                <Link to={"/carburant/rajouts"} className="btn btn-primary">
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

export default Carburant;
