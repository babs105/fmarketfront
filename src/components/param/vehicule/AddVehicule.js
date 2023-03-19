import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import vehiculeService from "../../../services/param/vehicule/vehiculeService";
import { formatDateYYYYMMdd } from "../../../utils/formatDate";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useTable } from "react-table";
import TableContainer from "../../TableContainer";
import affectationService from "../../../services/param/affectation/affectationService";

const AddVehicule = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialvehiculeState = {
    id: "",
    matricule: "",
    acquisitionDate: "",
    kilometrageActuel: "",
    fuelCapacity: "",
    vehicleaffectationid: "",
  };

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [affectations, setAffectations] = useState([]);
  const [successful, setSuccessful] = useState(false);

  const validationSchema = Yup.object().shape({
    acquisitionDate: Yup.date()
      .typeError("Date invalide")
      .required("date  est obligatoire"),
    matricule: Yup.string().required("Matricule est obligatoire"),
    kilometrageActuel: Yup.number().typeError("Kilometrage invalide"),
    fuelCapacity: Yup.number().typeError("Capacité invalide"),
    vehicleaffectationid: Yup.string().required("Affectation est obligatoire"),
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
  const getAffectations = () => {
    affectationService
      .getAllAffectations()
      .then((response) => {
        console.log("aff", response.data);
        setAffectations(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getAffectations();
  }, []);

  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);
    console.log("DATA", data);
    vehiculeService.create(data).then(
      (response) => {
        console.log("data new", response.data);
        setMessage("Ajout vehicule succes");
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
            <Link to={"/paramvhl"}>Paramètrage Véhicules</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={"/paramvhl/vehicules"}>Véhicules</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Ajout Véhicule
          </li>
        </ol>
      </nav>
      <div className="mt-4">
        {/* <div className="d-flex justify-content-between"> */}
        <h4 className="text-primary">Nouveau Véhicule</h4>
        {/* </div> */}
        <hr className="mb-4" />
        <div className="edit-form mt-4 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row mb-4">
              <div className="form-group col ">
                <label htmlFor="acquisitionDate">Date Acquisition</label>
                <input
                  type="date"
                  id="acquisitionDate"
                  name="acquisitionDate"
                  {...register("acquisitionDate")}
                  className={`form-control ${
                    errors.acquisitionDate ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.acquisitionDate?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="matricule">Matricule</label>
                <input
                  type="text"
                  id="matricule"
                  name="matricule"
                  {...register("matricule")}
                  className={`form-control ${
                    errors.matricule ? "is-invalid" : ""
                  }`}
                  // value={currentvehicule.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.matricule?.message}
                </div>
              </div>

              <div className="form-group col">
                <label htmlFor="kilometrageActuel">kilometrage Actuel</label>
                <input
                  type="text"
                  id="kilometrageActuel"
                  name="kilometrageActuel"
                  {...register("kilometrageActuel")}
                  className={`form-control ${
                    errors.kilometrageActuel ? "is-invalid" : ""
                  }`}
                  // value={currentvehicule.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.kilometrageActuel?.message}
                </div>
              </div>
            </div>
            <div className="form-row mb-4 ">
              <div className="form-group col-sm-4">
                <label htmlFor="fuelCapacity">Capacité réservoir</label>
                <input
                  type="text"
                  id="fuelCapacity"
                  name="fuelCapacity"
                  {...register("fuelCapacity")}
                  className={`form-control ${
                    errors.fuelCapacity ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.fuelCapacity?.message}
                </div>
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="vehicleaffectationid">Service Affecté</label>
                <select
                  id="vehicleaffectationid"
                  name="vehicleaffectationid"
                  {...register("vehicleaffectationid")}
                  className={`form-control ${
                    errors.vehicleaffectationid ? "is-invalid" : ""
                  }`}
                >
                  <option value="">-Choisir Service Affectation-</option>
                  {affectations?.map((affectation) => (
                    <option key={affectation.id} value={affectation.title}>
                      {affectation.title}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">
                  {errors.vehicleaffectationid?.message}
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
export default AddVehicule;
