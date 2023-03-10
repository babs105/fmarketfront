import React, { useEffect } from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";

const Trace = () => {
  // let location = useLocation();Evènements
  useEffect(() => {
    console.log("TRACE");
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row m-3">
          <div className="col">
            <div className="card">
              <h5 className="card-header">PANNES / ACCIDENT </h5>
              <div className="card-body">
                <p className="card-text">Suivi des Pannes/Accidents.</p>
                <Link
                  activeclassname="active"
                  to={"/trace/evenements"}
                  className="btn btn-primary"
                >
                  Gestion des Evènements
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
              <h5 className="card-header">Balayage </h5>
              <div className="card-body">
                <p className="card-text">Suivi Balayage du Tracé.</p>
                <Link
                  activeclassname="active"
                  to={"/trace/evenements"}
                  className="btn btn-primary"
                >
                  Gestion des Balayages
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <h5 className="card-header">Nettoyage</h5>
              <div className="card-body">
                <p className="card-text">Suivi Nettoyage.</p>
                <Link to={"/trace/accidents"} className="btn btn-primary">
                  Gestion du Nettoyages
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-sm-4">
            <div className="card">
              <h5 className="card-header">Intrusion</h5>
              <div className="card-body">
                <p className="card-text">Suivi Intrusion.</p>
                <Link to={"/trace/remorquages"} className="btn btn-primary">
                  Gestion des intrusions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="col-sm-12">
          <h5 className="card-header">Rechercher </h5>
          <div className="row m-3">
            <div className="col-sm-4">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">Les Accidents</p>
                  <Link
                    activeclassname="active"
                    to={"/trace/detailAccidents/search"}
                    className="btn btn-primary"
                  >
                    Rechercher Accidents
                  </Link>
                </div>
                {/* <div className="card-body">
                <p className="card-text">Suivi Balayage du Tracé.</p>
                <Link
                  activeclassname="active"
                  to={"/trace/evenements"}
                  className="btn btn-primary"
                >
                  Gestion des Balayages
                </Link>
              </div> */}
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">Les Remorquages</p>
                  <Link
                    activeclassname="active"
                    to={"/trace/remorquages/search"}
                    className="btn btn-primary"
                  >
                    Rechercher Remorquages
                  </Link>
                </div>
                {/* <div className="card-body">
                <p className="card-text">Suivi Balayage du Tracé.</p>
                <Link
                  activeclassname="active"
                  to={"/trace/evenements"}
                  className="btn btn-primary"
                >
                  Gestion des Balayages
                </Link>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trace;
