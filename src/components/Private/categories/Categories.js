import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

import { useTable } from "react-table";
import categoryService from "../../../services/category/categoryService";

const Categories = (props) => {
  // const history = useNavigate();
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [idDelete, setIdDelete] = useState();
  const [showModal, setShowModal] = useState(false);
  const categoriesRef = useRef();
  categoriesRef.current = categories;

  const [searchNom, setSearchNom] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const pageSizes = [5, 10, 20];

  const onChangeSearchTitle = (e) => {
    setSearchNom(e.target.value);
    //   retrievecategories();
  };

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchNom) {
      params["nom"] = searchNom;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrievecategories = () => {
    const params = getRequestParams(searchNom, page, pageSize);
    console.log("params", params);
    categoryService
      .getAllPage(params)
      .then((response) => {
        console.log("DARA", response.data);
        const { categories, totalPages } = response.data.data;

        setCategories(categories);
        setCount(totalPages);

        // console.log(response.data);
      })
      .catch((error) => {
        console.log("ERROR", error);
        console.log(error?.message);
      });
  };

  useEffect(() => {
    retrievecategories();
  }, [page, pageSize, searchNom]);

  const refreshList = () => {
    retrievecategories();
  };

  const removeAllcategories = () => {
    categoryService
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
    retrievecategories();
  };

  const openCategorie = (rowIndex) => {
    const id = categoriesRef.current[rowIndex].id;

    navigate("/home/categories/edit/" + id);
  };

  const deleteCategorie = () => {
    const id = categoriesRef.current[idDelete]?.id;
    console.log("Idf", id);
    console.log("rowIndexf", idDelete);
    categoryService
      .trash(id)
      .then((response) => {
        // navigate("/trace/categories");

        let newcategories = [...categoriesRef.current];
        newcategories.splice(idDelete, 1);

        setCategories(newcategories);
      })
      .catch((e) => {
        console.log(e);
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
      // {
      //   Header: "Photo",
      //   accessor: "image",

      //   Cell: (props) => {
      //     return (
      //       <img
      //         style={{ width: "50px", height: "50px" }}
      //         src={process.env.REACT_APP_API_URL + "/" + props.value}
      //         data-toggle="modal"
      //         data-target="#imageModal"
      //         onClick={() => {
      //           setIdImage(props.row.id);
      //           // setShowModal(true);
      //         }}
      //       />
      //     );
      //   },
      // },
      {
        Header: "Nom",
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
              <span
                style={{ cursor: "pointer" }}
                onClick={() => openCategorie(props.row.id)}
              >
                <i className="far fa-edit action mr-2 text-info"></i>
              </span>

              <span
                style={{ cursor: "pointer" }}
                data-toggle="modal"
                data-target="#deleteModal"
                onClick={() => {
                  setIdDelete(rowIdx);
                  // setShowModal(true);
                }}
              >
                <i className="fas fa-trash action text-danger"></i>
              </span>
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
      data: categories,
    });

  return (
    <>
      {/* {console.log("idedel", idDelete)} */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/home"}>Accueil</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Les Categories
          </li>
        </ol>
      </nav>
      <div className="list mt-4">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Mot Clé"
              value={searchNom}
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
        <div className="col-md-12 list mt-4">
          <div className="d-flex justify-content-between mt-4">
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
          </div>
          <div className="d-flex justify-content-between mt-4">
            <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              color="primary"
              shape="rounded"
              onChange={handlePageChange}
            />
            <Link to={"/home/categories/add"}>
              <button className="btn btn-primary">Ajout Categorie</button>
            </Link>
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
              <div className="modal-body">
                Vous allez supprimer cette categorie?
              </div>
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
                  onClick={deleteCategorie}
                  className="btn btn-danger"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="modal fade"
          id="imageModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Aperçu
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
              <div className="modal-body">
                <img
                  src={
                    process.env.REACT_APP_API_URL +
                    "/" +
                    categoriesRef.current[idImage]?.image
                  }
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="modal-footer">
     
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default Categories;
