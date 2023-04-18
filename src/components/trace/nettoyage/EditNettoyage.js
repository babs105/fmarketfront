import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import nettoyageService from "../../../services/trace/nettoyage/nettoyageService";
import { formatDateYYYYMMdd } from "../../../utils/formatDate";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { get } from "jquery";

const EditNettoyage = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialnettoyageState = {
    id: "",
    date: "",
    typeNettoyage: "",
    typeBalisage: "",
    datePose: null,
    dateDepose: null,
    pkdebutBalise: "",
    pkfinBalise: "",
    heureDebut: "",
    heureFin: "",
    pkdebut: "",
    lieu: "",
    pkfin: "",
    voie: "",
    secteur: "",
    autoroute: "",
    sens: "",
    gare: "",
    zone: "",
  };

  const [nettoyage, setNettoyage] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const validationSchema = Yup.object().shape({
    date: Yup.date()
      .typeError("Date invalide")
      .required("date nettoyage est obligatoire"),
    typeNettoyage: Yup.string().required("Type nettoyage est obligatoire"),
    typeBalisage: Yup.string().when("detailBalisage", {
      is: (value) => value === true,
      then: Yup.string().required("Type balisage est obligatoire"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    datePose: Yup.date().when("detailBalisage", {
      is: (value) => value === true,
      then: Yup.date()
        .typeError("Date invalide")
        .required("date Pose nettoyage est obligatoire"),
      otherwise: Yup.date().nullable().notRequired(),
    }),

    // dateDepose: Yup.date().notRequired(),
    pkdebutBalise: Yup.string().when("detailBalisage", {
      is: (value) => value === true,
      then: Yup.string()
        .required("Pk debut balisage obligatoire")
        .matches(
          /^(\d{2,3}\+{1}\d{3})?$/,
          "Le champs doit etre au format 34+500"
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    pkfinBalise: Yup.string()
      .nullable()
      .matches(
        /^(\d{2,3}\+{1}\d{3})?$/,
        "Le champs doit etre au format 34+500"
      ),

    pkdebut: Yup.string().when("lieu", {
      is: (value) =>
        value === "accot" || value === "fosse" || value === "section",
      then: Yup.string()
        .required("Pk est obligatoire")
        .matches(
          /^(\d{2,3}\+{1}\d{3})?$/,
          "Le champs doit etre au format 000+000"
        ),
      otherwise: Yup.string().nullable().notRequired(),
    }),

    pkfin: Yup.string().when("lieu", {
      is: (value) =>
        value === "accot" || value === "fosse" || value === "section",
      then: Yup.string()
        .nullable()
        .matches(
          /^(\d{2,3}\+{1}\d{3})?$/,
          "Le champs doit etre au format 000+500"
        ),
    }),
    sens: Yup.string().when("lieu", {
      is: (value) =>
        value === "accot" || value === "fosse" || value === "section",
      then: Yup.string().required("Sens est obligatoire"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    voie: Yup.string().when("lieu", {
      is: (value) => value === "section",
      then: Yup.string().required("Voie est obligatoire"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    secteur: Yup.string().required("Secteur est obligatoire"),
    lieu: Yup.string().required("Lieu est obligatoire"),
    autoroute: Yup.string().required("Autoroute est obligatoire"),
    heureDebut: Yup.string().required("Heure est obligatoire"),
    heureFin: Yup.string().notRequired("Heure Fin est obligatoire"),
    gare: Yup.string().when("lieu", {
      is: (value) => value === "gare",
      then: Yup.string().required("Gare est obligatoire"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
    zone: Yup.string().when("lieu", {
      is: (value) => value === "gare",
      then: Yup.string().required("Zone est obligatoire"),
      otherwise: Yup.string().nullable().notRequired(),
    }),
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

  const getnettoyage = (id) => {
    console.log("ID", id);
    nettoyageService
      .get(id)
      .then((response) => {
        let dateNet = formatDateYYYYMMdd(new Date(response.data.date));
        setNettoyage({ ...response.data, dateNet });

        console.log(response.data);
        Object.keys(initialnettoyageState).forEach((field) => {
          setValue(field, response.data[field]);
        });
        setValue("date", dateNet);
        setValue("detailBalisage", response.data.datePose ? true : false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log("detail  net");
    if (id) getnettoyage(id);
  }, [id]);
  const watchdetailBalisage = watch("detailBalisage");
  const watchlieu = watch("lieu");
  useEffect(() => {
    // console.log("detail event");
    // if (id) getnettoyage(id);
  }, []);

  const handleChecBoxChange = (e) => {
    const isChecked = e.target.checked;
    setValue("detailBalisage", isChecked);
    console.log(isChecked);
    if (!e.target.checked) {
      setValue("typeBalisage", "");
      setValue("datePose", null);
      setValue("dateDepose", null);
      setValue("pkdebutBalise", "");
      setValue("pkfinBalise", "");
    }
  };
  const handleLieuChange = (e) => {
    const mylieu = e.target.value;
    setValue("lieu", mylieu);
    console.log(e.target.value);
    if (mylieu !== "gare") {
      setValue("gare", "");
      setValue("zone", "");
    }
    if (mylieu !== "section") {
      setValue("sens", "");
      setValue("voie", "");
      setValue("pkdebut", "");
      setValue("pkfin", "");
    }
    // if (mylieu !== "section") {
    //   setValue("sens", "");
    //   setValue("voie", "");
    // }
  };
  const rechargerNettoyage = () => {
    getnettoyage(id);
  };
  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);
    console.log("DATA", data);
    nettoyageService.update(id, data).then(
      (response) => {
        console.log("data new", response.data);
        setMessage("Editer nettoyage succes");
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
            <Link to={"/trace/nettoyages"}>nettoyages</Link>
          </li>
          {/* <li className="breadcrumb-item">
            <Link to={`/trace/evenements/${nettoyage.eventid}`}>
              {nettoyage.localisation}
            </Link>
          </li> */}

          <li className="breadcrumb-item active ">Editer nettoyage</li>
        </ol>
      </nav>
      <div className="mt-2">
        <div className="d-flex justify-content-between">
          <h4 className="text-primary">Editer nettoyage</h4>
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
                  // value={currentnettoyage.dateEvent}
                  // onChange={handleInputChange}
                  {...register("date")}
                  className={`form-control ${errors.date ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.date?.message}</div>
              </div>

              <div className="form-group col">
                <label htmlFor="typeNettoyage">Type de Opération</label>
                <select
                  id="typeNettoyage"
                  name="typeNettoyage"
                  {...register("typeNettoyage")}
                  className={`form-control ${
                    errors.typeNettoyage ? "is-invalid" : ""
                  }`}
                  // value={currentnettoyage.natureEvent}
                  // onChange={handleInputChange}
                >
                  <option value="">-Choisir Type Nettoyage-</option>
                  <option value="NETTOYAGE">NETTOYAGE</option>
                  <option value="DESINFECTION">DESINFECTION</option>
                  <option value="BALAYAGE">BALAYAGE</option>
                  <option value="RAMASSAGE POUBELLE">RAMASSAGE POUBELLE</option>
                  <option value="RAMASSAGE DEBRIS PNEUS">
                    RAMASSAGE DEBRIS PNEUS
                  </option>
                  <option value="RAMASSAGE DEBRIS VERRES">
                    RAMASSAGE DEBRIS VERRES
                  </option>
                  <option value="RAMASSAGE ORDURES">RAMASSAGE D'ORDURES</option>
                  <option value="AUTRE">AUTRE</option>
                </select>
                <div className="invalid-feedback">
                  {errors.typeNettoyage?.message}
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
                <label htmlFor="heureDebut">Heure Debut</label>
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
                <label htmlFor="heureFin">Heure Fin </label>
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
            <div className="form-row">
              <div className="form-group col-sm-4">
                <label htmlFor="lieu">Lieu </label>
                <select
                  id="lieu"
                  name="autoroute"
                  {...register("lieu")}
                  className={`form-control ${errors.lieu ? "is-invalid" : ""}`}
                  onChange={(e) => handleLieuChange(e)}
                >
                  <option value="">-Choisir Lieu-</option>
                  <option value="gare">Gare</option>
                  <option value="section">Section Courante</option>
                  <option value="fosse">Fossé</option>
                  <option value="accot">Accotement</option>
                </select>
                <div className="invalid-feedback">{errors.lieu?.message}</div>
              </div>
            </div>
            {watchlieu === "section" && (
              <div className="form-row mb-4 ">
                <div className="form-group col">
                  <label htmlFor="sens">Sens </label>
                  <select
                    id="sens"
                    name="sens"
                    {...register("sens")}
                    className={`form-control ${
                      errors.sens ? "is-invalid" : ""
                    }`}
                    // value={currentnettoyage.natureEvent}
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
                    className={`form-control ${
                      errors.voie ? "is-invalid" : ""
                    }`}
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
                <div className="form-group col">
                  <label htmlFor="pkdebut">PK Début </label>
                  <input
                    type="text"
                    id="pkdebut"
                    name="pkdebut"
                    {...register("pkdebut")}
                    className={`form-control ${
                      errors.pkdebut ? "is-invalid" : ""
                    }`}
                    // value={currentnettoyage.heureDebutEvent}
                    // onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">
                    {errors.pkdebut?.message}
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="pkfin">PK Fin </label>
                  <input
                    type="text"
                    id="pkfin"
                    name="pkfin"
                    {...register("pkfin")}
                    className={`form-control ${
                      errors.pkfin ? "is-invalid" : ""
                    }`}
                    // value={currentnettoyage.heureDebutEvent}
                    // onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">
                    {errors.pkfin?.message}
                  </div>
                </div>
              </div>
            )}
            {watchlieu === "accot" && (
              <div className="form-row mb-4 ">
                <div className="form-group col">
                  <label htmlFor="sens">Sens </label>
                  <select
                    id="sens"
                    name="sens"
                    {...register("sens")}
                    className={`form-control ${
                      errors.sens ? "is-invalid" : ""
                    }`}
                    // value={currentnettoyage.natureEvent}
                    // onChange={handleInputChange}
                  >
                    <option value="">-Choisir le sens- </option>
                    <option value="SENS 1">SENS 1</option>
                    <option value="SENS 2">SENS 2</option>
                  </select>
                  <div className="invalid-feedback">{errors.sens?.message}</div>
                </div>
                <div className="form-group col">
                  <label htmlFor="pkdebut">PK Début </label>
                  <input
                    type="text"
                    id="pkdebut"
                    name="pkdebut"
                    {...register("pkdebut")}
                    className={`form-control ${
                      errors.pkdebut ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.pkdebut?.message}
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="pkfin">PK Fin </label>
                  <input
                    type="text"
                    id="pkfin"
                    name="pkfin"
                    {...register("pkfin")}
                    className={`form-control ${
                      errors.pkfin ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.pkfin?.message}
                  </div>
                </div>
              </div>
            )}
            {watchlieu === "gare" && (
              <div className="form-row ">
                <div className="form-group col-sm-4">
                  <label htmlFor="gare">Liste des Gares </label>
                  <select
                    id="gare"
                    name="gare"
                    {...register("gare")}
                    className={`form-control ${
                      errors.gare ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">-Choisir Gare-</option>
                    <option value="BPV THIES">BPV THIES</option>
                    <option value="KEUR MADAROU">KEUR MADAROU</option>
                    <option value="KHOMBOLE">KHOMBOLE</option>
                    <option value="DIOURBEL">DIOURBEL</option>
                    <option value="TOUBA">TOUBA</option>
                    <option value="KIRENE">KIRENE</option>
                    <option value="SINDIA">SINDIA</option>
                    <option value="SOUNE">SOUNE</option>
                    <option value="THIAMBOKH">THIAMBOKH</option>
                    <option value="NGUEKHOKH">NGUEKHOKH</option>
                    <option value="MBOUR">MBOUR</option>
                    <option value="MALICOUNDA">MALICOUNDA</option>
                    <option value="BAMBEY">BAMBEY</option>
                  </select>
                  <div className="invalid-feedback">{errors.gare?.message}</div>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="zone">Zone Gare </label>
                  <select
                    id="zone"
                    name="zone"
                    {...register("zone")}
                    className={`form-control ${
                      errors.zone ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">-Choisir Zone-</option>
                    <option value="BOX">BOX</option>
                    <option value="AIRE DE REPOS">AIRE DE REPOS</option>
                    <option value="ENCEINTE GARE">ENCEINTE GARE</option>
                    <option value="PLATEFORME">PLATEFORME</option>
                    <option value="BRETELLE">BRETELLE</option>
                    <option value="AUTRE">AUTRE</option>
                  </select>
                  <div className="invalid-feedback">{errors.zone?.message}</div>
                </div>
              </div>
            )}
            {watchlieu === "fosse" && (
              <div className="form-row mb-4 ">
                <div className="form-group col">
                  <label htmlFor="sens">Sens </label>
                  <select
                    id="sens"
                    name="sens"
                    {...register("sens")}
                    className={`form-control ${
                      errors.sens ? "is-invalid" : ""
                    }`}
                    // value={currentnettoyage.natureEvent}
                    // onChange={handleInputChange}
                  >
                    <option value="">-Choisir le sens- </option>
                    <option value="SENS 1">SENS 1</option>
                    <option value="SENS 2">SENS 2</option>
                  </select>
                  <div className="invalid-feedback">{errors.sens?.message}</div>
                </div>
                <div className="form-group col">
                  <label htmlFor="pkdebut">PK Début </label>
                  <input
                    type="text"
                    id="pkdebut"
                    name="pkdebut"
                    {...register("pkdebut")}
                    className={`form-control ${
                      errors.pkdebut ? "is-invalid" : ""
                    }`}
                    // value={currentnettoyage.heureDebutEvent}
                    // onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">
                    {errors.pkdebut?.message}
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="pkfin">PK Fin </label>
                  <input
                    type="text"
                    id="pkfin"
                    name="pkfin"
                    {...register("pkfin")}
                    className={`form-control ${
                      errors.pkfin ? "is-invalid" : ""
                    }`}
                    // value={currentnettoyage.heureDebutEvent}
                    // onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">
                    {errors.pkfin?.message}
                  </div>
                </div>
              </div>
            )}
            <div className="my-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="detailBalisage"
                  {...register("detailBalisage")}
                  className="form-check-input"
                  id="defaultCheck1"
                  onChange={(e) => handleChecBoxChange(e)}
                />
                <label class="form-check-label" htmlFor="defaultCheck1">
                  Ajouter Infos Balisage
                </label>
              </div>
            </div>
            {watchdetailBalisage && (
              <div className="form-row mb-4 ">
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
                    // value={currentnettoyage.heureDebutEvent}
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
                    // value={currentnettoyage.heureDebutEvent}
                    // onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">
                    {errors.pkfinBalise?.message}
                  </div>
                </div>
              </div>
            )}
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
                onClick={rechargerNettoyage}
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
export default EditNettoyage;
