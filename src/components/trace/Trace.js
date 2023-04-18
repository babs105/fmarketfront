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
        <h5 className="card-header text-primary">Gestion du Tracé </h5>
        <div className="row my-2">
          <div className="col">
            <div className="card">
              <h5 className="card-header">Pannes & Accidents </h5>
              <div className="card-body">
                {/* <p className="card-text">Suivi des Pannes/Accidents.</p> */}
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
                {/* <p className="card-text">Suivi Balayage du Tracé.</p> */}
                <Link
                  activeclassname="active"
                  to={"/trace/balayages"}
                  className="btn btn-primary"
                >
                  Gestion du Balayage
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <h5 className="card-header">Nettoyage</h5>
              <div className="card-body">
                {/* <p className="card-text">Suivi Nettoyage.</p> */}
                <Link to={"/trace/nettoyages"} className="btn btn-primary">
                  Gestion du Nettoyage
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-sm-4">
            <div className="card">
              <h5 className="card-header">Intrusion</h5>
              <div className="card-body">
                {/* <p className="card-text">Suivi Intrusion.</p> */}
                <Link to={"/trace/intrusions"} className="btn btn-primary">
                  Gestion des intrusions
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <h5 className="card-header">Désherbage</h5>
              <div className="card-body">
                {/* <p className="card-text">Suivi Intrusion.</p> */}
                <Link to={"/trace/desherbages"} className="btn btn-primary">
                  Gestion du Désherbage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <h5 className="card-header text-primary">Rechercher </h5>

        {/* <h5 className="card-header">Rechercher </h5> */}
        <div className="row my-2">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <Link
                  activeclassname="active"
                  to={"/trace/detailAccidents/search"}
                  className="btn btn-primary"
                >
                  Les Accidents
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                {/* <p className="card-text">Les Remorquages</p> */}
                <Link
                  activeclassname="active"
                  to={"/trace/remorquages/search"}
                  className="btn btn-primary"
                >
                  Les Remorquages
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                {/* <p className="card-text">Les Remorquages</p> */}
                <Link
                  activeclassname="active"
                  to={"/trace/evenements/search"}
                  className="btn btn-primary"
                >
                  Rechercher Evenements
                </Link>
              </div>
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
    // </div>
  );
};

export default Trace;
