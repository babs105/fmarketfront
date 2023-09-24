import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import ProductService from "../../../services/carburant/Product/ProductService";
import { formatDateYYYYMMdd } from "../../../utils/formatDate";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import cocktailservice from "../../../services/cocktails/cocktailService";
import categoryService from "../../../services/category/categoryService";
import { useSelector } from "react-redux";

import { http } from "../../../axios/http-common";
import { v4 as uuidv4 } from "uuid";

// import vehiculeService from "../../../services/param/vehicule/vehiculeService";
// import cuveService from "../../../services/carburant/cuve/cuveService";
// import affectationService from "../../../services/param/affectation/affectationService";
const EditProduct = (props) => {
  const { id } = useParams();

  const fileInputRef = useRef(null);

  let navigate = useNavigate();
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

  const [previewImage, setPreviewImage] = useState(null);
  const [catego, setCatego] = useState([]);
  const [cocktail, setCocktail] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const [errorImageEmpty, setErrorImageEmpty] = useState(false);
  const [errorImageFormat, setErrorImageFormat] = useState(false);
  const [errorImageSize, setErrorImageSize] = useState(false);

  const [imagePath, setImagePath] = useState("");
  const [idImageTodelete, setIdImageTodelete] = useState("");

  const [multipleImages, setMultipleImages] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [filesToSend, setFilesToSend] = useState([]);

  const validationSchema = Yup.object().shape({
    // image: Yup.mixed()
    //   .test("fileRequired", "Sélectionnez une image", function (value) {
    //     if (!value || !value[0]) return true;
    //     else return value && value[0];
    //   })
    //   .test("fileType", "Le fichier doit être une image", (value) => {
    //     if (!value || !value[0]) return true; // Vérifie s'il y a un fichier sélectionné
    //     return value && value[0].type.startsWith("image/");
    //   })
    //   .test(
    //     "fileSize",
    //     "La taille de l'image doit être inférieure à 5 Mo",
    //     (value) => {
    //       if (!value || !value[0]) return true; // Vérifie s'il y a un fichier sélectionné
    //       return value && value[0].size <= 5 * 1024 * 1024; // 5 Mo
    //     }
    //   ),

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
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
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
    console.log("taile file", files.length);

    if (files.length === 0 && multipleImages.length === 0) {
      return true;
    } else return false;
  };
  const deleteImage = () => {
    if (imagePath) {
      cocktailservice
        .deleteImageProduct(id, { imagePath })
        .then((response) => {
          console.log("response upadte inage", response.data.data);
          const newmultipleImages = multipleImages.filter((img) => {
            if (img.imgPath) {
              return img.imgPath !== imagePath;
            }
          });
          setMultipleImages(newmultipleImages);
        })
        .catch((error) => console.log(error));
    } else {
      console.log("idtoDel", idImageTodelete);
      const newFilesToSend = fileList.filter(
        (file) => file.id !== idImageTodelete
      );
      const newmultipleImages = multipleImages.filter(
        (img) => img.id !== idImageTodelete
      );
      setMultipleImages(newmultipleImages);
      console.log("newFilesToSend", newFilesToSend);
      setFileList(newFilesToSend);
    }
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };
  // const getImageFileFromUrl = async (urlServer, imgsList) => {
  //   try {
  //     let blobimages = [];
  //     imgsList.map(async (img) => {
  //       const res = await http.get(urlServer + "/" + img, {
  //         responseType: "blob",
  //       });
  //       // .then((res) => {
  //       //   console.log("blob data", res.data);
  //       //   blobimages.push(URL.createObjectURL(res.data));
  //       // })
  //       // .catch((error) => console.log("error", error));

  //       blobimages.push(URL.createObjectURL(res.data));
  //     });
  //     return blobimages;
  //     // return file;
  //   } catch (error) {
  //     console.error("Erreur lors du téléchargement de l'image :", error);
  //   }
  // };
  useEffect(() => {
    cocktailservice
      .get(id)
      .then(async (response) => {
        console.log("cocktail", response.data);
        console.log("categorie", response.data.data.categories);
        console.log("images", response.data.data.images);

        setValue("nom", response.data.data.nom);
        setValue("description", response.data.data.description);
        setValue("price", response.data.data.price);
        setValue(
          "categories",
          response.data.data.categories.map((element) => element.id.toString())
        );

        const imagesServer = response.data.data.images;
        console.log("images bd", imagesServer);

        // const imageUrlArray = await getImageFileFromUrl(
        //   process.env.REACT_APP_API_URL,
        //   imagesServer
        // );
        let blobimages = [];
        let fileimages = [];

        // let idimg = 0;
        imagesServer.map(async (img, index) => {
          http
            .get(process.env.REACT_APP_API_URL + "/" + img, {
              responseType: "blob",
            })
            .then((res) => {
              console.log("blob data", res.data);

              blobimages.push({
                id: uuidv4(),
                imgPath: img,
                urlBlobImg: URL.createObjectURL(res.data),
              });

              setMultipleImages([...blobimages]);
            })
            .catch((error) => console.log("error", error));
        });

        // setMultipleImages(blobimages);
        console.log("blobimages", blobimages);
        console.log("fileimages", fileimages);
      })
      .catch((error) => console.log("error get Product", error));
  }, [id]);

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
      const fileArray = Array.from(e.target.files).map((file) => {
        return {
          id: idimage,
          file,
        };
      });
      // setFileList([...fileList, ...Array.from(e.target.files)]);
      setFileList([...fileList, ...fileArray]);

      const imageArray = Array.from(e.target.files).map((file) => {
        return {
          id: idimage,
          imgPath: null,
          urlBlobImg: URL.createObjectURL(file),
        };
      });

      setMultipleImages([...multipleImages, ...imageArray]);
    }
  };

  const onSubmit = (data) => {
    const fileToSend = fileList.map((file) => file.file);
    // setFilesToSend(fileToSend);
    // console.log("FileToSend", fileToSend);
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

      const formData = new FormData();
      fileToSend.forEach((file) => {
        formData.append("images", file);
      });
      formData.append("nom", data.nom);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("categories", data.categories);
      formData.append("user_id", userState.user.id);

      // console.log(formData.getAll());

      cocktailservice.update(id, formData).then(
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
    }
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
            <Link to={"/home/products"}>Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Product
          </li>
        </ol>
      </nav>
      <div className="mt-4">
        {console.log("multiimages", multipleImages)}
        {console.log("fileList", fileList)}

        {/* <div className="d-flex justify-content-between"> */}
        <h4 className="text-primary">Editer Produit</h4>
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
              <div className="col-sm-6">
                <label htmlFor="nom">Image</label>
                <div className="form-group">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    id="image"
                    // onChange={(e) => handleImageChange(e)}
                    multiple
                    // {...register("image")}
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
                            console.log("url", image.urlBlobImg);
                            console.log("id", image.id);
                            setImagePath(image.imgPath);
                            setIdImageTodelete(image.id);
                            // setShowModal(true);
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
                {/* {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{ maxWidth: "300px" }}
                  />
                )} */}
              </div>

              <div className="col-sm-6 mb-4 ">
                <div className="form-group col ">
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
                  {/* <input
                    type="text"
                    id="description"
                    name="description"
                    {...register("description")}
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    // value={currentProduct.heureDebutEvent}
                    // onChange={handleInputChange}
                  /> */}
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
                    // value={currentProduct.heureDebutEvent}
                    // onChange={handleInputChange}
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

export default EditProduct;
