import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import intrusionService from "../../../services/trace/intrusion/intrusionService";
import { formatDateYYYYMMdd } from "../../../utils/formatDate";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const EditIntrusion = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialintrusionState = {
    id: "",
    date: "",
    emisPar: "",
    typeIntrusion: "",
    heureAnnonce: "",
    heureDepart: "",
    heureArrivee: "",
    heureFin: "",
    pk: "",
    autoroute: "",
    voie: "",
    secteur: "",
    autoroute: "",
    sens: "",
    action: "",
    nbre: "",
  };

  const [intrusion, setIntrusion] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const validationSchema = Yup.object().shape({
    date: Yup.date()
      .typeError("Date invalide")
      .required("date intrusion est obligatoire"),
    typeIntrusion: Yup.string().required("Type intrusion est obligatoire"),
    emisPar: Yup.string().required("Emetteur est obligatoire"),
    heureAnnonce: Yup.string().required("Emis Par est obligatoire"),
    heureDepart: Yup.string().nullable().notRequired(),
    heureArrivee: Yup.string().nullable().notRequired(),
    heureFin: Yup.string().nullable().notRequired(),
    autoroute: Yup.string().required("Autoroute  est obligatoire"),
    sens: Yup.string().required("Sens est obligatoire"),
    voie: Yup.string().required("Le nombre est obligatoire"),
    secteur: Yup.string().required("Secteur est obligatoire"),
    action: Yup.string().nullable().notRequired(),
    nbre: Yup.string().nullable().notRequired(),
    pk: Yup.string()
      .required("Le pK est obligatoire")
      .matches(
        /^(\d{2,3}\+{1}\d{3})?$/,
        "Le champs doit etre au format 000+000"
      ),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const getintrusion = (id) => {
    console.log("ID", id);
    intrusionService
      .get(id)
      .then((response) => {
        let dateIntru = formatDateYYYYMMdd(new Date(response.data.date));
        setIntrusion({ ...response.data, dateIntru });

        console.log(response.data);
        Object.keys(initialintrusionState).forEach((field) => {
          setValue(field, response.data[field]);
        });
        setValue("date", dateIntru);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log("detail  net");
    if (id) getintrusion(id);
  }, [id]);

  const rechargerIntrusion = () => {
    getintrusion(id);
  };
  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);
    console.log("DATA", data);
    intrusionService.update(id, data).then(
      (response) => {
        console.log("data new", response.data);
        setMessage("Editer intrusion succes");
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
            <Link to={"/trace/intrusions"}>intrusions</Link>
          </li>
          {/* <li className="breadcrumb-item">
            <Link to={`/trace/evenements/${intrusion.eventid}`}>
              {intrusion.localisation}
            </Link>
          </li> */}

          <li className="breadcrumb-item active ">Editer intrusion</li>
        </ol>
      </nav>
      <div className="mt-2">
        <div className="d-flex justify-content-between">
          <h4 className="text-primary">Editer intrusion</h4>
        </div>
        <hr className="mb-3" />
        <div className="edit-form mt-4 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row mb-4">
              <div className="form-group col ">
                <label htmlFor="date">Date </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  // value={currentintrusion.dateEvent}
                  // onChange={handleInputChange}
                  {...register("date")}
                  className={`form-control ${errors.date ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.date?.message}</div>
              </div>
              <div className="form-group col">
                <label htmlFor="typeIntrusion">Type de Intrusion</label>
                <select
                  id="typeIntrusion"
                  name="typeIntrusion"
                  {...register("typeIntrusion")}
                  className={`form-control ${
                    errors.typeIntrusion ? "is-invalid" : ""
                  }`}
                  // value={currentintrusion.natureEvent}
                  // onChange={handleInputChange}
                >
                  <option value="">-Choisir Type Intrusion-</option>
                  <option value="HUMAIN">HUMAIN</option>
                  <option value="ANES">ANES</option>
                  <option value="VACHES">VACHES</option>
                  <option value="CHEVRE">CHEVRE</option>
                  <option value="CHEVAUX">CHEVAUX</option>
                  <option value="MOUTONS">MOUTONS</option>
                  <option value="CADAVRE ANIMAL">CADAVRE ANIMAL</option>
                  <option value="OBJET GENANT">OBJET GENANT</option>
                  <option value="'AUTRE">AUTRE</option>
                </select>
                <div className="invalid-feedback">
                  {errors.typeIntrusion?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="emisPar">Emis Par</label>
                <select
                  id="emisPar"
                  name="emisPar"
                  {...register("emisPar")}
                  className={`form-control ${
                    errors.emisPar ? "is-invalid" : ""
                  }`}
                >
                  <option value="">-Choisir Emetteur</option>
                  <option value="PAT">PAT</option>
                  <option value="OPC">OPC</option>
                  <option value="AGENT MSA">AGENT MSA</option>
                  <option value="USAGER">USAGER</option>
                </select>
                <div className="invalid-feedback">
                  {errors.emisPar?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="heureAnnonce">Heure Annonce</label>
                <input
                  type="time"
                  id="heureAnnonce"
                  name="heureAnnonce"
                  {...register("heureAnnonce")}
                  className={`form-control ${
                    errors.heureAnnonce ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.heureAnnonce?.message}
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
                <label htmlFor="pk">Pk </label>
                <input
                  type="text"
                  id="pk"
                  name="pk"
                  {...register("pk")}
                  className={`form-control ${errors.pk ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.pk?.message}</div>
              </div>
              <div className="form-group col">
                <label htmlFor="sens">Sens </label>
                <select
                  id="sens"
                  name="sens"
                  {...register("sens")}
                  className={`form-control ${errors.sens ? "is-invalid" : ""}`}
                >
                  <option value="">-Choisir le sens- </option>
                  <option value="SENS 1">SENS 1</option>
                  <option value="SENS 2">SENS 2</option>
                </select>
                <div className="invalid-feedback">{errors.sens?.message}</div>
              </div>
              <div className="form-group col">
                <label htmlFor="voie">Voies / Lieu </label>
                <select
                  id="voie"
                  name="voie"
                  {...register("voie")}
                  className={`form-control ${errors.voie ? "is-invalid" : ""}`}
                >
                  <option value="">-Choisir Lieu ou Voie</option>
                  <option value="BAU">BAU</option>
                  <option value="VL">VL</option>
                  <option value="VR">VR</option>
                  <option value="ACCOTEMENT">ACCOTEMENT</option>
                  <option value="AIRE DE REPOS">AIRE DE REPOS</option>
                  <option value="BAU+VL">BAU+VL</option>
                  <option value="VR+VL">VR+VL</option>
                  <option value="VR+VL+BAU">VR+VL+BAU</option>
                  <option value="ACCOTEMENT+BAU">ACCOTEMENT+BAU</option>
                  <option value="EMPRISE">EMPRISE</option>
                  <option value="AUTRE">AUTRE</option>
                </select>
                <div className="invalid-feedback">{errors.voie?.message}</div>
              </div>
            </div>

            <div className="form-row mb-4 "></div>
            <div className="form-row mb-4 ">
              <div className="form-group col">
                <label htmlFor="heureDepart">Heure Départ</label>
                <input
                  type="time"
                  id="heureDepart"
                  name="heureDepart"
                  {...register("heureDepart")}
                  className={`form-control ${
                    errors.heureDepart ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.heureDepart?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="heureArrivee">Heure Arrivée</label>
                <input
                  type="time"
                  id="heureArrivee"
                  name="heureArrivee"
                  {...register("heureArrivee")}
                  className={`form-control ${
                    errors.heureArrivee ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.heureArrivee?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="heureFin">Heure Fin</label>
                <input
                  type="time"
                  id="heureFin"
                  name="heureFin"
                  {...register("heureFin")}
                  className={`form-control ${
                    errors.heureFin ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.heureFin?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="action">Action Menée</label>
                <select
                  id="action"
                  name="action"
                  {...register("action")}
                  className={`form-control ${
                    errors.action ? "is-invalid" : ""
                  }`}
                  // value={currentintrusion.natureEvent}
                  // onChange={handleInputChange}
                >
                  <option value="">-Choisir l'Action-</option>
                  <option value="CAPTURER">CAPTURER</option>
                  <option value="SORTIR DU TRACE">SORTIR DU TRACE</option>
                  <option value="AUTRE">AUTRE</option>
                </select>
                <div className="invalid-feedback">{errors.action?.message}</div>
              </div>
              <div className="form-group col">
                <label htmlFor="nbre">Nombre</label>
                <select
                  id="nbre"
                  name="nbre"
                  {...register("nbre")}
                  className={`form-control ${errors.nbre ? "is-invalid" : ""}`}
                  // value={currentintrusion.natureEvent}
                  // onChange={handleInputChange}
                >
                  <option value="">-Choisir le nombre-</option>
                  <option value="TROUPEAU">TROUPEAU</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                </select>
                <div className="invalid-feedback">{errors.nbre?.message}</div>
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
                onClick={rechargerIntrusion}
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
export default EditIntrusion;
