import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import categorieservice from "../../../services/carburant/Product/categorieservice";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import categoryService from "../../../services/category/categoryService";

const EditCategory = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [catego, setCatego] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const validationSchema = Yup.object().shape({
    nom: Yup.string().required("Nom Product est obligatoire"),
    description: Yup.string().required("description est obligatoire"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    categoryService
      .get(id)
      .then((response) => {
        console.log("categorie", response.data);

        setValue("nom", response.data.data.nom);
        setValue("description", response.data.data.description);
      })
      .catch((error) => console.log("error get categorie", error));
  }, []);

  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);
    console.log("DATA", data);

    categoryService.update(id, data).then(
      (response) => {
        console.log("data maj", response.data);
        setMessage(response.data.message);
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
    // reset();
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/home"}>Accueil</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={"/home/categories"}>Categories</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Product
          </li>
        </ol>
      </nav>
      <div className="mt-4">
        {/* <div className="d-flex justify-content-between"> */}
        <h4 className="text-primary">Editer Categorie</h4>
        {/* </div> */}
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
        <hr className="mb-4" />
        <div className="edit-form mt-4 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex ">
              <div className="col mb-4 ">
                <div className="form-group col-sm-4 ">
                  <label htmlFor="nom">Nom</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    {...register("nom")}
                    className={`form-control ${errors.nom ? "is-invalid" : ""}`}
                    // value={currentProduct.heureDebutEvent}
                    // onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">{errors.nom?.message}</div>
                </div>

                <div className="form-group col-sm-6">
                  <label htmlFor="description">description</label>
                  <textarea
                    type="textarea"
                    id="description"
                    name="description"
                    {...register("description")}
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    rows="3"
                  ></textarea>
                  <div className="invalid-feedback">
                    {errors.description?.message}
                  </div>
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
                <span>Valider</span>
              </button>

              <button
                type="reset"
                onClick={reset}
                className="btn btn-warning float-right"
              >
                Annuler
              </button>
            </div>
          </form>

          <hr />
        </div>
      </div>
    </>
  );
};

export default EditCategory;
