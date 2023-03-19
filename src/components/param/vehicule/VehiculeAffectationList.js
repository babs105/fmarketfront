import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import authService from "../../../services/auth/authService";
import { useTable } from "react-table";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import affectationService from "../../../services/param/affectation/affectationService";

const VehiculeAffectationList = (props) => {
  // const history = useNavigate();
  let navigate = useNavigate();

  const initialaffectationState = {
    id: "",
    title: "",
    details: "",
  };

  const [affectations, setAffectations] = useState([]);
  const [idDelete, setIdDelete] = useState();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const affectationsRef = useRef();
  affectationsRef.current = affectations;

  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 20];

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Nom affectation est obligatoire"),
    details: Yup.string().required("Description invalide"),
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

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    //   retrieveaffectations();
  };
  const resetField = () => {
    Object.keys(initialaffectationState).forEach((field) =>
      setValue(field, initialaffectationState[field])
    );
    //   retrieveaffectations();
  };
  const addaffectation = (data) => {
    setMessage("");
    setLoading(true);
    affectationService.create(data).then(
      (response) => {
        setAffectations([response.data, ...affectations]);
        setMessage("Ajout affectation avec succes");
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
  const editeaffectation = (idaffectation, data) => {
    setMessage("");
    setLoading(true);

    affectationService.update(idaffectation, data).then(
      (response) => {
        const newaffectations = affectations.map((affectation) =>
          affectation.id === response.data.id ? response.data : affectation
        );
        setAffectations(newaffectations);
        setMessage("Modifier affectation avec succes");
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
    console.log("data field", data);
    const idaffectation = data.id;
    idaffectation
      ? editeaffectation(idaffectation, data)
      : addaffectation(data);
  };
  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveaffectations = () => {
    const params = getRequestParams(searchTitle, page, pageSize);
    console.log("params", params);

    affectationService
      .getAll(params)
      .then((response) => {
        const { affectations, totalPages } = response.data;

        setAffectations(affectations);
        setCount(totalPages);

        console.log("response", response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveaffectations, [page, pageSize], searchTitle);

  const refreshList = () => {
    retrieveaffectations();
  };

  const removeAllaffectations = () => {
    authService
      .removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    setPage(1);
    retrieveaffectations();
  };

  const editaffectation = (rowIndex) => {
    const affectationToEdit = affectationsRef.current[rowIndex];
    console.log("affectationToEdit", affectationToEdit);
    console.log("affectations", affectations);

    Object.keys(affectationToEdit).forEach((field) =>
      setValue(field, affectationToEdit[field])
    );
  };

  const deleteaffectation = () => {
    const id = affectationsRef.current[idDelete].id;

    affectationService
      .remove(id)
      .then((response) => {
        let newaffectations = [...affectationsRef.current];
        newaffectations.splice(idDelete, 1);
        setMessage("affectation supprimée avec succes");
        setSuccessful(true);
        setAffectations(newaffectations);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
        setLoading(false);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };
  const columns = useMemo(
    () => [
      {
        Header: "Nom",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "details",
      },

      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;

          return (
            <div className="d-flex  ">
              <button
                className="btn btn-sm btn-outline-primary mr-2"
                onClick={() => editaffectation(rowIdx)}
              >
                <i className="far fa-edit action mr-2"></i>
                {/* Gerer les affectations */}
              </button>

              <button
                className="btn btn-sm  btn-outline-danger"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => setIdDelete(rowIdx)}
              >
                <i className="fas fa-trash action "></i>
              </button>
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
      data: affectations,
    });

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/paramvhl"}>Paramètrage Véhicule</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Affectations
          </li>
        </ol>
      </nav>
      <div className="list">
        <div className="col-md-12">
          <h4 className="text-primary mb-3">Ajout / Edite affectation</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-2 ">
              <div className="form-group col-sm-3">
                <label htmlFor="title">Nom Service</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  {...register("title")}
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.title?.message}</div>
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="details">Description</label>
                <input
                  type="text"
                  id="details"
                  name="details"
                  {...register("details")}
                  className={`form-control ${
                    errors.details ? "is-invalid" : ""
                  }`}
                  // value={currentRemorquage.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.details?.message}
                </div>
              </div>

              <div className="d-flex flex-column justify-content-center items-align-center col-sm-3">
                <div className="d-flex justify-content-center mt-2 ">
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
                    onClick={resetField}
                    className="btn btn-warning "
                  >
                    Effacer
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-12 list my-4">
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
          <h4 className="text-primary">Liste des affectations</h4>
          <div className="d-flex justify-content-between items-align-center my-3 ">
            {/* <Link to={"/security/affectations/add"}>
              <button className="btn btn-primary">Ouvrir affectation</button>
            </Link> */}
            <div>
              {"Nombre par page: "}
              <select onChange={handlePageSizeChange} value={pageSize}>
                {pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-sm-6 p-0">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mot Clé"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={findByTitle}
                  >
                    Rechercher
                  </button>
                </div>
              </div>
            </div>
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
          <div className="d-flex justify-content-center items-align-center my-3 ">
            <Pagination
              className=""
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              color="primary"
              shape="rounded"
              onChange={handlePageChange}
            />
            {/* <Link to={"/security/affectations/add"}>
              <button className="btn btn-primary">Ouvrir affectation</button>
            </Link> */}
          </div>
          <div
            className="modal fade"
            id="exampleModal"
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
                  Vous allez supprimer affectation ?
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
                    onClick={deleteaffectation}
                    className="btn btn-danger"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VehiculeAffectationList;
