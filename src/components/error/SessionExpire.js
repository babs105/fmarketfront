import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth/authService";
import { useDispatch } from "react-redux";

const SessionExpire = () => {
  // let navigate = useNavigate();
  const dispacth = useDispatch();
  useEffect(() => {
    authService.logout();
    dispacth({
      type: "User/logoutSuccess",
      payload: null,
    });
  }, []);
  // if (user) {
  //   return <Navigate to={"/home"} replace />;
  // }
  return (
    <>
      <div className="container">
        <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1>401</h1>
          <h2> Votre session est expirée </h2>
          <Link className="btn btn-primary" to={"/auth/login"}>
            Connectez-vous{" "}
          </Link>
          {/* <img src="assets/img/not-found.svg" class="img-fluid py-5" alt="Page Not Found"> */}
        </section>
      </div>
    </>
  );
};

export default SessionExpire;
