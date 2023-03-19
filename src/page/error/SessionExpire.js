import React from "react";
import { Link } from "react-router-dom";

const SessionExpire = () => {
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
          <h1>401</h1>
          <h2> Votre session est expirée </h2>
          <Link className="btn btn-primary" to={"/login"}>
            Connectez-vous{" "}
          </Link>
          {/* <img src="assets/img/not-found.svg" class="img-fluid py-5" alt="Page Not Found"> */}
        </section>
      </div>
    </>
  );
};

export default SessionExpire;
