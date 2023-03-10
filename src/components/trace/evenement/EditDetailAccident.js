import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import detailAccidentService from "../../../services/trace/detailService/detailAccidentService";
import evenementService from "../../../services/trace/evenement/evenementService";
import { formatDateYYYYMMdd } from "../../../utils/formatDate";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

function EditDetailAccident() {
  const { id } = useParams();
  const initialDetailAccidentState = {
    id: "",
    eventid: "",
    dateAcci: "",
    matriculeVhlImplique: "",
    typeVhlImplique: "",
    causeAccident: "",
    typeAccident: "",
    nbreBlesseLeger: "",
    nbreBlesseGrave: "",
    nbreMort: "",
    sinistres: "",
    heureArriveeGEN: "",
    heureDepartGEN: "",
    heureArriveePompier: "",
    heureDepartPompier: "",
  };

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [detailAccident, setDetailAccident] = useState({});

  const validationSchema = Yup.object().shape({
    dateAcci: Yup.date()
      .typeError("Date invalide")
      .required("Date Accident est obligatoire"),
    matriculeVhlImplique: Yup.string().required(
      "Matricule Vehicule est obligatoire"
    ),
    typeVhlImplique: Yup.string().required("Type Vehicule est obligatoire"),
    causeAccident: Yup.string().required("Cause Accident est obligatoire"),
    typeAccident: Yup.string().required("Type Accident est obligatoire"),
    nbreBlesseLeger: Yup.string().required("Nbre Blessé Léger est obligatoire"),
    nbreBlesseGrave: Yup.string().required("Nbre Blessé Grave est obligatoire"),
    nbreMort: Yup.string().required("Nbre de Mort est obligatoire"),
    sinistres: Yup.string().required("Sinistres est obligatoire"),
    heureArriveeGEN: Yup.string().notRequired(),
    heureDepartGEN: Yup.string().notRequired(),
    heureArriveePompier: Yup.string().notRequired(),
    heureDepartPompier: Yup.string().notRequired(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const getDetailAccident = (id) => {
    console.log("ID", id);
    detailAccidentService
      .get(id)
      .then((response) => {
        let dateAcci = formatDateYYYYMMdd(new Date(response.data.dateAcci));
        console.log("datecii", dateAcci);
        setDetailAccident({ ...response.data, dateAcci });
        console.log(response.data);

        Object.keys(initialDetailAccidentState).forEach((field) => {
          setValue(field, response.data[field]);
        });
        setValue("dateAcci", dateAcci);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log("detail acci");
    if (id) getDetailAccident(id);
  }, [id]);

  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);
    console.log("DATA", data);
    detailAccidentService.update(id, data).then(
      (response) => {
        console.log("data update", response.data);
        setMessage("Ajout Detail Accident succes");
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
        setLoading(false);
        setSuccessful(false);
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
            <Link to={"/trace/evenements"}>Evénèments</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/trace/evenements/${detailAccident.eventid}`}>
              {detailAccident.localisation}
            </Link>
          </li>

          <li className="breadcrumb-item "> détail accident</li>
        </ol>
      </nav>
      <div className="mt-4">
        <div className="d-flex justify-content-between">
          <h4 className="text-primary">Editer Détail Accident</h4>
          {/* <div>
              {DetailAccident?.natureEvent === "ACCIDENT" &&
                detailAccidents?.length !== 1 && (
                  <>
                    <button className="btn btn-danger mr-2">
                      Ajout Detail Accident
                    </button>
                  </>
                )}
              <button className="btn btn-primary"> Ajout DetailAccident</button>
            </div> */}
        </div>
        <hr className="mb-4" />
        <div className="edit-form ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row mb-4">
              <div className="form-group col">
                <label htmlFor="dateAcci">Date</label>
                <input
                  type="date"
                  id="dateAcci"
                  name="dateAcci"
                  // value={currentDetailAccident.dateEvent}
                  // onChange={handleInputChange}
                  {...register("dateAcci")}
                  className={`form-control ${
                    errors.dateAcci ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.dateAcci?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="matriculeVhlImplique">
                  Matricules Vehicules Impliques
                </label>
                <input
                  type="text"
                  id="matriculeVhlImplique"
                  name="matriculeVhlImplique"
                  {...register("matriculeVhlImplique")}
                  className={`form-control ${
                    errors.matriculeVhlImplique ? "is-invalid" : ""
                  }`}
                  // value={currentDetailAccident.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.matriculeVhlImplique?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="typeVhlImplique">
                  Types Vehicules Impliques{" "}
                </label>
                <input
                  type="text"
                  id="typeVhlImplique"
                  name="typeVehicule"
                  {...register("typeVhlImplique")}
                  className={`form-control ${
                    errors.typeVhlImplique ? "is-invalid" : ""
                  }`}
                  // value={currentDetailAccident.natureEvent}
                  // onChange={handleInputChange}
                />

                <div className="invalid-feedback">
                  {errors.typeVhlImplique?.message}
                </div>
              </div>
            </div>

            <div className="form-row mb-4">
              <div className="form-group col">
                <label htmlFor="causeAccident">Cause Accident </label>

                <input
                  type="text"
                  id="causeAccident"
                  name="causeAccident"
                  {...register("causeAccident")}
                  className={`form-control ${
                    errors.causeAccident ? "is-invalid" : ""
                  }`}
                  // value={currentDetailAccident.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.causeAccident?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="typeAccident">Type Accident </label>
                <select
                  id="typeAccident"
                  name="typeAccident"
                  {...register("typeAccident")}
                  className={`form-control ${
                    errors.typeAccident ? "is-invalid" : ""
                  }`}
                >
                  <option value="">-Choisir Type Accident-</option>
                  <option value="MATERIEL">MATERIEL</option>
                  <option value="CORPOREL">CORPOREL</option>
                  <option value="MORTEL">MORTEL</option>
                </select>
                <div className="invalid-feedback">
                  {errors.typeAccident?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="nbreBlesseLeger">Nbre Blessé Leger </label>
                <input
                  type="text"
                  id="nbreBlesseLeger"
                  name="nbreBlesseLeger"
                  {...register("nbreBlesseLeger")}
                  className={`form-control ${
                    errors.nbreBlesseLeger ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.nbreBlesseLeger?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="nbreBlesseLeger">Nbre Blessé Grave </label>
                <input
                  type="text"
                  id="nbreBlesseGrave"
                  name="nbreBlesseGrave"
                  {...register("nbreBlesseGrave")}
                  className={`form-control ${
                    errors.nbreBlesseGrave ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.nbreBlesseGrave?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="nbreMort">Nbre de Mort</label>
                <input
                  type="text"
                  id="nbreMort"
                  name="nbreMort"
                  {...register("nbreMort")}
                  className={`form-control ${
                    errors.nbreMort ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.nbreMort?.message}
                </div>
              </div>
            </div>
            <div className="form-row mb-4">
              <div className="form-group col">
                <label htmlFor="sinistres">Sinistres </label>
                <input
                  type="text"
                  id="sinistres"
                  name="sinistres"
                  {...register("sinistres")}
                  className={`form-control ${
                    errors.sinistres ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.sinistres?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="heureArriveeGEN">H.Arrivée Gendarmerie </label>
                <input
                  type="time"
                  id="heureArriveeGEN"
                  name="heureArriveeGEN"
                  {...register("heureArriveeGEN")}
                  className={`form-control ${
                    errors.heureArriveeGEN ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.heureArriveeGEN?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="heureDepartGEN">H.Départ Gendarmerie</label>
                <input
                  type="time"
                  id="heureDepartGEN"
                  name="heureDepartGEN"
                  {...register("heureDepartGEN")}
                  className={`form-control ${
                    errors.heureDepartGEN ? "is-invalid" : ""
                  }`}
                  // value={currentDetailAccident.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.heureDepartGEN?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="heureArriveePompier">H.Arrivée Sampeurs </label>
                <input
                  type="time"
                  id="heureArriveePompier"
                  name="heureArriveePompier"
                  {...register("heureArriveePompier")}
                  className={`form-control ${
                    errors.heureArriveePompier ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.heureArriveePompier?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="heureDepartPompier">H.Départ Sampeurs </label>
                <input
                  type="time"
                  id="heureDepartPompier"
                  name="heureDepartPompier"
                  {...register("heureDepartPompier")}
                  className={`form-control ${
                    errors.heureDepartPompier ? "is-invalid" : ""
                  }`}
                  // value={currentDetailAccident.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.heureDepartPompier?.message}
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
                type="button"
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
}

export default EditDetailAccident;
