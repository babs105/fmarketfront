import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../../services/auth/authService";
import { useDispatch } from "react-redux";
const NavBar = () => {
  let navigate = useNavigate();
  const dispacth = useDispatch();
  const logout = () => {
    authService.logout();
    dispacth({
      type: "User/logoutSuccess",
      payload: null,
    });
  };
  return (
    <nav
      id="main-navbar"
      className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* <a className="navbar-brand" href="#">
        <img
          src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
          height="25"
          alt="MDB Logo"
          loading="lazy"
        />
      </a> */}
        <Link
          to={"/"}
          height="25"
          className="font-weight-bold text-decoration-none h3"
        >
          FastMarket
        </Link>

        <ul className="navbar-nav ms-auto d-flex flex-row">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                className="rounded-circle"
                height="22"
                alt="Avatar"
                loading="lazy"
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <Link to={"/home/profile"} className="dropdown-item" href="#">
                  Mon profil
                </Link>
              </li>
              {/* <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li> */}
              <li>
                <button
                  className="dropdown-item"
                  onClick={logout}
           
                >
                  Déconnexion
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
