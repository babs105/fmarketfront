import React, { useEffect } from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";

const Trace = () => {
  // let location = useLocation();
  useEffect(() => {
    console.log("TRACE");
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div class="card">
              <h5 class="card-header">PANNES / ACCIDENT </h5>
              <div class="card-body">
                <p class="card-text">Modules Pannes Accidents.</p>
                <Link
                  activeClassName="active"
                  to={"/trace/evenements"}
                  class="btn btn-primary"
                >
                  Gestion des Evènements
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card">
              <h5 class="card-header">ACCIDENTS</h5>
              <div class="card-body">
                <p class="card-text">Modules Accidents.</p>
                <Link to={"/trace/accidents"} class="btn btn-primary">
                  Gestion des Accidents
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card">
              <h5 class="card-header">REMORQUAGES</h5>
              <div class="card-body">
                <p class="card-text">Modules Remorquages..</p>
                <Link to={"/trace/remorquages"} class="btn btn-primary">
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

export default Trace;
