import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import authService from "../../../services/auth/authService";
import { useTable } from "react-table";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import cuveService from "../../../services/carburant/cuve/cuveService";

const CuveList = (props) => {
  // const history = useNavigate();
  let navigate = useNavigate();

  const initialCuveState = {
    id: "",
    cuveName: "",
    quantity: "",
    indexComptor: "",
    capacity: "",
  };

  const [cuves, setCuves] = useState([]);
  const [idDelete, setIdDelete] = useState();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const cuvesRef = useRef();
  cuvesRef.current = cuves;

  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 20];

  const validationSchema = Yup.object().shape({
    cuveName: Yup.string().required("Nom Cuve est obligatoire"),
    quantity: Yup.number().typeError("Quantité invalide"),
    // .required("quantity est obligatoire"),
    indexComptor: Yup.number().typeError("Index Compteur invalide"),
    capacity: Yup.number().typeError("Quantité invalide"),
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
    //   retrievecuves();
  };
  const resetField = () => {
    Object.keys(initialCuveState).forEach((field) =>
      setValue(field, initialCuveState[field])
    );
    //   retrievecuves();
  };
  const addcuve = (data) => {
    setMessage("");
    setLoading(true);
    cuveService.create(data).then(
      (response) => {
        setCuves([response.data, ...cuves]);
        setMessage("Ajout cuve avec succes");
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
  const editecuve = (idcuve, data) => {
    setMessage("");
    setLoading(true);

    cuveService.update(idcuve, data).then(
      (response) => {
        const newcuves = cuves.map((cuve) =>
          cuve.id === response.data.id ? response.data : cuve
        );
        setCuves(newcuves);
        setMessage("Modifier cuve avec succes");
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
    const idcuve = data.id;
    idcuve ? editecuve(idcuve, data) : addcuve(data);
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

  const retrievecuves = () => {
    const params = getRequestParams(searchTitle, page, pageSize);
    console.log("params", params);

    cuveService
      .getAll(params)
      .then((response) => {
        console.log("response", response.data);
        const { cuves, totalPages } = response.data;
        setCuves(cuves);
        setCount(totalPages);

        console.log("response", response.data);
      })
      .catch((error) => {
        console.log("error", error.response.status);
        console.log("messsage", error.message);
        // if (error.response.status === 403) navigate("/401");
      });
  };

  useEffect(retrievecuves, [page, pageSize], searchTitle);

  const refreshList = () => {
    retrievecuves();
  };

  const removeAllcuves = () => {
    authService
      .removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const findByTitle = () => {
    setPage(1);
    retrievecuves();
  };

  const editcuve = (rowIndex) => {
    const cuveToEdit = cuvesRef.current[rowIndex];
    console.log("cuveToEdit", cuveToEdit);
    console.log("cuves", cuves);

    Object.keys(cuveToEdit).forEach((field) =>
      setValue(field, cuveToEdit[field])
    );
  };

  const deletecuve = () => {
    const id = cuvesRef.current[idDelete].id;

    cuveService
      .remove(id)
      .then((response) => {
        let newcuves = [...cuvesRef.current];
        newcuves.splice(idDelete, 1);
        setMessage("cuve supprimée avec succes");
        setSuccessful(true);
        setCuves(newcuves);
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
        accessor: "cuveName",
      },
      {
        Header: "Quantite",
        accessor: "quantity",
      },
      {
        Header: "Index Compteur",
        accessor: "indexComptor",
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
                onClick={() => editcuve(rowIdx)}
              >
                <i className="far fa-edit action mr-2"></i>
                {/* Gerer les cuves */}
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
      data: cuves,
    });

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/carburant"}>Carburant</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            cuves
          </li>
        </ol>
      </nav>
      <div className="list">
        <div className="col-md-12">
          <h4 className="text-primary mb-3">Ajout / Edite cuve</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-2 ">
              <div className="form-group col-sm-3">
                <label htmlFor="name">Nom Cuve</label>
                <input
                  type="text"
                  id="cuveName"
                  name="cuveName"
                  {...register("cuveName")}
                  className={`form-control ${
                    errors.cuveName ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.cuveName?.message}
                </div>
              </div>
              <div className="form-group col-sm-2">
                <label htmlFor="indexComptor">Index Compteur</label>
                <input
                  type="text"
                  id="indexComptor"
                  name="indexComptor"
                  {...register("indexComptor")}
                  className={`form-control ${
                    errors.indexComptor ? "is-invalid" : ""
                  }`}
                  // value={currentRemorquage.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.indexComptor?.message}
                </div>
              </div>

              <div className="form-group col-sm-2">
                <label htmlFor="quantity">Quantite</label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  {...register("quantity")}
                  className={`form-control ${
                    errors.quantity ? "is-invalid" : ""
                  }`}
                  // value={currentRemorquage.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.quantity?.message}
                </div>
              </div>
              <div className="form-group col-sm-2">
                <label htmlFor="capacity">Capacité</label>
                <input
                  type="text"
                  id="capacity"
                  name="capacity"
                  {...register("capacity")}
                  className={`form-control ${
                    errors.capacity ? "is-invalid" : ""
                  }`}
                  // value={currentRemorquage.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.capacity?.message}
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
          <h4 className="text-primary">Liste des cuves</h4>
          <div className="d-flex justify-content-between items-align-center my-3 ">
            {/* <Link to={"/security/cuves/add"}>
              <button className="btn btn-primary">Ouvrir cuve</button>
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
            {/* <Link to={"/security/cuves/add"}>
              <button className="btn btn-primary">Ouvrir cuve</button>
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
                <div className="modal-body">Vous allez supprimer ce cuve ?</div>
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
                    onClick={deletecuve}
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
export default CuveList;
