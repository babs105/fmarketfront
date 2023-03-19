import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import evenementReportervice from "../../../../services/report/trace/evenementReportService";
import TableContainer from "../../../TableContainer";
import Pagination from "@material-ui/lab/Pagination";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { formatDateDDmmyyyy } from "../../../../utils/formatDate";

const EvenementReport = (props) => {
  //   const { id } = useParams();
  let navigate = useNavigate();
  const seachRomState = {
    dateDebut: null,
    dateFin: null,
    secteur: null,
  };

  const [message, setMessage] = useState("");
  const [seachRomField, setSeachRomField] = useState(null);
  const [evenementReport, setevenementReport] = useState([]);
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const evenementReportRef = useRef();
  evenementReportRef.current = evenementReport;

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 20];

  const validationSchema = Yup.object().shape({
    dateDebut: Yup.string().notRequired().nullable(),
    dateFin: Yup.string().notRequired().nullable(),
    secteur: Yup.string().notRequired().nullable(),
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
    setevenementReport([]);
    Object.keys(seachRomState).forEach((field) => setValue(field, null));
  };

  useEffect(() => {
    // setValue("dateRom", null);
    setUpSearchFieldToNull();
  }, []);

  useEffect(() => {
    seachRomField && retrieveevenementReport(seachRomField);
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
  const retrieveevenementReport = (data) => {
    const params = getRequestParams(page, pageSize);
    console.log("params", params);
    console.log("data", data);
    const request = { ...data, ...params };
    console.log("request", request);

    setMessage("");
    setLoading(true);

    if (request.secteur === "") request.secteur = null;

    setSeachRomField(request);
    evenementReportervice.search(request).then(
      (response) => {
        console.log("data new", response.data);
        const { evenementReports, totalPages, totalItems } = response.data;
        setevenementReport(evenementReports);
        setCount(totalPages);
        setItems(totalItems);
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
    retrieveevenementReport(data);
  };

  const genererExcel = () => {
    console.log("test");
    const { dateDebut, dateFin, secteur } = seachRomField;
    const res = {
      dateDebut,
      dateFin,
      secteur,
    };

    console.log("field", res);
    evenementReportervice
      .genererExcel(res)
      .then((response) => {
        var date = new Date();
        var filename = `Rapportevenment-${date.getDay()}-${
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
        Header: "H.Debut",
        accessor: "heureDebutEvent",
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
        Header: "Matr.Vehicule",
        accessor: "matVehicule",
      },
      {
        Header: "Localisation",
        accessor: "localisation",
      },
      {
        Header: "Emis Par",
        accessor: "emisPar",
      },
      {
        Header: "Heure Appel OPC",
        accessor: "heureAppelOPC",
      },
      {
        Header: "Heure Appel PAT",
        accessor: "heureAppelPAT",
      },
      {
        Header: "H.Arrivee PAT",
        accessor: "heureArriveePAT",
      },
      {
        Header: "Statut",
        accessor: "statutEvent",
      },

      //   {
      //     Header: "Actions",
      //     accessor: "actions",
      //     Cell: (props) => {
      //       const rowIdx = props?.row?.id;
      //       return (
      //         <div>
      //           <span
      //             style={{ cursor: "pointer" }}
      //             onClick={() => openRemorquage(rowIdx)}
      //           >
      //             <i className="far fa-edit action mr-2 text-info"></i>
      //           </span>

      //           <span
      //             style={{ cursor: "pointer" }}
      //             data-toggle="modal"
      //             data-target="#modalRemorque"
      //             onClick={() => setIdDelete(rowIdx)}
      //           >
      //             <i className="fas fa-trash action text-danger"></i>
      //           </span>
      //         </div>
      //       );
      //     },
      //   },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: evenementReport,
    });

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/report/trace"}>Rapport Tracé</Link>
          </li>
          {/* <li className="breadcrumb-item">
            <Link to={"/trace/evenements"}>Evénèments</Link>
          </li> */}

          <li className="breadcrumb-item active" aria-current="page">
            Evenement
          </li>
        </ol>
      </nav>
      <div className="mt-4">
        <div className="d-flex justify-content-between">
          <h4 className="text-primary">Rapport d'évènement</h4>
        </div>
        <hr className="mb-4" />
        <div className="edit-form ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row mb-4">
              <div className="form-group  col-sm-3">
                <label htmlFor="dateDebut">Date Début </label>
                <input
                  type="date"
                  id="dateDebut"
                  name="dateDebut"
                  {...register("dateDebut")}
                  className={`form-control ${
                    errors.dateDebut ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.dateDebut?.message}
                </div>
              </div>
              <div className="form-group  col-sm-3">
                <label htmlFor="dateFin">Date Fin </label>
                <input
                  type="date"
                  id="dateFin"
                  name="dateFin"
                  // value={currentRemorquage.dateEvent}
                  // onChange={handleInputChange}
                  {...register("dateFin")}
                  className={`form-control ${
                    errors.dateFin ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.dateFin?.message}
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
            </div>

            {/* <div className="form-row mb-4"></div>

            <div className="form-row mb-4"></div> */}

            <div className="d-flex justify-content-center  m-4">
              <button
                type="submit"
                className="btn btn-primary mr-3"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Générer</span>
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
          <span className="mb-3"> Total Resultat:{items}</span>
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
      {evenementReport?.length > 0 ? (
        <div className="">
          <h5 className="text-primary card-title ">Evénèments</h5>
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
      {/* <div
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
      </div> */}
    </>
  );
};
export default EvenementReport;
