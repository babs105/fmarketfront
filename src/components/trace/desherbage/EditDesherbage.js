import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DesherbageService from "../../../services/trace/desherbage/desherbageService";
import { formatDateYYYYMMdd } from "../../../utils/formatDate";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const EditDesherbage = (props) => {
  const { id } = useParams();

  const initialDesherbageState = {
    id: "",
    date: "",
    typeDesherbage: "",
    heureDebut: "",
    heureFin: "",
    pkDebut: "",
    pkFin: "",
    autoroute: "",
    secteur: "",
    sens: "",
  };
  const [desherbage, setDesherbage] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const validationSchema = Yup.object().shape({
    date: Yup.date()
      .typeError("Date invalide")
      .required("date Desherbage est obligatoire"),
    typeDesherbage: Yup.string().required("Type Desherbage est obligatoire"),
    heureDebut: Yup.string().required("Heure Début est obligatoire"),
    heureFin: Yup.string().nullable().notRequired(),
    autoroute: Yup.string().required("Autoroute  est obligatoire"),
    sens: Yup.string().required("Sens est obligatoire"),
    secteur: Yup.string().required("Secteur est obligatoire"),

    pkDebut: Yup.string()
      .required("Le pK est obligatoire")
      .matches(
        /^(\d{2,3}\+{1}\d{3})?$/,
        "Le champs doit etre au format 000+000"
      ),
    pkFin: Yup.string()
      .nullable()
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

  const getDesherbage = (id) => {
    console.log("ID", id);
    DesherbageService.get(id)
      .then((response) => {
        let dateIntru = formatDateYYYYMMdd(new Date(response.data.date));
        setDesherbage({ ...response.data, dateIntru });

        console.log(response.data);
        Object.keys(initialDesherbageState).forEach((field) => {
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
    if (id) getDesherbage(id);
  }, [id]);

  const rechargerDesherbage = () => {
    getDesherbage(id);
  };
  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);
    console.log("DATA", data);
    DesherbageService.update(id, data).then(
      (response) => {
        console.log("data new", response.data);
        setMessage("Editer Desherbage succes");
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
            <Link to={"/trace/Desherbages"}>Désherbages</Link>
          </li>
          {/* <li className="breadcrumb-item">
            <Link to={`/trace/evenements/${Desherbage.eventid}`}>
              {Desherbage.localisation}
            </Link>
          </li> */}

          <li className="breadcrumb-item active ">Editer Désherbage</li>
        </ol>
      </nav>
      <div className="mt-2">
        <div className="d-flex justify-content-between">
          <h4 className="text-primary">Editer Désherbage</h4>
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
                  // value={currentDesherbage.dateEvent}
                  // onChange={handleInputChange}
                  {...register("date")}
                  className={`form-control ${errors.date ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.date?.message}</div>
              </div>
              <div className="form-group col">
                <label htmlFor="typeDesherbage">Type de Desherbage</label>
                <select
                  id="typeDesherbage"
                  name="typeDesherbage"
                  {...register("typeDesherbage")}
                  className={`form-control ${
                    errors.typeDesherbage ? "is-invalid" : ""
                  }`}
                  // value={currentDesherbage.natureEvent}
                  // onChange={handleInputChange}
                >
                  <option value="">-Choisir Type Desherbage-</option>
                  <option value="MANUEL">MANUEL</option>
                  <option value="MECANIQUE">MECANIQUE</option>
                  <option value="'AUTRE">AUTRE</option>
                </select>
                <div className="invalid-feedback">
                  {errors.typeDesherbage?.message}
                </div>
              </div>

              <div className="form-group col">
                <label htmlFor="heureAnnonce">Heure Début</label>
                <input
                  type="time"
                  id="heureDebut"
                  name="heureDebut"
                  {...register("heureDebut")}
                  className={`form-control ${
                    errors.heureDebut ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.heureDebut?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="heureAnnonce">Heure Fin</label>
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
                >
                  <option value="">-Choisir le sens- </option>
                  <option value="SENS 1">SENS 1</option>
                  <option value="SENS 2">SENS 2</option>
                </select>
                <div className="invalid-feedback">{errors.sens?.message}</div>
              </div>
              <div className="form-group col">
                <label htmlFor="pk">Pk Début </label>
                <input
                  type="text"
                  id="pkDebut"
                  name="pkDebut"
                  {...register("pkDebut")}
                  className={`form-control ${
                    errors.pkDebut ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.pkDebut?.message}
                </div>
              </div>

              <div className="form-group col">
                <label htmlFor="pk">Pk Fin </label>
                <input
                  type="text"
                  id="pkFin"
                  name="pkFin"
                  {...register("pkFin")}
                  className={`form-control ${errors.pkFin ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.pkFin?.message}</div>
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
                onClick={rechargerDesherbage}
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
export default EditDesherbage;
