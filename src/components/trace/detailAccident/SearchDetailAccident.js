import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import detailAccidentService from "../../../services/trace/detailService/detailAccidentService";
import { useTable } from "react-table";
import { formatDateYYYYMMdd } from "../../../utils/formatDate";
import { useForm } from "react-hook-form";
import Pagination from "@material-ui/lab/Pagination";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { formatDateDDmmyyyy } from "../../../utils/formatDate";

function SearchDetailAccident() {
  let navigate = useNavigate();
  const seachAccidentState = {
    dateAcci: null,
    pka: null,
    secteur: null,
    matriculeVhlImplique: null,
    typeVhlImplique: null,
    causeAccident: null,
    typeAccident: null,
    nbreBlesseLeger: null,
    nbreBlesseGrave: null,
    nbreMort: null,
  };

  const [message, setMessage] = useState("");
  const [seachAccidentField, setSeachAccidentField] = useState(null);
  const [detailAccidents, setDetailAccidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const detailAccidentsRef = useRef();
  detailAccidentsRef.current = detailAccidents;

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 20];

  const validationSchema = Yup.object().shape({
    dateAcci: Yup.string().notRequired().nullable(),
    matriculeVhlImplique: Yup.string().notRequired().nullable(),
    typeVhlImplique: Yup.string().notRequired().nullable(),
    causeAccident: Yup.string().notRequired().nullable(),
    typeAccident: Yup.string().notRequired().nullable(),
    nbreBlesseLeger: Yup.string().notRequired().nullable(),
    nbreBlesseGrave: Yup.string().notRequired().nullable(),
    nbreMort: Yup.string().notRequired().nullable(),
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

  const setUpSearchFieldToNull = () => {
    setDetailAccidents([]);
    Object.keys(seachAccidentState).forEach((field) => setValue(field, null));
  };

  useEffect(() => {
    // setValue("dateRom", null);
    setUpSearchFieldToNull();
  }, []);

  useEffect(() => {
    seachAccidentField && retrieveDetailAccidents(seachAccidentField);
  }, [page, pageSize]);

  const getRequestParams = (page, pageSize) => {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const handlePageChange = (event, value) => {
    console.log("page", value);
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };
  const retrieveDetailAccidents = (data) => {
    const params = getRequestParams(page, pageSize);
    console.log("params", params);
    console.log("data", data);
    const request = { ...data, ...params };
    console.log("request", request);

    setMessage("");
    setLoading(true);
    if (request.typeAccident === "") request.typeAccident = null;
    if (request.secteur === "") request.secteur = null;

    setSeachAccidentField(request);
    detailAccidentService.search(request).then(
      (response) => {
        console.log("data new", response.data);
        const { detailAccidents, totalPages } = response.data;
        setDetailAccidents(detailAccidents);
        setCount(totalPages);
        // setMessage("Ajout Remorquage succes");
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

  const onSubmit = (data) => {
    console.log("DATA", data);
    setPage(1);
    retrieveDetailAccidents(data);
  };
  const openDetailAccident = (rowIndex) => {
    const id = detailAccidentsRef.current[rowIndex].id;
    console.log("id acci:", id);
    navigate("/trace/event/detailaccident/edit/" + id);
  };
  const deleteDetailAccident = () => {
    const idacci = detailAccidentsRef.current[idDelete].id;
    setMessage("");

    detailAccidentService
      .remove(idacci)
      .then((response) => {
        let newaccidents = [...detailAccidentsRef.current];
        newaccidents.splice(idDelete, 1);
        setDetailAccidents({ ...newaccidents });
        setMessage("Detail Accident Supprime");
        setSuccessful(true);
      })
      .catch((e) => {
        console.log(e.toString());
        setMessage(e.message);
        setSuccessful(false);
      });
  };
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "dateAcci",
        Cell: (props) => {
          return formatDateDDmmyyyy(new Date(props?.value));
        },
      },
      {
        Header: "Mat.Vehicules Impliques",
        accessor: "matriculeVhlImplique",
      },
      {
        Header: "Cat.Vehicules",
        accessor: "typeVhlImplique",
      },
      {
        Header: "Cause Accident",
        accessor: "causeAccident",
      },
      {
        Header: "Type Accident",
        accessor: "typeAccident",
      },
      {
        Header: "Blesse Leger",
        accessor: "nbreBlesseLeger",
      },
      {
        Header: "Blesse Grave",
        accessor: "nbreBlesseGrave",
      },
      {
        Header: "Mort",
        accessor: "nbreMort",
      },

      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => openDetailAccident(rowIdx)}
              >
                <i className="far fa-edit action mr-2 text-info"></i>
              </span>
              {/* 
              <span
                style={{ cursor: "pointer" }}
                onClick={() => deleteDetailAccident(rowIdx)}
              >
                <i className="fas fa-trash action text-danger"></i>
              </span> */}
              <span
                style={{ cursor: "pointer" }}
                data-toggle="modal"
                data-target="#modalAccident"
                onClick={() => setIdDelete(rowIdx)}
              >
                <i className="fas fa-trash action text-danger"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: detailAccidents,
    });
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/trace"}>Le Tracé</Link>
          </li>
          <li className="breadcrumb-item active">Recherche Detail Accident</li>
        </ol>
      </nav>
      <div className="d-flex justify-content-between">
        <h4 className="text-primary"> Détail Accident</h4>
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
              <div className="invalid-feedback">{errors.dateAcci?.message}</div>
            </div>
            <div className="form-group  col-sm-2">
              <label htmlFor="pka">Pka </label>
              <input
                type="text"
                id="pka"
                name="pka"
                {...register("pka")}
                className={`form-control ${errors.pka ? "is-invalid" : ""}`}
                // value={currentRemorquage.heureDebutEvent}
                // onChange={handleInputChange}
              />
              <div className="invalid-feedback">{errors.pka?.message}</div>
            </div>
            <div className="form-group col-sm-2">
              <label htmlFor="secteur">Secteur </label>
              <select
                id="secteur"
                name="secteur"
                {...register("secteur")}
                className={`form-control ${errors.secteur ? "is-invalid" : ""}`}
              >
                <option value="">-Choisir Secteur-</option>
                <option value="AMT">AMT</option>
                <option value="TT">TT</option>
              </select>
              <div className="invalid-feedback">{errors.secteur?.message}</div>
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
              <div className="invalid-feedback">{errors.nbreMort?.message}</div>
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
              <span>Rechercher</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setUpSearchFieldToNull();
              }}
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
      {detailAccidents?.length > 0 ? (
        <div className="">
          <h5 className="text-primary card-title ">Détail Accident</h5>
          <div className="d-flex justify-content-between ">
            <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              color="primary"
              shape="rounded"
              onChange={handlePageChange}
            />
            {/* <Link to={"/trace/evenements/add"}>
              <button className="btn btn-primary">Ouvrir Evenement</button>
            </Link> */}
          </div>
          <table
            className="table table-sm table-striped table-bordered"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
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
          </table>
        </div>
      ) : (
        <h4 className="text-center text-primary">AUCUN RÉSULTAT TROUVE</h4>
      )}
      <div
        className="modal fade"
        id="modalAccident"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Confirmation
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Vous allez supprimer les details accidents ?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Annuler
              </button>
              <button
                type="button"
                data-dismiss="modal"
                onClick={deleteDetailAccident}
                className="btn btn-danger"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchDetailAccident;
