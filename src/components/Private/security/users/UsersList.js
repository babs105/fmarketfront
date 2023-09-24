import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import authService from "../../../../services/auth/authService";
import { useTable } from "react-table";

const UsersList = (props) => {
  // const history = useNavigate();
  let navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const usersRef = useRef();
  usersRef.current = users;

  const [searchPrenom, setSearchPrenom] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 20];

  const onChangeSearchPrenom = (e) => {
    setSearchPrenom(e.target.value);

    //   retrieveusers();
  };

  const getRequestParams = (searchPrenom, page, pageSize) => {
    let params = {};

    if (searchPrenom) {
      params["prenom"] = searchPrenom;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveusers = () => {
    const params = getRequestParams(searchPrenom, page, pageSize);
    console.log("params", params);

    authService
      .getAllUsersPage(params)
      .then((response) => {
        console.log(response.data.data);
        const { users, totalPages } = response.data.data;

        setUsers(users);
        setCount(totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveusers();
  }, [page, pageSize, searchPrenom]);

  const refreshList = () => {
    retrieveusers();
  };

  const removeAllusers = () => {
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

  const findByPrenom = () => {
    setPage(1);
    retrieveusers();
  };

  const openuser = (rowIndex) => {
    const id = usersRef.current[rowIndex].id;

    navigate("/home/security/users/edit/" + id);
  };

  const deleteUser = () => {
    const id = usersRef.current[idDelete].id;
    console.log("Id", id);

    authService
      .trash(id)
      .then((response) => {
        // navigate("/security/users");

        let newusers = [...usersRef.current];
        newusers.splice(idDelete, 1);

        setUsers(newusers);
        setMessage("Utilisateur supprimé avec succes");
        setSuccessful(true);
      })
      .catch((e) => {
        console.log(e);
        setMessage("erreur supprrsion");
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
      {
        Header: "Prenom",
        accessor: "prenom",
      },
      {
        Header: "Nom",
        accessor: "nom",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;

          return (
            <div className="d-flex justify-content-between ">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => openuser(rowIdx)}
              >
                <i className="far fa-edit action mr-2"></i>
                Gerer les Roles
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
      data: users,
    });

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/home/"}>Accueil</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={"/home/security"}>Sécurité</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Utilisateurs
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
              name="prenom"
              value={searchPrenom}
              onChange={onChangeSearchPrenom}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                // onClick={findByPrenom}
              >
                Rechercher
              </button>
            </div>
          </div>
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
            {/* <Link to={"/security/users/add"}>
              <button className="btn btn-primary">Ouvrir user</button>
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
                  <h5 className="modal-prenom" id="exampleModalLabel">
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
                  Vous allez supprimer cet utilisateur ?
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
                    onClick={deleteUser}
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
export default UsersList;
