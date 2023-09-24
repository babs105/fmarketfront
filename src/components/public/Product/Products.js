import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import cocktailservice from "../../../services/cocktails/cocktailService";
import Product from "./Product";
import { Pagination } from "@material-ui/lab";
import categoryService from "../../../services/category/categoryService";

function Products() {
  const [cocktails, setCocktails] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchNom, setsearchNom] = useState("");
  const [searchPrice, setsearchPrice] = useState("");
  const [searchCategory, setsearchCategory] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(4);

  const pageSizes = [3, 6, 9];
  const rangePrices = [
    { value: "10000,50000", libelle: "10000 - 50000" },
    { value: "50000,100000", libelle: "50000 - 100000" },
    { value: "100000,250000", libelle: "100000 - 250000" },
    { value: "250000,400000", libelle: "250000 - 400000" },
    { value: "400000,600000", libelle: "400000 - 600000" },
    // { value: [800000 , 250000], libelle: [100000 - 2500000] },
    // { value: [100000 , 250000], libelle: [100000 - 2500000] },
    // { value: [100000 , 250000], libelle: [100000 - 2500000] },
  ];

  const onChangesearchNom = (e) => {
    setsearchNom(e.target.value);
  };
  const onChangesearchCategory = (e) => {
    setsearchCategory(e.target.value);
  };
  const onChangesearchPrice = (e) => {
    setsearchPrice(e.target.value);
  };

  const getRequestParams = (
    searchNom,
    searchCategory,
    searchPrice,
    page,
    pageSize
  ) => {
    let params = {};
    if (searchNom) {
      params["nom"] = searchNom;
    }
    if (searchCategory) {
      params["category"] = searchCategory;
    }

    if (searchPrice) {
      params["price"] = searchPrice;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveCocktails = () => {
    const params = getRequestParams(
      searchNom,
      searchCategory,
      searchPrice,
      page,
      pageSize
    );

    cocktailservice
      .getAll(params)
      .then((response) => {
        console.log(response);
        const { cocktails, totalPages, totalItems } = response.data.data;

        setCocktails(cocktails);
        setCount(totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveCocktails();
  }, [page, pageSize]);

  useEffect(() => {
    categoryService
      .getAll()
      .then((response) => {
        console.log("categories", response.data);
        setCategories(response.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterProduct = () => {
    setPage(1);
    retrieveCocktails();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // const handlePageSizeChange = (event) => {
  //   setPageSize(event.target.value);
  //   setPage(1);
  // };
  return (
    <>
      <div className="card m-2 shadow-sm">
        <div className="row px-4 py-2">
          <div className=" col-sm-4 my-3 ">
            <div className="">
              <input
                type="text"
                className="form-control"
                placeholder="Nom produit"
                value={searchNom}
                onChange={onChangesearchNom}
              />
              {/* <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </button>
            </div> */}
            </div>
          </div>
          <div className="col-sm-3 my-3 ">
            <div className="">
              <select
                className="custom-select"
                onChange={onChangesearchCategory}
                value={searchCategory}
              >
                <option value={""}>{"Toutes les catégories"} </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.nom}>
                    {cat.nom}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-sm-3 my-3 ">
            <div>
              <select
                className="custom-select"
                onChange={onChangesearchPrice}
                value={searchPrice}
              >
                <option value={""}>{"Toutes les Plages de prix"} </option>
                {rangePrices.map((rangePrice) => (
                  <option key={rangePrice.value} value={rangePrice.value}>
                    {rangePrice.libelle}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-sm-2 my-3">
            <button
              className="btn btn-primary"
              type="button"
              onClick={filterProduct}
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>

      {cocktails && (
        <>
          <Product cocktails={cocktails} />
          <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}

export default Products;
