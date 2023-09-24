import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import authService from "../../../services/auth/authService";
import { useTable } from "react-table";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import roleService from "../../../services/auth/role/roleService";

const RolesList = (props) => {
  // const history = useNavigate();
  let navigate = useNavigate();

  const initialRoleState = {
    id: "",
    name: "",
    description: "",
  };

  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [idDelete, setIdDelete] = useState();

  const rolesRef = useRef();
  rolesRef.current = roles;

  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 20];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("libelle est obligatoire"),
    description: Yup.string().required("description est obligatoire"),
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
    //   retrieveroles();
  };
  const resetField = () => {
    Object.keys(initialRoleState).forEach((field) =>
      setValue(field, initialRoleState[field])
    );
    //   retrieveroles();
  };
  const addRole = (data) => {
    setMessage("");
    setLoading(true);
    roleService.create(data).then(
      (response) => {
        setRoles([response.data, ...roles]);
        setMessage("Ajout Role succes");
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
  const editeRole = (idRole, data) => {
    setMessage("");
    setLoading(true);

    roleService.update(idRole, data).then(
      (response) => {
        const newroles = roles.map((role) =>
          role.id === response.data.id ? response.data : role
        );
        setRoles(newroles);
        setMessage("Modifier Role avec succes");
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
    const idRole = data.id;
    idRole ? editeRole(idRole, data) : addRole(data);
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

  const retrieveroles = () => {
    const params = getRequestParams(searchTitle, page, pageSize);
    console.log("params", params);

    roleService
      .getAll(params)
      .then((response) => {
        const { roles, totalPages } = response.data;

        setRoles(roles);
        setCount(totalPages);

        console.log("response", response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveroles, [page, pageSize], searchTitle);

  const refreshList = () => {
    retrieveroles();
  };

  const removeAllroles = () => {
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
    retrieveroles();
  };

  const editRole = (rowIndex) => {
    const roleToEdit = rolesRef.current[rowIndex];
    console.log("roleToEdit", roleToEdit);
    console.log("roles", roles);

    Object.keys(roleToEdit).forEach((field) =>
      setValue(field, roleToEdit[field])
    );
  };

  const deleteRole = () => {
    console.log("rowIndexf", idDelete);
    const id = rolesRef.current[idDelete].id;
    console.log("Id", id);

    roleService
      .remove(id)
      .then((response) => {
        let newroles = [...rolesRef.current];
        newroles.splice(idDelete, 1);
        setMessage("Role supprimé avec succes");
        setSuccessful(true);
        setRoles(newroles);
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
        Header: "Libellé",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
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
                onClick={() => editRole(rowIdx)}
              >
                <i className="far fa-edit action mr-2"></i>
                {/* Gerer les Roles */}
              </button>

              <button
                className="btn btn-sm  btn-outline-danger"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => {
                  setIdDelete(rowIdx);
                }}
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
      data: roles,
    });

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/security"}>Sécurité</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Roles
          </li>
        </ol>
      </nav>
      <div className="list">
        <div className="col-md-12">
          <h4 className="text-primary mb-2">Ajout / Edite Role</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-2 ">
              <div className="form-group col-sm-3">
                <label htmlFor="name">Libellé</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  // value={currentRemorquage.dateEvent}
                  // onChange={handleInputChange}
                  {...register("name")}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.name?.message}</div>
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  {...register("description")}
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  // value={currentRemorquage.heureDebutEvent}
                  // onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.description?.message}
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
          <h4 className="text-primary">Liste des Roles</h4>
          <div className="d-flex justify-content-between items-align-center my-3 ">
            {/* <Link to={"/security/roles/add"}>
              <button className="btn btn-primary">Ouvrir role</button>
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
            {/* <Link to={"/security/roles/add"}>
              <button className="btn btn-primary">Ouvrir role</button>
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
                <div className="modal-body">Vous allez supprimer ce Role ?</div>
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
                    onClick={deleteRole}
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
export default RolesList;
