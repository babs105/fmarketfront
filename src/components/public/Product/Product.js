import React from "react";
import { Link } from "react-router-dom";
//import "./Product.css";
function Product({ cocktails, title }) {
  return (
    <div className="container-fluid">
      <div className="row ">
        {cocktails?.map((cocktail) => (
          // <div key={cocktail.id} ="card">
          //   <img src={process.env.REACT_APP_API_URL + "/" + cocktail.image} />
          // </div>
          <Link
            to={"/products/detail/" + cocktail.id}
            style={{
              textDecoration: "none",
              color: "black",
            }}
            className="m-2 "
            key={cocktail.id}
          >
            <div
              className=" col-sm-2 card p-3 m-2  border-0 shadow-sm "
              style={{
                height: "400px",
                minWidth: "300px",
                maxWidth: "400px",
                cursor: "pointer",
                // textDecoration: "none",
              }}
            >
              <img
                src={process.env.REACT_APP_API_URL + "/" + cocktail.images[0]}
                className="h-50  "
                alt="image-recette"
                style={{ maxWidth: "300px" }}
              />
              <div className="d-flex flex-wrap my-2">
                {cocktail?.categories?.map((cat) => (
                  <span
                    key={cat.id}
                    className="rounded-pill bg-warning px-2 ml-2 "
                  >
                    {cat.nom}
                  </span>
                ))}
              </div>

              <div className="card-body">
                <h5 className="card-title">{cocktail.nom}</h5>
                <p className="card-text">{cocktail.description}</p>

                <h5 className="text-danger font-weight-bold">
                  {cocktail.price} FCFA
                </h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Product;
