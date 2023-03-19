import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import remorquageService from "../../../services/trace/remorque/remorquageService";
import { formatDateYYYYMMdd } from "../../../utils/formatDate";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const EditRemorquage = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialRemorquageState = {
    id: "",
    eventid: "",
    dateRom: "",
    localisation: "",
    matVhlRemorque: "",
    catVhlRemorque: "",
    heureAppelROM: "",
    nomROM: "",
    matriculeDep: "",
    heureDepartROM: "",
    heureArriveeROM: "",
    heureRomorque: "",
    lieuDepart: "",
    lieuDepot: "",
    statutRom: "",
  };

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [remorquage, setRemorquage] = useState({});

  const validationSchema = Yup.object().shape({
    dateRom: Yup.date()
      .typeError("Date invalide")
      .required("Date Remorquage est obligatoire"),
    matVhlRemorque: Yup.string().required("Matricule Vehicule est obligatoire"),
    catVhlRemorque: Yup.string().required("Type Vehicule est obligatoire"),
    nomROM: Yup.string().required("Nom du Remorqueur est obligatoire"),
    heureDepartROM: Yup.string().notRequired(),
    heureArriveeROM: Yup.string().notRequired(),
    matriculeDep: Yup.string().required("Matricule est obligatoire"),
    heureAppelROM: Yup.string().notRequired(),
    heureRomorque: Yup.string().notRequired(),
    lieuDepart: Yup.string().required("Lieu Départ est obligatoire"),
    lieuDepot: Yup.string().when("heureRomorque", {
      is: (value) => value !== "",
      then: Yup.string().required("Lieu Dépot est obligatoire"),
      otherwise: Yup.string().notRequired(),
    }),
    statutRom: Yup.string().required("Statut Remorquage est obligatoire"),
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

  const getRemorquage = (id) => {
    console.log("ID", id);
    remorquageService
      .get(id)
      .then((response) => {
        let dateRom = formatDateYYYYMMdd(new Date(response.data.dateRom));
        setRemorquage({ ...response.data, dateRom });

        console.log(response.data);
        Object.keys(initialRemorquageState).forEach((field) => {
          setValue(field, response.data[field]);
        });
        setValue("dateRom", dateRom);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log("detail  rom");
    if (id) getRemorquage(id);
  }, [id]);

  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);
    console.log("DATA", data);
    remorquageService.update(id, data).then(
      (response) => {
        console.log("data new", response.data);
        setMessage("Editer Remorquage succes");
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
            <Link to={"/trace/evenements"}>Evénèments</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/trace/evenements/${remorquage.eventid}`}>
              {remorquage.localisation}
            </Link>
          </li>

          <li className="breadcrumb-item ">Editer remorquage</li>
        </ol>
      </nav>
      <div className="mt-2">
        <div className="d-flex justify-content-between">
          <h4 className="text-primary">Editer Remorquage</h4>
        </div>
        <hr className="mb-3" />
        <div className="edit-form ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row mb-4">
              <div className="form-group col">
                <label htmlFor="dateRom">Date</label>
                <input
                  type="date"
                  id="dateRom"
                  name="dateRom"
                  // value={currentRemorquage.dateEvent}
                  // onChange={handleInputChange}
                  {...register("dateRom")}
                  className={`form-control ${
                    errors.dateRom ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.dateRom?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="matVhlRemorque">Matricule</label>
                <input
                  type="text"
                  id="matVhlRemorque"
                  name="matVhlRemorque"
                  {...register("matVhlRemorque")}
                  className={`form-control ${
                    errors.matVhlRemorque ? "is-invalid" : ""
                  }`}
                  // value={currentRemorquage.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.matVhlRemorque?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="catVhlRemorque">Catégorie </label>
                <input
                  id="catVhlRemorque"
                  name="typeVehicule"
                  {...register("catVhlRemorque")}
                  className={`form-control ${
                    errors.catVhlRemorque ? "is-invalid" : ""
                  }`}
                  // value={currentRemorquage.natureEvent}
                  // onChange={handleInputChange}
                />

                <div className="invalid-feedback">
                  {errors.typeVehicule?.message}
                </div>
              </div>
            </div>

            <div className="form-row mb-4">
              <div className="form-group col">
                <label htmlFor="heureAppelROM">H. Appel Remorqueur </label>

                <input
                  type="time"
                  id="heureAppelROM"
                  name="heureAppelROM"
                  {...register("heureAppelROM")}
                  className={`form-control ${
                    errors.heureAppelROM ? "is-invalid" : ""
                  }`}
                  // value={currentRemorquage.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.heureAppelROM?.message}
                </div>
              </div>

              <div className="form-group col">
                <label htmlFor="nomROM">Nom Remorqueur</label>
                <input
                  type="text"
                  id="nomROM"
                  name="nomROM"
                  {...register("nomROM")}
                  className={`form-control ${
                    errors.nomROM ? "is-invalid" : ""
                  }`}
                  // value={currentRemorquage.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">{errors.nomROM?.message}</div>
              </div>

              <div className="form-group col">
                <label htmlFor="heureAppelPAT">Matricule Depanneur</label>
                <input
                  type="text"
                  id="matriculeDep"
                  name="matriculeDep"
                  {...register("matriculeDep")}
                  className={`form-control ${
                    errors.matriculeDep ? "is-invalid" : ""
                  }`}
                  // value={currentRemorquage.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.matriculeDep?.message}
                </div>
              </div>
            </div>
            <div className="form-row mb-4">
              <div className="form-group col">
                <label htmlFor="heureDepartROM">Heure Départ Dépanneur </label>
                <input
                  type="time"
                  id="heureDepartROM"
                  name="heureDepartROM"
                  {...register("heureDepartROM")}
                  className={`form-control ${
                    errors.heureDepartROM ? "is-invalid" : ""
                  }`}
                  // value={currentRemorquage.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.heureDepartROM?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="heureArriveeROM">
                  Heure D'arrivée Dépanneur{" "}
                </label>
                <input
                  type="time"
                  id="heureArriveeROM"
                  name="heureArriveeROM"
                  {...register("heureArriveeROM")}
                  className={`form-control ${
                    errors.heureArriveeROM ? "is-invalid" : ""
                  }`}
                  // value={currentRemorquage.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.heureArriveeROM?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="heureRomorque">Heure Remorquée </label>
                <input
                  type="time"
                  id="heureRomorque"
                  name="heureRomorque"
                  {...register("heureRomorque")}
                  className={`form-control ${
                    errors.heureRomorque ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.heureRomorque?.message}
                </div>
              </div>
            </div>
            <div className="form-row mb-4">
              <div className="form-group col">
                <label htmlFor="lieuDepart">Lieu de Départ </label>
                <input
                  type="text"
                  id="lieuDepart"
                  name="lieuDepart"
                  {...register("lieuDepart")}
                  className={`form-control ${
                    errors.lieuDepart ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.lieuDepart?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="statutEvent">Lieu de Dépot</label>
                <select
                  id="lieuDepot"
                  name="lieuDepot"
                  {...register("lieuDepot")}
                  className={`form-control ${
                    errors.lieuDepot ? "is-invalid" : ""
                  }`}
                >
                  <option value="">-Choisir Lieu de Dépot-</option>
                  <option value="SORTIE TOUBA">SORTIE TOUBA</option>
                  <option value="SORTIE BAMBEY"> SORTIE BAMBEY</option>
                  <option value="SORTIE DIOURBEL">SORTIE DIOURBEL</option>
                  <option value="SORTIE THIES">SORTIE THIES</option>
                  <option value="SORTIE KHOMBOLE">SORTIE KHOMBOLE</option>
                  <option value="SORTIE KEUR MADAROU">
                    SORTIE KEUR MADAROU
                  </option>
                  <option value="SORTIE THIES">SORTIE THIES</option>
                  <option value="SORTIE AIBD">SORTIE AIBD</option>
                  <option value="SORTIE SINDIA">SORTIE SINDIA</option>
                  <option value="SORTIE NGUEKHOKH">SORTIE NGUEKHOKH</option>
                  <option value="SORTIE MALICOUNDA">SORTIE MALICOUNDA</option>
                  <option value="SORTIE MBOUR">SORTIE MBOUR</option>
                  <option value="BASE DIOURBEL"> BASE DIOURBEL</option>
                  <option value="BASE BAMBEY">BASE BAMBEY</option>
                  <option value="BASE KHOMBOLE">BASE KHOMBOLE</option>
                  <option value="BPV THIES"> BPV THIES</option>
                  <option value="BASE KIRENE">BASE KIRENE</option>
                  <option value="BASE SINDIA"> BASE SINDIA</option>
                  <option value="BASE MALICOUNDA">BASE MALICOUNDA</option>
                  <option value="BASE NGUEKHOKH">BASE NGUEKHOKH</option>
                  <option value="BASE MBOUR">BASE MBOUR</option>
                  <option value="BAU">BAU</option>
                  <option value="ACCOTTEMENT">ACCOTTEMENT</option>
                  <option value="ANNULE">ANNULE</option>
                  <option value="NON">NON</option>
                  <option value="AUTRE">AUTRE</option>
                </select>
                <div className="invalid-feedback">
                  {errors.lieuDepot?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="statutRom">Statut Remorquage </label>
                <select
                  id="statutRom"
                  name="statutRom"
                  {...register("statutRom")}
                  className={`form-control ${
                    errors.statutRom ? "is-invalid" : ""
                  }`}
                >
                  <option value="">-Choisir Statut remorquage</option>
                  <option value="remorque">Remorque</option>
                  <option value="annule">Annule</option>
                </select>
                <div className="invalid-feedback">
                  {errors.statutRom?.message}
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
};
export default EditRemorquage;
