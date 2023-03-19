import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import evenementService from "../../../services/trace/evenement/evenementService";
import { useTable } from "react-table";
import { formatDateDDmmyyyy } from "../../../utils/formatDate";

const EvenementList = (props) => {
  // const history = useNavigate();
  let navigate = useNavigate();
  const [evenements, setEvenements] = useState([]);
  const [idDelete, setIdDelete] = useState();
  const [showModal, setShowModal] = useState(false);
  const evenementsRef = useRef();
  evenementsRef.current = evenements;

  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 20];

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    //   retrieveEvenements();
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

  const retrieveEvenements = () => {
    const params = getRequestParams(searchTitle, page, pageSize);
    console.log("params", params);

    evenementService
      .getAll(params)
      .then((response) => {
        const { evenements, totalPages } = response.data;

        setEvenements(evenements);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveEvenements, [page, pageSize], searchTitle);

  const refreshList = () => {
    retrieveEvenements();
  };

  const removeAllEvenements = () => {
    evenementService
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
    retrieveEvenements();
  };

  const openEvenement = (rowIndex) => {
    const id = evenementsRef.current[rowIndex].id;

    navigate("/trace/evenements/" + id);
  };

  const deleteEvenement = () => {
    const id = evenementsRef.current[idDelete]?.id;
    console.log("Idf", id);
    console.log("rowIndexf", idDelete);
    evenementService
      .remove(id)
      .then((response) => {
        // navigate("/trace/evenements");

        let newevenements = [...evenementsRef.current];
        newevenements.splice(idDelete, 1);

        setEvenements(newevenements);
      })
      .catch((e) => {
        console.log(e);
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
        Header: "Etat",
        accessor: "etatEvent",
        Cell: (props) => {
          return props.value === "Terminer" ? (
            <span className="bg-success rounded-pill p-1 text-white ">
              {props.value}
            </span>
          ) : props.value === "En Cours" ? (
            <span className="bg-danger rounded-pill p-1 text-white ">
              En cours
            </span>
          ) : (
            <span className="bg-warning rounded-pill p-1 text-white ">
              {props.value}
            </span>
          );
        },
      },
      {
        Header: "Statut",
        accessor: "statutEvent",
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
                onClick={() => openEvenement(props.row.id)}
              >
                <i className="far fa-edit action mr-2 text-info"></i>
              </span>

              <span
                style={{ cursor: "pointer" }}
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => {
                  setIdDelete(rowIdx);
                  // setShowModal(true);
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
      data: evenements,
    });

  return (
    <>
      {/* {console.log("idedel", idDelete)} */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/trace"}>Le Tracé</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Evénèments
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
            <Link to={"/trace/evenements/add"}>
              <button className="btn btn-primary">Ouvrir Evenement</button>
            </Link>
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
                Vous allez supprimer cet évènement et tous ces remorquages et
                details accident ?
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
                  onClick={deleteEvenement}
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
export default EvenementList;
