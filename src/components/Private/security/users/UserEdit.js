import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import authService from "../../../../services/auth/authService";
import { useTable } from "react-table";

function UserEdit() {
  const { id } = useParams();
  const initialUserState = {
    id: "",
    prenom: "",
    nom: "",
    email: "",
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
    prenom: Yup.string().notRequired(),
    nom: Yup.string().notRequired(),
    email: Yup.string().notRequired(),
  });

  const {
    register,

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
        console.log("response", response.data);
        setUser(response.data.data);

        Object.keys(initialUserState).forEach((field) => {
          setValue(field, response.data.data[field]);
        });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  const getOtherRolesUser = (id) => {
    console.log("ID", id);
    authService
      .getOtherRoles(id)
      .then((response) => {
        console.log("roles", response.data);
        setOtherRoles(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const assignRole = (rowIndex) => {
    const idRole = otherRolesRef.current[rowIndex].id;
    const data = { roleId: idRole, userId: id };
    console.log("userid", id);
    console.log("roleid", idRole);
    console.log("otherRolesRef", otherRolesRef);
    console.log("new otherRolesRef", [...otherRolesRef.current]);
    authService
      .assignRole(data)
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
    const data = { roleId: parseInt(idRole), userId: parseInt(id) };
    authService
      .unassignRole(data)
      .then((response) => {
        // setUser(response.data.data);
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
        accessor: "nom",
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
            <Link to={"/home"}>Accueil</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={"/home/security/users"}>Utilisateurs</Link>
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
              <label htmlFor="prenom">Prenom</label>
              <input
                className="form-control"
                type="text"
                id="prenom"
                name="prenom"
                {...register("prenom")}
                disabled
              />
            </div>
            <div className="form-group ">
              <label htmlFor="nom">Nom</label>
              <input
                className="form-control"
                type="text"
                id="nom"
                name="nom"
                {...register("nom")}
                disabled
              />
            </div>
            <div className="form-group ">
              <label htmlFor="email">E-mail</label>
              <input
                className="form-control"
                type="text"
                id="email"
                name="email"
                {...register("email")}
                disabled
              />
            </div>
          </form>
          <div className="col-sm-6">
            <h5 className="text-primary">Roles assignés</h5>
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
                    <td>{role.nom}</td>
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
        <h4 className="card-title mt-4 text-primary ">Roles non assignés</h4>
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
