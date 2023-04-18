import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import balayageService from "../../../services/trace/balayage/balayageService";
import { formatDateYYYYMMdd } from "../../../utils/formatDate";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useTable } from "react-table";
import TableContainer from "../../TableContainer";

const AddBalayage = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialbalayageState = {
    id: "",
    date: "",
    typeBalayage: "",
    typeBalisage: "",
    datePose: "",
    dateDepose: "",
    pkdebutBalise: "",
    pkfinBalise: "",
    heureDebutBalayage: "",
    heureFinBalayage: "",
    pkdebutBalayage: "",
    pkfinBalayage: "",
    voie: "",
    secteur: "",
    autoroute: "",
    sens: "",
  };
  const [balayage, setbalayage] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const validationSchema = Yup.object().shape({
    date: Yup.date()
      .typeError("Date invalide")
      .required("date balayage est obligatoire"),
    typeBalayage: Yup.string().required("Type balayage est obligatoire"),
    typeBalisage: Yup.string().required("Type balisage est obligatoire"),
    datePose: Yup.date()
      .typeError("Date invalide")
      .required("date Pose balayage est obligatoire"),
    // dateDepose: Yup.date().notRequired(),
    pkdebutBalise: Yup.string()
      .required("Pk est obligatoire")
      .matches(
        /^(\d{2,3}\+{1}\d{3})?$/,
        "Le champs doit etre au format A1 000+000"
      ),
    pkfinBalise: Yup.string()
      .nullable()
      .matches(
        /^(\d{2,3}\+{1}\d{3})?$/,
        "Le champs doit etre au format 34+500"
      ),
    pkdebutBalayage: Yup.string()
      .required("Pk est obligatoire")
      .matches(
        /^(\d{2,3}\+{1}\d{3})?$/,
        "Le champs doit etre au format A1 000+000"
      ),
    pkfinBalayage: Yup.string()
      .nullable()
      .matches(
        /^(\d{2,3}\+{1}\d{3})?$/,
        "Le champs doit etre au format 34+500"
      ),
    sens: Yup.string().required("Sens est obligatoire"),
    voie: Yup.string().required("Voie est obligatoire"),
    secteur: Yup.string().required("Secteur est obligatoire"),
    autoroute: Yup.string().required("Autoroute est obligatoire"),
    heureDebutBalayage: Yup.string().required("Heure est obligatoire"),
    heureFinBalayage: Yup.string().notRequired("Heure Fin est obligatoire"),

    // heureAppelPAT: Yup.string().when("emisPar", {
    //   is: (value) => value !== "PAT",
    //   then: Yup.string().required("H. appel PAT est obligatoire"),
    //   otherwise: Yup.string().notRequired(),
    // }),
    // heureAppelOPC: Yup.string().when("emisPar", {
    //   is: (value) => value !== "OPC",
    //   then: Yup.string().required("H. appel OPC est obligatoire"),
    //   otherwise: Yup.string().notRequired(),
    // }),
    // nomPAT: Yup.string().required("Nom Pat est obligatoire"),
    // heureArriveePAT: Yup.string().notRequired(),
    // dateheurePoseBalise: Yup.string().notRequired(),
    // dateheureDeposeBalise: Yup.string().notRequired(),
    // typeBalisage: Yup.string().notRequired(),
    // pkDebutBalisage: Yup.string()
    //   .nullable()
    //   .matches(
    //     /^(\d{2,3}\+{1}\d{3})?$/,
    //     "Le champs doit etre au format 34+500"
    //   ),
    // pkFinBalisage: Yup.string()
    //   .nullable()
    //   .matches(
    //     /^(\d{2,3}\+{1}\d{3})?$/,
    //     "Le champs doit etre au format 34+500"
    //   ),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    // console.log("detail event");
    // if (id) getbalayage(id);
  }, []);

  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);
    console.log("DATA", data);
    balayageService.create(data).then(
      (response) => {
        console.log("data new", response.data);
        setMessage("Ajout balayage succes");
        setSuccessful(true);
        setLoading(false);
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
        setLoading(false);
      }
    );
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/trace"}>Le Tracé</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={"/trace/balayages"}>Balayages</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Ajout Balayage : {balayage.localisation}
          </li>
        </ol>
      </nav>
      <div className="mt-4">
        {/* <div className="d-flex justify-content-between"> */}
        <h4 className="text-primary">Ajout Balayage</h4>
        {/* </div> */}
        <hr className="mb-4" />
        <div className="edit-form mt-4 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row mb-4">
              <div className="form-group col ">
                <label htmlFor="date">Date </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  // value={currentbalayage.dateEvent}
                  // onChange={handleInputChange}
                  {...register("date")}
                  className={`form-control ${errors.date ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.date?.message}</div>
              </div>

              <div className="form-group col">
                <label htmlFor="typeBalayage">Type de Balayage</label>
                <select
                  id="typeBalayage"
                  name="typeBalayage"
                  {...register("typeBalayage")}
                  className={`form-control ${
                    errors.typeBalayage ? "is-invalid" : ""
                  }`}
                  // value={currentbalayage.natureEvent}
                  // onChange={handleInputChange}
                >
                  <option value="">-Choisir Type balayage-</option>
                  <option value="Manuel">Manuel</option>
                  <option value="Mecanique">Mecanique</option>
                </select>
                <div className="invalid-feedback">
                  {errors.typeBalayage?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="typeBalisage">Type Balisage</label>
                <select
                  id="typeBalisage"
                  name="typeBalisage"
                  {...register("typeBalisage")}
                  className={`form-control ${
                    errors.typeBalisage ? "is-invalid" : ""
                  }`}
                >
                  <option value="">-Choisir Type Balisage-</option>
                  <option value="FIXE">FIXE</option>
                  <option value="URGENCE">URGENCE</option>
                  <option value="MOBILE">MOBILE</option>
                  <option value="RGENCE+FL">URGENCE+FL</option>
                  <option value="FIXE+FL">FIXE+FL</option>
                  <option value="AUTRE">AUTRE</option>
                </select>
                <div className="invalid-feedback">
                  {errors.typeBalisage?.message}
                </div>
              </div>
            </div>
            <div className="form-row mb-4">
              <div className="form-group col">
                <label htmlFor="autoroute">Autoroute </label>
                <select
                  id="autoroute"
                  name="autoroute"
                  {...register("autoroute")}
                  className={`form-control ${
                    errors.autoroute ? "is-invalid" : ""
                  }`}
                >
                  <option value="">-Choisir l'Autoroute-</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                </select>
                <div className="invalid-feedback">
                  {errors.autoroute?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="secteur">Secteur </label>
                <select
                  id="secteur"
                  name="secteur"
                  {...register("secteur")}
                  className={`form-control ${
                    errors.secteur ? "is-invalid" : ""
                  }`}
                >
                  <option value="">-Choisir le Secteur-</option>
                  <option value="TT">TT</option>
                  <option value="AMT">AMT</option>
                </select>
                <div className="invalid-feedback">
                  {errors.secteur?.message}
                </div>
              </div>

              <div className="form-group col">
                <label htmlFor="sens">Sens </label>
                <select
                  id="sens"
                  name="sens"
                  {...register("sens")}
                  className={`form-control ${errors.sens ? "is-invalid" : ""}`}
                  // value={currentbalayage.natureEvent}
                  // onChange={handleInputChange}
                >
                  <option value="">-Choisir le sens- </option>
                  <option value="SENS 1">SENS 1</option>
                  <option value="SENS 2">SENS 2</option>
                </select>
                <div className="invalid-feedback">{errors.sens?.message}</div>
              </div>
              <div className="form-group col">
                <label htmlFor="voie">Voies </label>
                <select
                  id="voie"
                  name="voie"
                  {...register("voie")}
                  className={`form-control ${errors.voie ? "is-invalid" : ""}`}
                >
                  <option value="">-Choisir la Voie-</option>
                  <option value="BAU">BAU</option>
                  <option value="VL">VL</option>
                  <option value="VR">VR</option>
                  <option value="VL/VR">VL/VR</option>
                  <option value="BAU/VL">BAU/VL</option>
                </select>
                <div className="invalid-feedback">{errors.voie?.message}</div>
              </div>
            </div>

            <div className="form-row mb-4 ">
              <div className="form-group col">
                <label htmlFor="heureDebutBalayage">H.Debut balayage</label>
                <input
                  type="time"
                  id="heureDebutBalayage"
                  name="heureDebutBalayage"
                  {...register("heureDebutBalayage")}
                  className={`form-control ${
                    errors.heureDebutBalayage ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.heureDebutBalayage?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="heureFinBalayage">H.Fin balayage</label>
                <input
                  type="time"
                  id="heureFinBalayage"
                  name="heureFinBalayage"
                  {...register("heureFinBalayage")}
                  className={`form-control ${
                    errors.heureFinBalayage ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.heureFinBalayage?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="pkdebutBalayage">PK Debut Balayage</label>
                <input
                  type="text"
                  id="pkdebutBalayage"
                  name="pkdebutBalayage"
                  {...register("pkdebutBalayage")}
                  className={`form-control ${
                    errors.pkdebutBalayage ? "is-invalid" : ""
                  }`}
                  // value={currentbalayage.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.pkdebutBalayage?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="pkfinBalayage">PK Fin Balayage</label>
                <input
                  type="text"
                  id="pkfinBalayage"
                  name="pkfinBalayage"
                  {...register("pkfinBalayage")}
                  className={`form-control ${
                    errors.pkfinBalayage ? "is-invalid" : ""
                  }`}
                  // value={currentbalayage.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.pkfinBalayage?.message}
                </div>
              </div>
            </div>
            <div className="form-row mb-4 ">
              <div className="form-group col">
                <label htmlFor="datePose">Date/heure Pose Balisage</label>
                <input
                  type="datetime-local"
                  id="datePose"
                  name="datePose"
                  {...register("datePose")}
                  className={`form-control ${
                    errors.datePose ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.datePose?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="dateDepose">Date/heure Dépose Balisage</label>
                <input
                  type="datetime-local"
                  id="dateDepose"
                  name="dateDepose"
                  {...register("dateDepose")}
                  className={`form-control ${
                    errors.dateDepose ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.dateDepose?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="pkdebutBalise">PK Debut Balisage</label>
                <input
                  type="text"
                  id="pkdebutBalise"
                  name="pkdebutBalise"
                  {...register("pkdebutBalise")}
                  className={`form-control ${
                    errors.pkdebutBalise ? "is-invalid" : ""
                  }`}
                  // value={currentbalayage.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.pkdebutBalise?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="pkfinBalise">PK Fin Balisage</label>
                <input
                  type="text"
                  id="pkfinBalise"
                  name="pkfinBalise"
                  {...register("pkfinBalise")}
                  className={`form-control ${
                    errors.pkfinBalise ? "is-invalid" : ""
                  }`}
                  // value={currentbalayage.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.pkfinBalise?.message}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center  m-4">
              <button
                type="submit"
                className="btn btn-primary mr-3"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Valider</span>
              </button>

              <button
                type="reset"
                onClick={reset}
                className="btn btn-warning float-right"
              >
                Annuler
              </button>
            </div>
          </form>

          <hr />
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
        </div>
    
      </div>
    </>
  );
};
export default AddBalayage;
