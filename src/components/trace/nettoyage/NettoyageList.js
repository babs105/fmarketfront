import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import nettoyageService from "../../../services/trace/nettoyage/nettoyageService";
import { useTable } from "react-table";
import { formatDateDDmmyyyy } from "../../../utils/formatDate";

const NettoyageList = (props) => {
  // const history = useNavigate();
  let navigate = useNavigate();
  const [nettoyages, setNettoyages] = useState([]);
  const [idDelete, setIdDelete] = useState();
  const [showModal, setShowModal] = useState(false);
  const nettoyagesRef = useRef();
  nettoyagesRef.current = nettoyages;

  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 20];

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    //   retrievenettoyages();
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

  const retrievenettoyages = () => {
    const params = getRequestParams(searchTitle, page, pageSize);
    console.log("params", params);

    nettoyageService
      .getAll(params)
      .then((response) => {
        const { nettoyages, totalPages } = response.data;

        setNettoyages(nettoyages);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrievenettoyages, [page, pageSize], searchTitle);

  const refreshList = () => {
    retrievenettoyages();
  };

  const removeAllnettoyages = () => {
    nettoyageService
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
    retrievenettoyages();
  };

  const opennettoyage = (rowIndex) => {
    const id = nettoyagesRef.current[rowIndex].id;

    navigate("/trace/nettoyages/edit/" + id);
  };

  const deletenettoyage = () => {
    const id = nettoyagesRef.current[idDelete]?.id;
    console.log("Idf", id);
    console.log("rowIndexf", idDelete);
    nettoyageService
      .remove(id)
      .then((response) => {
        // navigate("/trace/nettoyages");

        let newnettoyages = [...nettoyagesRef.current];
        newnettoyages.splice(idDelete, 1);

        setNettoyages(newnettoyages);
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
        accessor: "date",
        Cell: (props) => {
          return formatDateDDmmyyyy(new Date(props?.value));
        },
      },
      {
        Header: "H.Début",
        accessor: "heureDebut",
      },
      {
        Header: "H.Fin",
        accessor: "heureFin",
      },
      {
        Header: "Type Nettoyage",
        accessor: "typeNettoyage",
      },

      {
        Header: "Pk Debut",
        accessor: "pkdebut",
      },
      {
        Header: "Pk Fin ",
        accessor: "pkfin",
      },
      {
        Header: " Gare",
        accessor: "gare",
      },
      {
        Header: "Zone",
        accessor: "zone",
      },

      {
        Header: "Etat",
        accessor: "etatNettoyage",
        Cell: (props) => {
          return props.value === "Terminer" ? (
            <span className="bg-success rounded-pill p-1 text-white ">
              {props.value}
            </span>
          ) : props.value === "En Cours" ? (
            <span className="bg-danger rounded-pill p-1 text-white ">
              Encours
            </span>
          ) : null;
        },
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
                onClick={() => opennettoyage(props.row.id)}
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
      data: nettoyages,
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
            nettoyages
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
            <Link to={"/trace/nettoyages/add"}>
              <button className="btn btn-primary">Ajout nettoyage</button>
            </Link>
          </div>
          <table
            className="table table-sm table-striped table-bordered table-hover"
            {...getTableProps()}
          >
            <thead className="text-center" style={{ fontSize: 14 }}>
              {headerGroups.map((headerGroup) => (
                <tr className="" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} style={{ fontSize: 14 }}>
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
                Vous allez supprimer le nettoyage ?
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
                  onClick={deletenettoyage}
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
export default NettoyageList;
