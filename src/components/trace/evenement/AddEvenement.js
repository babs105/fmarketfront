import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import evenementService from "../../../services/trace/evenement/evenementService";
import { formatDateYYYYMMdd } from "../../../utils/formatDate";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useTable } from "react-table";
import TableContainer from "../../TableContainer";

const AddEvenement = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialEvenementState = {
    id: "",
    dateEvent: "",
    heureDebutEvent: "",
    natureEvent: "",
    causeEvent: "",
    matVehicule: "",
    typeVehicule: "",
    pkEvent: "",
    sens: "",
    voie: "",
    secteur: "",
    emisPar: "",
    heureAppelPAT: "",
    heureAppelOPC: "",
    nomPAT: "",
    heureArriveePAT: "",
    dateheurePoseBalise: "",
    dateheureDeposeBalise: "",
    typeBalisage: "",
    pkDebutBalisage: "",
    pkFinBalisage: "",
    statutEvent: "",
    etatEvent: "",
    observation: "",
  };
  const [evenement, setEvenement] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [remorquages, setRemorquages] = useState([]);

  const evenementsRef = useRef();
  evenementsRef.current = remorquages;

  const validationSchema = Yup.object().shape({
    dateEvent: Yup.date()
      .typeError("Date invalide")
      .required("date evenement est obligatoire"),
    heureDebutEvent: Yup.string().required("Heure evenement est obligatoire"),
    natureEvent: Yup.string().required("Nature evenement est obligatoire"),
    causeEvent: Yup.string().required("Cause evenement est obligatoire"),
    matVehicule: Yup.string().required("Matricule Vehicule est obligatoire"),
    typeVehicule: Yup.string().required("Type Vehicule est obligatoire"),
    pkEvent: Yup.string()
      .required("Pk est obligatoire")
      .matches(
        /^A[12] (\d{2,3}\+{1}\d{3})?$/,
        "Le champs doit etre au format A1 000+000"
      ),
    sens: Yup.string().required("Sens est obligatoire"),
    voie: Yup.string().required("Voie est obligatoire"),
    secteur: Yup.string().required("Secteur est obligatoire"),
    emisPar: Yup.string().required("Emis Par est obligatoire"),
    // heureAppelPAT: Yup.string().required("H. appel PAT est obligatoire"),
    heureAppelPAT: Yup.string().when("emisPar", {
      is: (value) => value !== "PAT",
      then: Yup.string().required("H. appel PAT est obligatoire"),
      otherwise: Yup.string().notRequired(),
    }),
    heureAppelOPC: Yup.string().when("emisPar", {
      is: (value) => value !== "OPC",
      then: Yup.string().required("H. appel OPC est obligatoire"),
      otherwise: Yup.string().notRequired(),
    }),
    nomPAT: Yup.string().required("Nom Pat est obligatoire"),
    heureArriveePAT: Yup.string().notRequired(),
    dateheurePoseBalise: Yup.string().notRequired(),
    dateheureDeposeBalise: Yup.string().notRequired(),
    typeBalisage: Yup.string().notRequired(),
    pkDebutBalisage: Yup.string()
      .nullable()
      .matches(
        /^(\d{2,3}\+{1}\d{3})?$/,
        "Le champs doit etre au format 34+500"
      ),
    pkFinBalisage: Yup.string()
      .nullable()
      .matches(
        /^(\d{2,3}\+{1}\d{3})?$/,
        "Le champs doit etre au format 34+500"
      ),
    statutEvent: Yup.string().required("Statut est obligatoire"),
    etatEvent: Yup.string().notRequired(),
    observation: Yup.string().notRequired(),
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
    // if (id) getEvenement(id);
  }, []);
  const emis = watch("emisPar");

  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);
    console.log("DATA", data);
    evenementService.create(data).then(
      (response) => {
        console.log("data new", response.data);
        setMessage("Ajout evenement succes");
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
          <li className="breadcrumb-item active" aria-current="page">
            Ajout Evénèment: {evenement.localisation}
          </li>
        </ol>
      </nav>
      <div className="mt-4">
        {/* <div className="d-flex justify-content-between"> */}
        <h4 className="text-primary">Nouveau Evènement</h4>
        {/* </div> */}
        <hr className="mb-4" />
        <div className="edit-form mt-4 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row mb-4">
              <div className="form-group col ">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="dateEvent"
                  name="dateEvent"
                  // value={currentEvenement.dateEvent}
                  // onChange={handleInputChange}
                  {...register("dateEvent")}
                  className={`form-control ${
                    errors.dateEvent ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.dateEvent?.message}
                </div>
              </div>
              {/* <div className="form-group col">
              <label htmlFor="Heure">Heure</label>
              <input
                type="text"
                id="Heure"
                name="heureDebutEvent"
                {...register("heureDebutEvent")}
                className={`form-control ${
                  errors.heureDebutEvent ? "is-invalid" : ""
                }`}
                // value={currentEvenement.heureDebutEvent}
                // onChange={handleInputChange}
              />
              <div className="invalid-feedback">
                {errors.heureDebutEvent?.message}
              </div>
            </div> */}
              <div className="form-group col">
                <label htmlFor="natureEvent">Nature Evenement</label>
                <select
                  id="inputState"
                  name="natureEvent"
                  {...register("natureEvent")}
                  className={`form-control ${
                    errors.natureEvent ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.natureEvent}
                  // onChange={handleInputChange}
                >
                  <option value="">-Choisir la Nature Evenement-</option>
                  <option value="ACCIDENT">ACCIDENT</option>
                  <option value="PANNE">PANNE</option>
                  <option value="VEHICULE EN FEU">VEHICULE EN FEU</option>
                  <option value="SUITE ACCIDENT">SUITE ACCIDENT</option>
                  <option value="AUTRE">AUTRE</option>
                </select>
                <div className="invalid-feedback">
                  {errors.natureEvent?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="causeEvent">Cause Evenement</label>
                <select
                  id="inputState"
                  name="causeEvent"
                  {...register("causeEvent")}
                  className={`form-control ${
                    errors.causeEvent ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.natureEvent}
                  // onChange={handleInputChange}
                >
                  <option value="">-Choisir la Cause Evenement-</option>
                  <option value="MOTEUR">MOTEUR</option>
                  <option value="CREVAISION">CREVAISION</option>
                  <option value="VEHICULE EN FEU">VEHICULE EN FEU</option>
                  <option value="CARBURANT">CARBURANT</option>
                  <option value="DEFAUT FREINAGE">DEFAUT FREINAGE</option>
                  <option value="EMBRAYAGE">EMBRAYAGE</option>
                  <option value="VITESSE">VITESSE</option>
                  <option value="ECLATEMENT PNEU">ECLATEMENT PNEU</option>
                  <option value="PERTE DE CONTRÔLE">PERTE DE CONTRÔLE</option>
                  <option value="SOMNOLENCE CHAUFFEUR">
                    SOMNOLENCE CHAUFFEUR
                  </option>
                  <option value="COLLISION">COLLISION</option>
                  <option value="ABANDON">ABANDON</option>
                  <option value="PROBLEME MECANIQUE">PROBLEME MECANIQUE</option>
                  <option value="CRAMBOLAGE">CRAMBOLAGE</option>
                  <option value="CHAUFFAGE">CHAUFFAGE</option>
                  <option value="AUTRE">AUTRE</option>
                </select>
                <div className="invalid-feedback">
                  {errors.causeEvent?.message}
                </div>
              </div>
            </div>
            <div className="form-row mb-4 ">
              <div className="form-group col">
                <label htmlFor="matricule">Matricule</label>
                <input
                  type="text"
                  id="Heure"
                  name="matVehicule"
                  {...register("matVehicule")}
                  className={`form-control ${
                    errors.matVehicule ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.matVehicule?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="typeVehicule">Catégorie </label>
                <select
                  id="inputState"
                  name="typeVehicule"
                  {...register("typeVehicule")}
                  className={`form-control ${
                    errors.typeVehicule ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.natureEvent}
                  // onChange={handleInputChange}
                >
                  <option value="">-Choisir Categorie- </option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                  <option value="C3">C3</option>
                  <option value="C4">C4</option>
                  <option value="C1/C2">C1/C2</option>
                  <option value="C2/C2">C2/C2</option>
                  <option value="C2/C3">C2/C3</option>
                  <option value="C3/C3">C3/C3</option>
                  <option value="C3/C4">C3/C4</option>
                  <option value="C2/C4">C2/C4</option>
                  <option value="AUTRE">AUTRE</option>
                </select>
                <div className="invalid-feedback">
                  {errors.typeVehicule?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="pkEvent">Pk Lieu</label>
                <input
                  type="text"
                  id="pkEvent"
                  name="pkEvent"
                  {...register("pkEvent")}
                  className={`form-control ${
                    errors.pkEvent ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.pkEvent?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="sens">Sens </label>
                <select
                  id="inputState"
                  name="sens"
                  {...register("sens")}
                  className={`form-control ${
                    errors.typeVehicule ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.natureEvent}
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
                  id="inputState"
                  name="voie"
                  {...register("voie")}
                  className={`form-control ${errors.voie ? "is-invalid" : ""}`}
                  // value={currentEvenement.natureEvent}
                  // onChange={handleInputChange}
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
            <div className="form-row mb-4">
              <div className="form-group col">
                <label htmlFor="secteur">Secteur </label>
                <select
                  id="secteur"
                  name="secteur"
                  {...register("secteur")}
                  className={`form-control ${
                    errors.secteur ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.natureEvent}
                  // onChange={handleInputChange}
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
                <label htmlFor="emisPar">Emis Par </label>
                <select
                  id="emisPar"
                  name="emisPar"
                  {...register("emisPar")}
                  className={`form-control ${
                    errors.emisPar ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.natureEvent}
                  // onChange={handleInputChange}
                >
                  <option value="">-Choisir Emetteur-</option>
                  <option value="PAT">PAT</option>
                  <option value="OPC">OPC</option>
                  <option value="REMORQUEUR">REMORQUEUR</option>
                  <option value="AUTRE">AUTRE</option>
                </select>
                <div className="invalid-feedback">
                  {errors.emisPar?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="Heure">H. Debut Evenement</label>

                <input
                  type="time"
                  id="Heure"
                  name="heureDebutEvent"
                  {...register("heureDebutEvent")}
                  className={`form-control ${
                    errors.heureDebutEvent ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.heureDebutEvent?.message}
                </div>
              </div>
              {emis !== "OPC" && (
                <div className="form-group col">
                  <label htmlFor="heureAppelOPC">H. Appel OPC</label>
                  <input
                    type="time"
                    id="heureAppelOPC"
                    name="heureAppelOPC"
                    {...register("heureAppelOPC")}
                    className={`form-control ${
                      errors.heureAppelOPC ? "is-invalid" : ""
                    }`}
                    // value={currentEvenement.heureDebutEvent}
                    // onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">
                    {errors.heureAppelOPC?.message}
                  </div>
                </div>
              )}
              {emis !== "PAT" && (
                <div className="form-group col">
                  <label htmlFor="heureAppelPAT">H. Appel PAT</label>
                  <input
                    type="time"
                    id="heureAppelPAT"
                    name="heureAppelPAT"
                    {...register("heureAppelPAT")}
                    className={`form-control ${
                      errors.heureAppelPAT ? "is-invalid" : ""
                    }`}
                    // value={currentEvenement.heureDebutEvent}
                    // onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">
                    {errors.heureAppelPAT?.message}
                  </div>
                </div>
              )}
            </div>
            <div className="form-row mb-4">
              <div className="form-group col">
                <label htmlFor="nomPAT">Nom Patrouilleur</label>
                <input
                  type="text"
                  id="nomPAT"
                  name="nomPAT"
                  {...register("nomPAT")}
                  className={`form-control ${
                    errors.nomPAT ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">{errors.nomPAT?.message}</div>
              </div>
              <div className="form-group col">
                <label htmlFor="heureArriveePAT">H. Arrivée PAT</label>
                <input
                  type="time"
                  id="heureArriveePAT"
                  name="heureArriveePAT"
                  {...register("heureArriveePAT")}
                  className={`form-control ${
                    errors.heureArriveePAT ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.heureArriveePAT?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="dateheurePoseBalise">
                  Date/heure Pose Balise
                </label>
                <input
                  type="datetime-local"
                  id="dateheurePoseBalise"
                  name="dateheurePoseBalise"
                  {...register("dateheurePoseBalise")}
                  className={`form-control ${
                    errors.dateheurePoseBalise ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.dateheurePoseBalise?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="dateheureDeposeBalise">
                  Date/heure Pose Balise
                </label>
                <input
                  type="datetime-local"
                  id="dateheureDeposeBalise"
                  name="dateheureDeposeBalise"
                  {...register("dateheureDeposeBalise")}
                  className={`form-control ${
                    errors.dateheureDeposeBalise ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.dateheureDeposeBalise?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="typeBalisage">Type Balisage </label>
                <select
                  id="typeBalisage"
                  name="typeBalisage"
                  {...register("typeBalisage")}
                  className={`form-control ${
                    errors.typeBalisage ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.natureEvent}
                  // onChange={handleInputChange}
                >
                  <option value="">-Choisir TYPE-</option>
                  <option value="FIXE">FIXE</option>
                  <option value="URGENCE">URGENCE</option>
                  <option value="MOBILE">MOBILE</option>
                  <option value="URGENCE+FL">URGENCE+FL</option>
                  <option value="FIXE+FL">FIXE+FL</option>
                </select>
                <div className="invalid-feedback">
                  {errors.typeBalisage?.message}
                </div>
              </div>
            </div>
            <div className="form-row mb-4">
              <div className="form-group col">
                <label htmlFor="pkDebutBalisage">Pk Debut Balisage</label>
                <input
                  type="text"
                  id="pkDebutBalisage"
                  name="pkDebutBalisage"
                  {...register("pkDebutBalisage")}
                  className={`form-control ${
                    errors.pkDebutBalisage ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.pkDebutBalisage?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="pkFinBalisage">Pk Fin Balisage</label>
                <input
                  type="text"
                  id="pkFinBalisage"
                  name="pkFinBalisage"
                  {...register("pkFinBalisage")}
                  className={`form-control ${
                    errors.pkFinBalisage ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.pkFinBalisage?.message}
                </div>
              </div>

              <div className="form-group col">
                <label htmlFor="statutEvent">Statut Evenement</label>
                <select
                  id="statutEvent"
                  name="statutEvent"
                  {...register("statutEvent")}
                  className={`form-control ${
                    errors.statutEvent ? "is-invalid" : ""
                  }`}
                >
                  <option value="">-Choisir Statut Evenement-</option>
                  <option value="asuivre">A suivre </option>
                  <option value="reparti seul">Reparti seul</option>
                  <option value="assiste et reparti seul">
                    Assiste et Reparti Seul
                  </option>
                  <option value="remorque">Remorque</option>
                  <option value="annule">Annule</option>
                </select>
                <div className="invalid-feedback">
                  {errors.statutEvent?.message}
                </div>
              </div>
            </div>
            <div className="form-row mb-4">
              {/* <div className="form-group col">
                <label htmlFor="etatEvent">Etat Evenement</label>
                <input
                  type="text"
                  id="etatEvent"
                  name="etatEvent"
                  {...register("etatEvent")}
                  className={`form-control ${
                    errors.etatEvent ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.etatEvent?.message}
                </div>
              </div> */}
              <div className="form-group col">
                <label htmlFor="observation">Observation</label>
                <textarea
                  type="text"
                  id="observation"
                  name="observation"
                  {...register("observation")}
                  className={`form-control ${
                    errors.observation ? "is-invalid" : ""
                  }`}
                  // value={currentEvenement.heureDebutEvent}
                  // onChange={handleInputChange}
                ></textarea>
                <div className="invalid-feedback">
                  {errors.observation?.message}
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
        {/* )} */}
        {/* 
      {remorquages && (
        <TableContainer
          title={"Remorquages"}
          columns={columns}
          data={remorquages}
        />
      )}
      {
        <TableContainer
          title={"Détails Accident"}
          columns={columnsAcci}
          data={detailAccidents}
        />
      } */}

        {/* {detailAccidents && (
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups?.map((headerGroup) => (
              <tr {...headerGroup?.getHeaderGroupProps()}>
                {headerGroup?.headers?.map((column) => (
                  <th {...column?.getHeaderProps()}>
                    {column?.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows?.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row?.getRowProps()}>
                  {row?.cells?.map((cell) => {
                    return (
                      <td {...cell?.getCellProps()}>{cell?.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )} */}

        {/* <table
        className="table table-striped table-bordered"
        {...getTablePropsAcc()}
      >
        <thead>
          {headerGroupsAcc.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyPropsAcc()}>
          {rowsAcc.map((row, i) => {
            prepareRowAcc(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table> */}
      </div>
    </>
  );
};
export default AddEvenement;
