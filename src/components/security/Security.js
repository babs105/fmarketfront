import React, { useEffect } from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";

const Security = () => {
  // let location = useLocation();Evènements
  useEffect(() => {
    console.log("TRACE");
  }, []);
  return (
    <div>
      <div className="container">
        <h5 className="card-header">Gestion des Utilisateurs </h5>
        <div className="row my-3">
          <div className="col">
            <div className="card">
              <h5 className="card-header">Utilisateurs </h5>
              <div className="card-body">
                {/* <p className="card-text">Suivi des Pannes/Accidents.</p> */}
                <Link
                  activeclassname="active"
                  to={"/security/users"}
                  className="btn btn-primary"
                >
                  Gestion des Utilisateurs
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <h5 className="card-header">Les Roles </h5>
              <div className="card-body">
                {/* <p className="card-text">Suivi Balayage du Tracé.</p> */}
                <Link
                  activeclassname="active"
                  to={"/security/roles"}
                  className="btn btn-primary"
                >
                  Gestion des Roles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
