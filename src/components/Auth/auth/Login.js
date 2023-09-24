import React, { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  Navigate,
  Link,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import authService from "../../../services/auth/authService";
import { useSelector, useDispatch } from "react-redux";
function Login() {
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  let navigate = useNavigate();
  let location = useLocation();

  const userState = useSelector((state) => {
    console.log("state user", state.User);
    return state.User;
  });
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Donner un email valide")
      .required("Email est obligatoire")
      .min(6, "Email est doit avoir au minimum 6 caracteres")
      .max(40, "Email est doit avoir au maximum 40 caracteres"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);
    console.log(data);
    authService.login(data).then(
      (response) => {
        console.log("user", response);
        dispatch({
          type: "User/loginSuccess",
          payload: response,
        });
        // navigate("/home");
        setLoading(false);
        setSuccessful(true);
      },
      (error) => {
        const resMessage = error.response && error.response.data;
        console.log("Error", resMessage);
        setLoading(false);
        setSuccessful(false);
        setMessage("Verifiez Email ou Mot de Passe");
      }
    );
  };

  return (
    <div className=" d-flex  flex-column justify-content-center align-items-center   ">
      <form className="card p-4 col-sm-3 m-3" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-center mb-4 text-primary">Connexion </h3>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="text"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="form-group">
          <label>Mot de Passe</label>
          <input
            name="password"
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>

        {/* 
        <div className="form-group mt-4">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <button
            type="button"
            onClick={reset}
            className="btn btn-warning float-right"
          >
            Annuler
          </button>
        </div> */}
        <div className="form-group mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>
        </div>
        <div className="text-center  mt-4">
          <Link to={"/register"}> Ouvrir Compte</Link>
        </div>
        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
export default Login;
