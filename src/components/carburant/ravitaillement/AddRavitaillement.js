import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ravitaillementService from "../../../services/carburant/ravitaillement/ravitaillementService";
import { formatDateYYYYMMdd } from "../../../utils/formatDate";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import vehiculeService from "../../../services/param/vehicule/vehiculeService";
import cuveService from "../../../services/carburant/cuve/cuveService";
import affectationService from "../../../services/param/affectation/affectationService";

const AddRavitaillement = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialravitaillementState = {
    id: "",
    date: "",
    heure: "",
    matriculeid: "",
    quantity: "",
    kilometrage: "",
    type: "",
    cuveid: "",
    vehicleaffectationid: "",
  };

  const [vehicules, setVehicules] = useState([]);
  const [cuves, setCuves] = useState([]);
  const [affectations, setAffectations] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const validationSchema = Yup.object().shape({
    date: Yup.date()
      .typeError("Date invalide")
      .required("date ravitaillement est obligatoire"),
    heure: Yup.string().required("Heure ravitaillement est obligatoire"),
    matriculeid: Yup.string().required("matricule est obligatoire"),
    quantity: Yup.number().typeError("Quantité invalaide"),
    kilometrage: Yup.number().typeError("kilometrage incorrect"),
    type: Yup.string().required(" Type est obligatoire"),
    vehicleaffectationid: Yup.string().required(
      " Service Affectation est obligatoire"
    ),
    cuveid: Yup.string().when("type", {
      is: (value) => value === "cuve",
      then: Yup.string().required("Cuve est obligatoire"),
      otherwise: Yup.string().notRequired(),
    }),
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
  const typeRavi = watch("type");

  const getMatriculevhl = () => {
    vehiculeService
      .getAll({})
      .then((response) => {
        const { vehicles } = response.data;
        console.log("VHL", vehicles);
        setVehicules(vehicles);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getcuveName = () => {
    cuveService
      .getAll({})
      .then((response) => {
        const { cuves } = response.data;
        console.log("cuve", cuves);
        setCuves(cuves);
      })
      .catch((e) => {
        console.log(e);
      });
  };
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
    // console.log("detail event");
    getAffectations();
    // getMatriculevhl();
    getcuveName();
  }, []);

  const getVehiculeAfectation = (e) => {
    vehiculeService
      .getVehiculeByAffectation(e.target.value)
      .then((response) => {
        console.log("aff", response.data);
        setVehicules(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);
    console.log("DATA", data);
    ravitaillementService.create(data).then(
      (response) => {
        console.log("data new", response.data);
        setMessage("Ajout ravitaillement succes");
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
            <Link to={"/carburant"}>Carburant</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={"/carburant/ravitaillements"}>Ravitaillements</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Ajout Ravitaillement
          </li>
        </ol>
      </nav>
      <div className="mt-4">
        {/* <div className="d-flex justify-content-between"> */}
        <h4 className="text-primary">Nouveau Ravitaillement</h4>
        {/* </div> */}
        <hr className="mb-4" />
        <div className="edit-form mt-4 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row mb-4">
              <div className="form-group col ">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  // value={currentravitaillement.dateEvent}
                  // onChange={handleInputChange}
                  {...register("date")}
                  className={`form-control ${errors.date ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.date?.message}</div>
              </div>
              <div className="form-group col">
                <label htmlFor="heure">Heure</label>
                <input
                  type="time"
                  id="heure"
                  name="heure"
                  {...register("heure")}
                  className={`form-control ${errors.heure ? "is-invalid" : ""}`}
                  // value={currentravitaillement.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">{errors.heure?.message}</div>
              </div>
              <div className="form-group col-sm-3">
                <label htmlFor="vehicleaffectationid">Service Affecté</label>
                <select
                  id="vehicleaffectationid"
                  name="vehicleaffectationid"
                  {...register("vehicleaffectationid")}
                  className={`form-control ${
                    errors.vehicleaffectationid ? "is-invalid" : ""
                  }`}
                  onChange={getVehiculeAfectation}
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
              <div className="form-group col">
                <label htmlFor="matriculeid">Matricule</label>
                <select
                  id="matriculeid"
                  name="matriculeid"
                  {...register("matriculeid")}
                  className={`form-control ${
                    errors.matriculeid ? "is-invalid" : ""
                  }`}
                >
                  <option value="">-Choisir Vehicule-</option>
                  {vehicules.map((vhl) => (
                    <option key={vhl.id} value={vhl.matricule}>
                      {vhl.matricule}
                    </option>
                  ))}
                  {/* {pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))} */}
                </select>
                <div className="invalid-feedback">
                  {errors.matriculeid?.message}
                </div>
              </div>
            </div>
            <div className="form-row mb-4 ">
              <div className="form-group col">
                <label htmlFor="quantity">Quantite</label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  {...register("quantity")}
                  className={`form-control ${
                    errors.quantity ? "is-invalid" : ""
                  }`}
                  // value={currentravitaillement.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.quantity?.message}
                </div>
              </div>

              <div className="form-group col">
                <label htmlFor="kilometrage">Kilometrage</label>

                <input
                  type="text"
                  id="kilometrage"
                  name="kilometrage"
                  {...register("kilometrage")}
                  className={`form-control ${
                    errors.kilometrage ? "is-invalid" : ""
                  }`}
                  // value={currentravitaillement.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.kilometrage?.message}
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="type">Type Ravitaillement </label>
                <select
                  id="type"
                  name="type"
                  {...register("type")}
                  className={`form-control ${errors.type ? "is-invalid" : ""}`}
                  // value={currentravitaillement.natureEvent}
                  // onChange={handleInputChange}
                >
                  <option value="">-Choisir Type- </option>
                  <option value="cuve">Cuve</option>
                  <option value="pompe">Pompe Station</option>
                </select>
                <div className="invalid-feedback">{errors.type?.message}</div>
              </div>
              {typeRavi === "cuve" && (
                <div className="form-group col">
                  <label htmlFor="cuveid">Cuve</label>
                  <select
                    id="cuveid"
                    name="cuveid"
                    {...register("cuveid")}
                    className={`form-control ${
                      errors.cuveid ? "is-invalid" : ""
                    }`}
                    // value={currentravitaillement.natureEvent}
                    // onChange={handleInputChange}
                  >
                    <option value="">-Choisir la cuve-</option>
                    {cuves.map((cuve) => (
                      <option key={cuve.id} value={cuve.cuveName}>
                        {cuve.cuveName}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    {errors.cuveid?.message}
                  </div>
                </div>
              )}
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
export default AddRavitaillement;
