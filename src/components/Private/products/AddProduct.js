import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import ProductService from "../../../services/carburant/Product/ProductService";
import { formatDateYYYYMMdd } from "../../../utils/formatDate";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import cocktailservice from "../../../services/cocktails/cocktailService";
import categoryService from "../../../services/category/categoryService";
import { useSelector } from "react-redux";
// import vehiculeService from "../../../services/param/vehicule/vehiculeService";
// import cuveService from "../../../services/carburant/cuve/cuveService";
// import affectationService from "../../../services/param/affectation/affectationService";
const AddProduct = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };
  // const initialProductState = {
  //   id: "",
  //   image: null,
  //   nom: "",
  //   description: "",
  //   categories: null,
  //   price: "",
  // };

  // const [vehicules, setVehicules] = useState([]);
  // const [cuves, setCuves] = useState([]);

  const userState = useSelector((state) => state.User);

  const [catego, setCatego] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [errorImageEmpty, setErrorImageEmpty] = useState(false);
  const [errorImageFormat, setErrorImageFormat] = useState(false);
  const [errorImageSize, setErrorImageSize] = useState(false);

  const [multipleImages, setMultipleImages] = useState([]);
  const [fileList, setFileList] = useState([]);

  const [idImageTodelete, setIdImageTodelete] = useState("");
  const validationSchema = Yup.object().shape({
    categories: Yup.array()
      .transform((value, originalValue) => {
        if (originalValue === null || originalValue === false) {
          return [];
        }
        return value;
      })
      .min(1, "Sélectionnez au moins une catégorie"),
    nom: Yup.string().required("Nom Product est obligatoire"),
    description: Yup.string().required("description est obligatoire"),
    price: Yup.number().typeError("kilometrage incorrect"),
  });

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   images: [], // Initialisez le champ "images" avec un tableau vide
    // },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    // console.log("detail event");

    categoryService
      .getAll()
      .then((response) => {
        console.log(response.data.data);
        setCatego(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const isValidFileImageFormat = (files) => {
    return files.every((file) => {
      // Check if file type is an image
      const fileType = file.type.split("/")[0];
      return fileType === "image";
    });
  };
  const isValidFileSize = (files) => {
    return files.every((file) => {
      // Perform your validation logic here
      // Return true if the file is valid, false otherwise
      return file.size <= 5000000; // Example validation: check if file size is less than or equal to 5MB
    });
    // !validSize && true;
  };
  const isFileEmpty = (files) => {
    console.log("empty file");
    if (files.length === 0 && fileList.length === 0) {
      return true;
    } else return false;
  };

  const handleImageChange = (e) => {
    setErrorImageEmpty(false);
    setErrorImageFormat(false);
    setErrorImageSize(false);

    isFileEmpty(Array.from(e.target.files)) && setErrorImageEmpty(true);
    !isValidFileImageFormat(Array.from(e.target.files)) &&
      setErrorImageFormat(true);
    !isValidFileSize(Array.from(e.target.files)) && setErrorImageSize(true);
    if (
      !isFileEmpty(Array.from(e.target.files)) &&
      isValidFileImageFormat(Array.from(e.target.files)) &&
      isValidFileSize(Array.from(e.target.files))
    ) {

      const idimage = uuidv4();
      const fileArray = Array.from(e.target.files).map((file, index) => {
        return {
          id: idimage + index,
          file,
        };
      });
      // setFileList([...fileList, ...Array.from(e.target.files)]);
      setFileList([...fileList, ...fileArray]);

      const imageArray = Array.from(e.target.files).map((file, index) => {
        return {
          id: idimage + index,
          imgPath: null,
          urlBlobImg: URL.createObjectURL(file),
        };
      });

      setMultipleImages([...multipleImages, ...imageArray]);
    }
  };
  const deleteImage = () => {
    console.log("idtoDel", idImageTodelete);
    const newFilesToSend = fileList.filter(
      (file) => file.id !== idImageTodelete
    );
    const newmultipleImages = multipleImages.filter(
      (img) => img.id !== idImageTodelete
    );
    setMultipleImages(newmultipleImages);
    setFileList(newFilesToSend);
  };

  const onSubmit = (data) => {
    const fileToSend = fileList.map((file) => file.file);
    console.log("FileToSend", fileToSend);
    if (
      isFileEmpty(fileToSend) ||
      !isValidFileImageFormat(fileToSend) ||
      !isValidFileSize(fileToSend)
    ) {
      isFileEmpty(fileToSend) && setErrorImageEmpty(true);
      !isValidFileImageFormat(fileToSend) && setErrorImageFormat(true);
      !isValidFileSize(fileToSend) && setErrorImageSize(true);
    } else {
      setMessage("");
      setLoading(true);
      console.log("DATA", data);
      console.log("multi", multipleImages);
      console.log("filelist", fileToSend);
      const formData = new FormData();
      fileToSend.forEach((file) => {
        formData.append("images", file);
      });

      formData.append("nom", data.nom);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("categories", data.categories);
      formData.append("user_id", userState.user.id);
      console.log("IMAGES", formData.get("images"));

      cocktailservice.create(formData).then(
        (response) => {
          console.log("data new", response.data);
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
    }

  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/home"}>Accueil</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={"/home/products"}>Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Ajout Product
          </li>
        </ol>
      </nav>
      <div className="mt-4">
        {/* <div className="d-flex justify-content-between"> */}
        <h4 className="text-primary">Nouveau Produit</h4>
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
        {console.log("file", fileList)}
        <hr className="mb-4" />
        <div className="edit-form mt-4 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex ">
              <div className="col">
                <label htmlFor="nom">Image</label>
                <div className="form-group">
                  <input
                    type="file"
                    id="image"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    multiple
                    onChange={handleImageChange}
                    className={` ${
                      errorImageEmpty || errorImageFormat || errorImageSize
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <div
                    className="btn btn-outline-primary"
                    onClick={handleClick}
                  >
                    Choisir image
                  </div>
                  <div className="invalid-feedback">
                    <p>
                      {errorImageEmpty ? "Selection au moins une image" : ""}
                    </p>
                    {errorImageFormat ? "Format image invalide" : ""}
                    {errorImageSize ? "Taille Image invalide" : ""}
                  </div>
                </div>

                <div className="d-flex flex-wrap ">
                  {multipleImages.map((image, index) => {
                    return (
                      <div className="card" key={index}>
                        <span
                          className="d-flex justify-content-end m-2"
                          style={{ cursor: "pointer" }}
                          data-toggle="modal"
                          data-target="#deleteModal"
                          onClick={() => {
                            console.log("id", image.id);
                            setIdImageTodelete(image.id);
                          }}
                        >
                          <i className="fas fa-trash action text-danger"></i>
                        </span>
                        <img
                          className="image"
                          src={image.urlBlobImg}
                          alt=""
                          style={{ width: "200px", height: "200px" }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="col mb-4 ">
                <div className="form-group col ">
                  <label htmlFor="nom">Nom</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    {...register("nom")}
                    className={`form-control ${errors.nom ? "is-invalid" : ""}`}
                  
                  />
                  <div className="invalid-feedback">{errors.nom?.message}</div>
                </div>

                <div className="form-group col">
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
                <div className="form-group col">
                  <label htmlFor="price">Prix</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    {...register("price")}
                    className={`form-control ${
                      errors.price ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.price?.message}
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="cat">Categories :</label>
                  {catego?.map((category) => (
                    <div className="form-check" key={category.id}>
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          value={category.id}
                          {...register("categories")}
                          className={`form-check-input ${
                            errors.categories ? "is-invalid" : ""
                          }`}
                          // onChange={handleCheck}
                        />
                        <span>{category.nom}</span>
                      </label>
                    </div>
                  ))}
                  <span className={"text-danger"}>
                    {errors.categories && errors.categories?.message}
                  </span>
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
      <div
        className="modal fade"
        id="deleteModal"
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
            <div className="modal-body">Vous allez supprimer ce produit?</div>
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
                onClick={deleteImage}
                className="btn btn-danger"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
