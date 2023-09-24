import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import authService from "../../../services/auth/authService";
import { Link } from "react-router-dom";

function Register() {
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object().shape({
    prenom: Yup.string().required("Prenom Obligatoire"),
    nom: Yup.string().required("Nom Obligatoire"),
    email: Yup.string()
      .email("Entrer un email valide")
      .required("Email Obligatoire")
      .min(6, "Email doit contenir au moins 6 caracteres")
      .max(40, "Email doit avoir au max 40 caracteres"),
    password: Yup.string()
      .required("Mot de Passe Obligatoire")
      .min(6, "Mot de Passe must be at least 6 characters")
      .max(40, "Mot de Passe must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password Obligatoire")
      .oneOf([Yup.ref("password"), null], "Confirmer Password does not mat"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms Obligatoire"),
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
    authService.register(data).then(
      (response) => {
        setMessage(response.data.message);
        setLoading(false);
        setSuccessful(true);
      },
      (error) => {
        console.log("Error", error.response);
        const resMessage = error.response && error.response.data;
        setLoading(false);
        setMessage(resMessage);
        setSuccessful(false);
        // (error.response &&
        //   error.response.data &&
        //   error.response.data.message) ||
        // error.message ||
        // error.toString();
      }
    );
  };

  return (
    <div className=" d-flex  flex-column justify-content-center align-items-center ">
      <form className="card p-4 col-sm-3 m-3" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="text-center mb-3 text-primary ">Nouveau Compte </h4>
        <div className="form-group">
          <label>Prénom</label>
          <input
            name="prenom"
            type="text"
            {...register("prenom")}
            className={`form-control ${errors.prenom ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.prenom?.message}</div>
        </div>
        <div className="form-group">
          <label>Nom</label>
          <input
            name="nom"
            type="text"
            {...register("nom")}
            className={`form-control ${errors.nom ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.nom?.message}</div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
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

        <div className="form-group">
          <label>Confirmer Mot de Passe</label>
          <input
            name="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.confirmPassword?.message}
          </div>
        </div>

        {/* <div className="form-group form-check">
          <input
            name="acceptTerms"
            type="checkbox"
            {...register('acceptTerms')}
            className={`form-check-input ${
              errors.acceptTerms ? 'is-invalid' : ''
            }`}
          />
          <label htmlFor="acceptTerms" className="form-check-label">
            I have read and agree to the Terms
          </label>
          <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
        </div> */}

        <div className="form-group mt-4">
          <button
            type="submit"
            className="btn btn-block btn-primary  "
            disabled={loading}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Créer Compter </span>
          </button>

          {/* <button
            type="button"
            onClick={reset}
            className="btn btn-warning float-right"
          >
            Annuler
          </button> */}
        </div>
        <div className="text-center ">
          <Link to={"/auth/login"}> Se Connecter</Link>
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
export default Register;
