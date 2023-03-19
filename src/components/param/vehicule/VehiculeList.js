import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import vehiculeService from "../../../services/param/vehicule/vehiculeService";
import { useTable } from "react-table";
import { formatDateDDmmyyyy } from "../../../utils/formatDate";
import Vehicule from "./Vehicule";

const VehiculeList = (props) => {
  // const history = useNavigate();
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [vehicules, setVehicules] = useState([]);
  const [idDelete, setIdDelete] = useState();

  const vehiculesRef = useRef();
  vehiculesRef.current = vehicules;

  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 20];

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    //   retrievevehicules();
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

  const retrievevehicules = () => {
    const params = getRequestParams(searchTitle, page, pageSize);
    console.log("params", params);

    vehiculeService
      .getAll(params)
      .then((response) => {
        const { vehicles, totalPages } = response.data;
        console.log("VHL", vehicles);
        setVehicules(vehicles);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrievevehicules, [page, pageSize], searchTitle);

  const refreshList = () => {
    retrievevehicules();
  };

  const removeAllvehicules = () => {
    vehiculeService
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
    retrievevehicules();
  };

  const openvehicule = (rowIndex) => {
    const id = vehiculesRef.current[rowIndex].id;

    navigate("/paramvhl/vehicules/" + id);
  };

  const deletevehicule = () => {
    const id = vehiculesRef.current[idDelete].id;

    vehiculeService
      .remove(id)
      .then((response) => {
        let newvehicules = [...vehiculesRef.current];
        newvehicules.splice(idDelete, 1);

        setVehicules(newvehicules);
        setMessage("Vehicule supprimé avec succes");
        setSuccessful(true);
      })
      .catch((e) => {
        console.log(e);
        setMessage("error Vehicule  non supprimé ");
        setSuccessful(false);
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
      // {
      //   Header: "Date",
      //   accessor: "dateEvent",
      //   Cell: (props) => {
      //     return formatDateDDmmyyyy(new Date(props?.value));
      //   },
      // },
      {
        Header: "Matricule",
        accessor: "matricule",
      },
      {
        Header: "Kilomètrage",
        accessor: "kilometrageActuel",
      },
      {
        Header: "Service/Affectation",
        accessor: "vehicleaffectationid",
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
                onClick={() => openvehicule(rowIdx)}
              >
                <i className="far fa-edit action mr-2 text-info"></i>
              </span>

              <span
                style={{ cursor: "pointer" }}
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => {
                  setIdDelete(rowIdx);
                }}
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
      data: vehicules,
    });

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/paramvhl"}>Paramètrage Véhicule</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Véhicules
          </li>
        </ol>
      </nav>
      <div className="list mt-4">
        <div className="col-md-12">
          <div className="input-group mb-3">
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
        <div className="col-md-12 list mt-4">
          <div className="d-flex justify-content-between mt-4">
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
          </div>
          <div className="d-flex justify-content-between mt-4">
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
            <Link to={"/paramvhl/vehicules/add"}>
              <button className="btn btn-primary">Ajout Véhicule</button>
            </Link>
          </div>
          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                cuve="alert"
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
                Vous allez supprimer ce véhicule ?
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
                  onClick={deletevehicule}
                  className="btn btn-danger"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VehiculeList;
