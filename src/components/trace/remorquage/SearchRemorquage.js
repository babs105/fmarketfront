import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import remorquageService from "../../../services/trace/remorque/remorquageService";
import TableContainer from "../../TableContainer";
import Pagination from "@material-ui/lab/Pagination";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { formatDateDDmmyyyy } from "../../../utils/formatDate";

const SearchRemorquage = (props) => {
  //   const { id } = useParams();
  let navigate = useNavigate();
  const seachRomState = {
    eventid: null,
    dateRom: null,
    matVhlRemorque: null,
    catVhlRemorque: null,
    nomROM: null,
    matriculeDep: null,
    pka: null,
    secteur: null,
    lieuDepart: null,
    lieuDepot: null,
    statutRom: null,
  };

  const [message, setMessage] = useState("");
  const [seachRomField, setSeachRomField] = useState(null);
  const [remorquages, setRemorquages] = useState([]);
  const [idDelete, setIdDelete] = useState();
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const remorquagesRef = useRef();
  remorquagesRef.current = remorquages;

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 20];

  const validationSchema = Yup.object().shape({
    dateRom: Yup.string().notRequired().nullable(),
    matVhlRemorque: Yup.string().notRequired().nullable(),
    catVhlRemorque: Yup.string().notRequired().nullable(),
    nomROM: Yup.string().notRequired().nullable(),
    pka: Yup.string().notRequired().nullable(),
    secteur: Yup.string().notRequired().nullable(),
    matriculeDep: Yup.string().notRequired().nullable(),
    lieuDepart: Yup.string().notRequired().nullable(),
    lieuDepot: Yup.string().notRequired().nullable(),
    statutRom: Yup.string().notRequired().nullable(),
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
    setRemorquages([]);
    Object.keys(seachRomState).forEach((field) => setValue(field, null));
  };

  useEffect(() => {
    // setValue("dateRom", null);
    setUpSearchFieldToNull();
  }, []);

  useEffect(() => {
    seachRomField && retrieveRemorquages(seachRomField);
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
  const retrieveRemorquages = (data) => {
    const params = getRequestParams(page, pageSize);
    console.log("params", params);
    console.log("data", data);
    const request = { ...data, ...params };
    console.log("request", request);

    setMessage("");
    setLoading(true);
    if (request.statutRom === "") request.statutRom = null;
    if (request.secteur === "") request.secteur = null;
    if (request.lieuDepot === "") request.lieuDepot = null;
    setSeachRomField(request);
    remorquageService.search(request).then(
      (response) => {
        console.log("data new", response.data);
        const { remorquages, totalPages } = response.data;
        setRemorquages(remorquages);
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
    retrieveRemorquages(data);
  };
  const openRemorquage = (rowIndex) => {
    const id = remorquagesRef.current[rowIndex].id;
    console.log("id rom :", id);
    navigate("/trace/event/remorquage/edit/" + id);
  };
  const deleteRemorquage = () => {
    setMessage("");
    const id = remorquagesRef.current[idDelete].id;
    console.log("Id", id);
    remorquageService
      .remove(id)
      .then((response) => {
        // navigate("/trace/evenements");

        let newremorquages = [...remorquagesRef.current];
        newremorquages.splice(idDelete, 1);

        // setEvenement({ ...evenement, remorquages: newremorquages });
        setRemorquages(newremorquages);
        setMessage("detail Remorquage Supprimé");
        setSuccessful(true);
      })
      .catch((e) => {
        console.log(e);
        setMessage(e.toString());
        setSuccessful(false);
      });
  };
  const genererExcel = () => {
    console.log("test");
    const {
      dateRom,
      matVhlRemorque,
      catVhlRemorque,
      nomROM,
      matriculeDep,
      pka,
      secteur,
      lieuDepart,
      lieuDepot,
      statutRom,
    } = seachRomField;
    const res = {
      dateRom,
      matVhlRemorque,
      catVhlRemorque,
      nomROM,
      matriculeDep,
      pka,
      secteur,
      lieuDepart,
      lieuDepot,
      statutRom,
    };

    console.log("field", res);
    remorquageService
      .genererExcel(res)
      .then((response) => {
        var date = new Date();
        var filename = `Remorquages-${date.getDay()}-${
          date.getMonth() + 1
        }-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
        var url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;",
          })
        );
        var a = document.createElement("a");
        a.href = url;
        a.download = filename + ".xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "dateRom",
        Cell: (props) => {
          return formatDateDDmmyyyy(new Date(props?.value));
        },
      },
      {
        Header: "Mat.Vehicule",
        accessor: "matVhlRemorque",
      },
      {
        Header: "Cat.Vhl",
        accessor: "catVhlRemorque",
      },
      {
        Header: "H.Appel Depanneur",
        accessor: "heureAppelROM",
      },
      {
        Header: "Remorqueur",
        accessor: "nomROM",
      },
      {
        Header: "Mat.Depanneur",
        accessor: "matriculeDep",
      },
      {
        Header: "H.Depart",
        accessor: "heureDepartROM",
      },
      {
        Header: "H.Arrivee",
        accessor: "heureArriveeROM",
      },
      //   {
      //     Header: "Lieu Depart",
      //     accessor: "lieuDepart",
      //   },
      {
        Header: " Duree Interv",
        accessor: "dureeIntervention",
      },
      {
        Header: " Lieu Depot",
        accessor: "lieuDepot",
      },

      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props?.row?.id;
          return (
            <div>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => openRemorquage(rowIdx)}
              >
                <i className="far fa-edit action mr-2 text-info"></i>
              </span>

              <span
                style={{ cursor: "pointer" }}
                data-toggle="modal"
                data-target="#modalRemorque"
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
      data: remorquages,
    });

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/trace"}>Le Tracé</Link>
          </li>
          {/* <li className="breadcrumb-item">
            <Link to={"/trace/evenements"}>Evénèments</Link>
          </li> */}

          <li className="breadcrumb-item active" aria-current="page">
            Recherche Remorquage
          </li>
        </ol>
      </nav>
      <div className="mt-4">
        <div className="d-flex justify-content-between">
          <h4 className="text-primary">Rechercher Remorquage</h4>
        </div>
        <hr className="mb-4" />
        <div className="edit-form ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row mb-4">
              <div className="form-group  col-sm-3">
                <label htmlFor="dateRom">Date de Remorquage </label>
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
              <div className="form-group  col-sm-3">
                <label htmlFor="matVhlRemorque">Matricule Véhicule</label>
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
                  className={`form-control ${
                    errors.secteur ? "is-invalid" : ""
                  }`}
                >
                  <option value="">-Choisir Secteur-</option>
                  <option value="AMT">AMT</option>
                  <option value="TT">TT</option>
                </select>
                <div className="invalid-feedback">
                  {errors.secteur?.message}
                </div>
              </div>
              <div className="form-group  col-sm-2">
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
              <div className="form-group col-sm-4">
                <label htmlFor="nomROM">Nom Remorqueur</label>
                <input
                  type="text"
                  id="nomROM"
                  name="nomROM"
                  {...register("nomROM")}
                  className={`form-control ${
                    errors.nomROM ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.nomROM?.message}</div>
              </div>

              <div className="form-group col-sm-4 ">
                <label htmlFor="matriculeDep">Matricule Depanneur</label>
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
              <div className="form-group col-sm-4">
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
            </div>

            <div className="form-row mb-4">
              <div className="form-group col-sm-4">
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
              <div className="form-group col-sm-4">
                <label htmlFor="statutRom">Statut Remorquage </label>
                <select
                  id="statutRom"
                  name="statutRom"
                  {...register("statutRom")}
                  className={`form-control ${
                    errors.statutRom ? "is-invalid" : ""
                  }`}
                >
                  <option value="">-Choisir Statut remorquage-</option>
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
                <span>Rechercher</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setUpSearchFieldToNull();
                }}
                className="btn btn-warning float-right"
              >
                Effacer
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
      {remorquages?.length > 0 ? (
        <div className="">
          <h5 className="text-primary card-title ">Remorquages</h5>
          <div className="d-flex justify-content-between items-align-center my-3">
            <Pagination
              //   className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              color="primary"
              shape="rounded"
              onChange={handlePageChange}
            />
            <div>
              <button onClick={genererExcel} className="btn btn-success">
                Exporter
              </button>
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
        </div>
      ) : (
        <h4 className="text-center text-primary">AUCUN RÉSULTAT TROUVE</h4>
      )}
      <div
        className="modal fade"
        id="modalRemorque"
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
              Vous allez supprimer les informations de remorquage ?
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
                onClick={deleteRemorquage}
                className="btn btn-danger"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchRemorquage;
