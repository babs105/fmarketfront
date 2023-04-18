import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import evenementService from "../../../services/trace/evenement/evenementService";
import TableContainer from "../../TableContainer";
import Pagination from "@material-ui/lab/Pagination";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { formatDateDDmmyyyy } from "../../../utils/formatDate";

const SearchEvenement = (props) => {
  //   const { id } = useParams();
  let navigate = useNavigate();
  const seachEventState = {
    dateEvent: null,
    natureEvent: null,
    causeEvent: null,
    typeVehicule: null,
    matVehicule: null,
    pkEvent: null,
    sens: null,
    voie: null,
    secteur: null,
    emisPar: null,
    statutEvent: null,
  };

  const [message, setMessage] = useState("");
  const [seachEventField, setSeachEventField] = useState(null);
  const [evenements, setevenements] = useState([]);
  const [idDelete, setIdDelete] = useState();
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const evenementsRef = useRef();
  evenementsRef.current = evenements;

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 20];

  const validationSchema = Yup.object().shape({
    dateEvent: Yup.string().notRequired().nullable(),
    natureEvent: Yup.string().notRequired().nullable(),
    causeEvent: Yup.string().notRequired().nullable(),
    typeVehicule: Yup.string().notRequired().nullable(),
    matVehicule: Yup.string().notRequired().nullable(),
    pkEvent: Yup.string().notRequired().nullable(),
    sens: Yup.string().notRequired().nullable(),
    voie: Yup.string().notRequired().nullable(),
    secteur: Yup.string().notRequired().nullable(),
    emisPar: Yup.string().notRequired().nullable(),
    statutEvent: Yup.string().notRequired().nullable(),
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
    setevenements([]);
    Object.keys(seachEventState).forEach((field) => setValue(field, null));
  };

  useEffect(() => {
    // setValue("dateRom", null);
    setUpSearchFieldToNull();
  }, []);

  useEffect(() => {
    seachEventField && retrieveevenements(seachEventField);
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
  const retrieveevenements = (data) => {
    const params = getRequestParams(page, pageSize);
    console.log("params", params);
    console.log("data", data);
    const request = { ...data, ...params };
    console.log("request", request);

    setMessage("");
    setLoading(true);
    if (request.statutEvent === "") request.statutEvent = null;
    if (request.secteur === "") request.secteur = null;
    if (request.lieuDepot === "") request.lieuDepot = null;
    seachEventField(request);
    evenementService.search(request).then(
      (response) => {
        console.log("data new", response.data);
        const { evenements, totalPages } = response.data;
        setevenements(evenements);
        setCount(totalPages);
        // setMessage("Ajout evenement succes");
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
    retrieveevenements(data);
  };
  const openevenement = (rowIndex) => {
    const id = evenementsRef.current[rowIndex].id;
    console.log("id rom :", id);
    navigate("/trace/event/evenement/edit/" + id);
  };
  const deleteevenement = () => {
    setMessage("");
    const id = evenementsRef.current[idDelete].id;
    console.log("Id", id);
    evenementService
      .remove(id)
      .then((response) => {
        // navigate("/trace/evenements");

        let newevenements = [...evenementsRef.current];
        newevenements.splice(idDelete, 1);

        // setEvenement({ ...evenement, evenements: newevenements });
        setevenements(newevenements);
        setMessage("detail evenement Supprimé");
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
      dateEvent,
      natureEvent,
      causeEvent,
      typeVehicule,
      matVehicule,
      pkEvent,
      sens,
      voie,
      secteur,
      emisPar,
      statutEvent,
    } = seachEventField;
    const res = {
      dateEvent,
      natureEvent,
      causeEvent,
      typeVehicule,
      matVehicule,
      pkEvent,
      sens,
      voie,
      secteur,
      emisPar,
      statutEvent,
    };

    console.log("field", res);
    evenementService
      .genererExcel(res)
      .then((response) => {
        var date = new Date();
        var filename = `evenements-${date.getDay()}-${
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
        accessor: "dateEvent",
        Cell: (props) => {
          return formatDateDDmmyyyy(new Date(props?.value));
        },
      },

      {
        Header: "Nature",
        accessor: "natureEvent",
      },
      {
        Header: "Cause",
        accessor: "causeEvent",
      },
      {
        Header: "Emis Par",
        accessor: "emisPar",
      },
      {
        Header: "Categorie",
        accessor: "typeVehicule",
      },
      {
        Header: "Mat.Vehicule",
        accessor: "matVehicule",
      },

      {
        Header: "Localisation",
        accessor: "localisation",
      },
      {
        Header: "Statut",
        accessor: "statutEvent",
      },
      // {
      //   Header: "Sens",
      //   accessor: "heureArriveeROM",
      // },
      // //   {
      // //     Header: "Lieu Depart",
      // //     accessor: "lieuDepart",
      // //   },
      // {
      //   Header: " Duree Interv",
      //   accessor: "dureeIntervention",
      // },
      // {
      //   Header: " Lieu Depot",
      //   accessor: "lieuDepot",
      // },

      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props?.row?.id;
          return (
            <div>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => openevenement(rowIdx)}
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
      data: evenements,
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
            Recherche evenement
          </li>
        </ol>
      </nav>
      <div className="mt-4">
        <div className="d-flex justify-content-between">
          <h4 className="text-primary">Rechercher evenement</h4>
        </div>
        <hr className="mb-4" />
        <div className="edit-form ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row mb-4">
              <div className="form-group  col-sm-3">
                <label htmlFor="dateRom">Date Evenement </label>
                <input
                  type="date"
                  id="dateEvent"
                  name="dateEvent"
                  // value={currentevenement.dateEvent}
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
              <div className="form-group  col-sm-3">
                <label htmlFor="matVehicule">Matricule Véhicule</label>
                <input
                  type="text"
                  id="matVehicule"
                  name="matVehicule"
                  {...register("matVehicule")}
                  className={`form-control ${
                    errors.matVehicule ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.matVehicule?.message}
                </div>
              </div>
              <div className="form-group  col-sm-2">
                <label htmlFor="pkEvent">Pka </label>
                <input
                  type="text"
                  id="pkEvent"
                  name="pkEvent"
                  {...register("pkEvent")}
                  className={`form-control ${
                    errors.pkEvent ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.pkEvent?.message}
                </div>
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
                  // value={currentevenement.natureEvent}
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
                  // value={currentevenement.heureDebutEvent}
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
                <label htmlFor="lieuDepot">Lieu de Dépot</label>
                <select
                  id="lieuDepot"
                  name="lieuDepot"
                  {...register("lieuDepot")}
                  className={`form-control ${
                    errors.lieuDepot ? "is-invalid" : ""
                  }`}
                >
                  <option value=""> -Choisir Lieu de Dépot- </option>
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
                <label htmlFor="statutRom">Statut evenement </label>
                <select
                  id="statutRom"
                  name="statutRom"
                  {...register("statutRom")}
                  className={`form-control ${
                    errors.statutRom ? "is-invalid" : ""
                  }`}
                >
                  <option value="">-Choisir Statut evenement-</option>
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
      {evenements?.length > 0 ? (
        <div className="">
          <h5 className="text-primary card-title ">evenements</h5>
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
              Vous allez supprimer les informations de evenement ?
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
                onClick={deleteevenement}
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
export default SearchEvenement;
