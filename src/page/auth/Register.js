import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import authService from "../../services/authService";

function Register() {
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Prenom Obligatoire"),
    lastname: Yup.string().required("Nom Obligatoire"),
    username: Yup.string()
      .email("Entrer un email valide")
      .required("Email Obligatoire")
      .min(6, "Email must be at least 6 characters")
      .max(40, "Email doit avoir au max 40 caracteres"),
    password: Yup.string()
      .required("Password Obligatoire")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password Obligatoire")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
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
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className=" d-flex  flex-column justify-content-center align-items-center ">
      <form className="card p-4 col-sm-3 m-3" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="text-center mb-4">Nouveau Compte </h4>
        <div className="form-group">
          <label>Prenom</label>
          <input
            name="firstname"
            type="text"
            {...register("firstname")}
            className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.firstname?.message}</div>
        </div>
        <div className="form-group">
          <label>Nom</label>
          <input
            name="lastname"
            type="text"
            {...register("lastname")}
            className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.lastname?.message}</div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="username"
            type="text"
            {...register("username")}
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.username?.message}</div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>

        <div className="form-group">
          <label>Confirmer Password</label>
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
            className="btn btn-primary b"
            disabled={loading}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>

          <button
            type="button"
            onClick={reset}
            className="btn btn-warning float-right"
          >
            Annuler
          </button>
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
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
export default Register;
