import React from "react";
import { Link } from "react-router-dom";
const Rh = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <h5 className="card-header">Cuves </h5>
              <div className="card-body">
                <Link
                  activeclassName="active"
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
                <p className="card-text">Modules Ravitaillements.</p>
                <Link to={"/trace/accidents"} className="btn btn-primary">
                  Gestion des Ravitaillements
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <h5 className="card-header">Rajouts</h5>
              <div className="card-body">
                <p className="card-text">Modules Remorquages..</p>
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

export default Rh;
