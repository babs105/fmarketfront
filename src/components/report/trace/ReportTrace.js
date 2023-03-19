import React, { useEffect } from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";

const ReportTrace = () => {
  // let location = useLocation();Evènements
  useEffect(() => {
    console.log("TRACE");
  }, []);
  return (
    <div>
      <div className="container">
        <h5 className="card-header text-primary">
          Génération de rapports du Tracé{" "}
        </h5>
        <div className="row my-2">
          <div className="col">
            <div className="card">
              <h5 className="card-header">Evènement </h5>
              <div className="card-body">
                <Link
                  activeclassname="active"
                  to={"/report/trace/evenements"}
                  className="btn btn-primary"
                >
                  Rapport Evènement
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="col">
            <div className="card">
              <h5 className="card-header">ACCIDENTS</h5>
              <div className="card-body">
                <p className="card-text">Modules Accidents.</p>
                <Link to={"/trace/accidents"} className="btn btn-primary">
                  Gestion des Accidents
                </Link>
              </div>
            </div>
          </div> */}
          {/* <div className="col">
            <div className="card">
              <h5 className="card-header">REMORQUAGES</h5>
              <div className="card-body">
                <p className="card-text">Modules Remorquages..</p>
                <Link to={"/trace/remorquages"} className="btn btn-primary">
                  Gestion des remorrquages
                </Link>
              </div>
            </div>
          </div> */}
          <div className="col">
            <div className="card">
              <h5 className="card-header">Accident </h5>
              <div className="card-body">
                <Link
                  activeclassname="active"
                  to={"/trace/evenements"}
                  className="btn btn-primary"
                >
                  Rapport Accident
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <h5 className="card-header">Remorquage</h5>
              <div className="card-body">
                <Link to={"/trace/accidents"} className="btn btn-primary">
                  Rapport Remorquage
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-sm-4">
            <div className="card">
              <h5 className="card-header">Balayage</h5>
              <div className="card-body">
                <Link to={"/trace/remorquages"} className="btn btn-primary">
                  Rapport Balayage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTrace;
