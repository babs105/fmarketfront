import React, { useState } from "react";
import { useEffect } from "react";
import authService from "../../../services/auth/authService";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const UserProfile = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => {
    console.log("USER STATE", state.User);
    return state.User;
  });
  const dispatch = useDispatch();
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object().shape({
    prenom: Yup.string().required("Prenom Obligatoire"),
    nom: Yup.string().required("Nom Obligatoire"),
    email: Yup.string()
      .email("Entrer un email valide")
      .required("Email Obligatoire")
      .min(6, "Email doit contenir au moins 6 caracteres")
      .max(40, "Email doit avoir au max 40 caracteres"),
    newpassword: Yup.string().when("showChange", {
      is: (value) => value === true,
      then: () => Yup.string().required("Mot de Passe est obligatoire"),
      otherwise: () => Yup.string().nullable().notRequired(),
    }),
    confirmPassword: Yup.string().when("showChange", {
      is: (value) => value === true,
      then: () =>
        Yup.string()
          .required("Confirm Password Obligatoire")
          .oneOf(
            [Yup.ref("newpassword"), null],
            "Passwords ne correspondent pas"
          ),
      otherwise: () => Yup.string().nullable().notRequired(),
    }),
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const changePassword = watch("showChange");
  const [userProfile, setUserProfile] = useState({});

  // const openEditProfile = () => {
  //   navigate("/home/profile/edit");
  // };
  const onSubmit = (data) => {
    console.log("data", data);

    let newdata = {};
    if (!data.showChange) {
      newdata = { prenom: data.prenom, nom: data.nom, email: data.email };
    } else {
      newdata = {
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        password: data.newpassword,
      };
    }

    console.log("newdata", newdata);
    setMessage("");
    setLoading(true);
    authService
      .update(userState.user.id, newdata)
      .then((response) => {
        let dataUser = JSON.parse(localStorage.getItem("dataUser"));
        let dataUserUp = {
          user: {
            ...dataUser.user,
            prenom: response.data.data.prenom,
            nom: response.data.data.nom,
            email: response.data.data.email,
          },
          token: dataUser.token,
        };
        localStorage.setItem("dataUser", JSON.stringify(dataUserUp));

        dispatch({
          type: "User/updateUserSuccess",
          payload: dataUserUp,
        });

        setMessage(response.data.message);
        setLoading(false);
        setSuccessful(true);
      })
      .catch((error) => {
        const resMessage = error.response && error.response.data;
        console.log("Error", resMessage);
        setLoading(false);
        setSuccessful(false);
        setMessage(resMessage);
      });
  };

  const handleShowPwd = (e) => {
    const isChecked = e.target.checked;
    setValue("showChange", isChecked);
    console.log(isChecked);
    if (!e.target.checked) {
      setValue("newpassword", null);
      setValue("confirmPassword", null);
      // setValue("datePose", null);
      // setValue("dateDepose", null);
      // setValue("pkfinBalise", "");
    }
  };
  const getUserProfile = () => {
    console.log("ID");
    authService
      .get(userState.user.id)
      .then((response) => {
        setUserProfile(response.data.data);
        console.log("roles", response.data.roles);
        // Object.keys(response.data.data).forEach((field) => {
        //   setValue(field, response.data.data[field]);
        // });
        setValue("prenom", response.data.data.prenom);
        setValue("nom", response.data.data.nom);
        setValue("email", response.data.data.email);
        // setValue("prenom",response.data.data.prenom)
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getUserProfile();
  }, [userState.user]);

  return (
    // <div className="d-flex justify-content-between items-align-center">
    <div>
      <div className="card">
        <h5 className="card-header text-primary">Profile</h5>
        <div className="card-body">
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
          <form className=" col-sm-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex ">
              <div className="col col-sm-4 mr-4">
                <div className="form-group ">
                  <label>Prénom</label>
                  <input
                    name="prenom"
                    // type="text"
                    {...register("prenom")}
                    className={`form-control ${
                      errors.prenom ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.prenom?.message}
                  </div>
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    name="nom"
                    type="text"
                    {...register("nom")}
                    className={`form-control ${errors.nom ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.nom?.message}</div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    type="text"
                    {...register("email")}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>
              </div>
              <div className=" col col-sm-4">
                <div className="form-group">
                  <label>Changer Mot de Passe</label>
                  <input
                    name="showChange"
                    type="checkbox"
                    {...register("showChange")}
                    onChange={(e) => handleShowPwd(e)}
                    className={"ml-2"}
                  />
                </div>
                {changePassword && (
                  <>
                    <div className="form-group">
                      <label>Nouveau Mot de Passe</label>
                      <input
                        name="newpassword"
                        type="password"
                        {...register("newpassword")}
                        className={`form-control ${
                          errors.newpassword ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.newpassword?.message}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Confirmer Mot de Passe</label>
                      <input
                        name="confirmPassword"
                        type="password"
                        {...register("confirmPassword")}
                        className={`form-control ${
                          errors.confirmPassword ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.confirmPassword?.message}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="mt-4  ml-3 ">
              <button
                type="submit"
                className=" btn btn-warning"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Editer Profile
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="card mt-4">
        <h5 className="card-header text-primary">Roles</h5>
        <div className="card-body">
          <div className="col-sm-6">
            <table className="table  table-striped table-sm m">
              <thead>
                <tr>
                  <th scope="col">Libelle</th>
                  <th scope="col">Description</th>
                  {/* <th scope="col">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {userProfile.roles?.map((role) => (
                  <tr key={role.id}>
                    <td>{role.nom}</td>
                    <td>{role.description}</td>
                    <td>
                      {/* <button
                    // onClick={() => unassignRole(role.id)}
                    className="btn btn-danger"
                  >
                    retirer
                  </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
