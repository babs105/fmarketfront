import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { formatDateYYYYMMdd } from "../../../utils/formatDate";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import authService from "../../../services/auth/authService";
import { useTable } from "react-table";
import { Button } from "bootstrap";

function UserEdit() {
  const { id } = useParams();
  const initialUserState = {
    id: "",
    firstname: "",
    lastname: "",
    username: "",
  };

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [user, setUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [otherRoles, setOtherRoles] = useState([]);
  const otherRolesRef = useRef();
  otherRolesRef.current = otherRoles;
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().notRequired(),
    lastname: Yup.string().notRequired(),
    username: Yup.string().notRequired(),
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

  const getUser = (id) => {
    console.log("ID", id);
    authService
      .get(id)
      .then((response) => {
        setUser(response.data);
        console.log("roles", response.data.roles);

        Object.keys(initialUserState).forEach((field) => {
          setValue(field, response.data[field]);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getOtherRolesUser = (id) => {
    console.log("ID", id);
    authService
      .getOtherRoles(id)
      .then((response) => {
        console.log("roles", response.data);
        setOtherRoles(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const assignRole = (rowIndex) => {
    const idRole = otherRolesRef.current[rowIndex].id;
    console.log("userid", id);
    console.log("roleid", idRole);
    console.log("otherRolesRef", otherRolesRef);
    console.log("new otherRolesRef", [...otherRolesRef.current]);
    authService
      .assignRole(id, idRole)
      .then((response) => {
        let neweothersRoles = [...otherRolesRef.current];
        neweothersRoles.splice(rowIndex, 1);

        setOtherRoles(neweothersRoles);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const unassignRole = (idRole) => {
    console.log("userid", id);
    console.log("roleid", idRole);

    authService
      .unassignRole(id, idRole)
      .then((response) => {
        setUser(response.data);
        getOtherRolesUser(id);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    console.log("User");
    if (id) {
      getUser(id);
    }
  }, [id, otherRoles]);

  useEffect(() => {
    console.log("User");
    if (id) {
      getOtherRolesUser(id);
    }
  }, [id]);
  const columns = useMemo(
    () => [
      {
        Header: "Libelle",
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
            <div>
              <button
                className="btn  btn-sm btn-success"
                onClick={() => assignRole(rowIdx)}
              >
                {/* <i className="far fa-edit action mr-2 text-info"></i> */}
                Assigner
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
      data: otherRoles,
    });

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/security"}>Le Tracé</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={"/security/users"}>Utilisateurs</Link>
          </li>

          <li className="breadcrumb-item "> Utilisateur</li>
        </ol>
      </nav>
      <div className="mt-4">
        <div className=" ">
          <h4 className="text-primary">Détail Utilisateur</h4>
        </div>
        <hr className="mb-4" />
        <div className="d-flex justify-content-between items-align-center">
          <form className="col-sm-4">
            <div className="form-group ">
              <label htmlFor="firstname">Prenom</label>
              <input
                className="form-control"
                type="text"
                id="firstname"
                name="firstname"
                {...register("firstname")}
                disabled
              />
            </div>
            <div className="form-group ">
              <label htmlFor="lastname">Nom</label>
              <input
                className="form-control"
                type="text"
                id="lastname"
                name="lastname"
                {...register("lastname")}
                disabled
              />
            </div>
            <div className="form-group ">
              <label htmlFor="username">E-mail</label>
              <input
                className="form-control"
                type="text"
                id="username"
                name="username"
                {...register("username")}
                disabled
              />
            </div>
          </form>
          <div className="col-sm-6">
            <h5 className="text-primary">Roles</h5>
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">Libelle</th>
                  <th scope="col">Description</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {user.roles?.map((role) => (
                  <tr key={role.id}>
                    <td>{role.name}</td>
                    <td>{role.description}</td>
                    <td>
                      <button
                        onClick={() => unassignRole(role.id)}
                        className="btn btn-danger"
                      >
                        retirer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <h4 className="card-title mt-4 text-primary ">Roles non-assignes</h4>
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
    </>
  );
}

export default UserEdit;
