import React from "react";
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const AccessDined = ({ user, pth }) => {
  // let navigate = useNavigate();
  // useEffect(() => {
  //   if (user) {
  //     console.log("pathname" + pth);
  //     navigate(pth);
  //   }
  // }, []);
  // if (user) {
  //   return <Navigate to={"/home"} replace />;
  // }
  return (
    <>
      <div className="container">
        <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1>403</h1>
          <h2>Vous n'avez pas accès à ce module </h2>
          <Link className="btn btn-primary" to={"/home"}>
            Retour à la page d'accueil{" "}
          </Link>
          {/* <img src="assets/img/not-found.svg" class="img-fluid py-5" alt="Page Not Found"> */}
        </section>
      </div>
    </>
  );
};

export default AccessDined;
