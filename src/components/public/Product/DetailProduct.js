import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../../../axios/http-common";
import { v4 as uuidv4 } from "uuid";
import cocktailservice from "../../../services/cocktails/cocktailService";

function DetailProduct() {
  const { id } = useParams();

  const [multipleImages, setMultipleImages] = useState([]);
  const [product, setProduct] = useState();

  useEffect(() => {
    cocktailservice
      .get(id)
      .then(async (response) => {
        console.log("cocktail", response.data);
        console.log("categorie", response.data.data.categories);
        console.log("images", response.data.data.images);

        // setValue("nom", response.data.data.nom);
        // setValue("description", response.data.data.description);
        // setValue("price", response.data.data.price);
        // setValue(
        //   "categories",
        //   response.data.data.categories.map((element) => element.id.toString())
        // );

        setProduct(response.data.data);
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

  return (
    <div className="container-fluid">
      <h1 className="mt-2"> Détails Produits</h1>

      <div className="row my-2  ">
        <div className="col-sm-7 card p-3">
          <div className="d-flex flex-wrap my-2 ">
            {multipleImages.map((image) => {
              return (
                <img
                  className="w-50 "
                  src={image.urlBlobImg}
                  alt=""
                  style={{ height: "300px" }}
                  key={image.id}
                />
              );
            })}
          </div>
          {product && (
            <div className="">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="">{product.nom}</h1>
                <h3 className="text-danger font-weight-bold ">
                  {product.price} F CFA
                </h3>
              </div>

              <p className="">{product.description}</p>

              <div className="col-sm-5"></div>
            </div>
          )}
        </div>
        <div className="col-sm-4 card  sm-ml-4 p-2">
          <form className="d-flex flex-column justify-content-center align-items-center w-100 h-100 ">
            <h2 className=""> Contactez-Nous</h2>
            <p> TEL : 77845 455 44</p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default DetailProduct;
