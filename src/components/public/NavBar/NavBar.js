import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import authService from "../../../services/auth/authService";

const NavBar = () => {
  const userState = useSelector((state) => state.User);
  const dispacth = useDispatch();
  const logout = () => {
    authService.logout();
    dispacth({
      type: "User/logoutSuccess",
      payload: null,
    });
  };
  return (
    <nav className="navbar navbar-expand-lg bg-white ">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          FastMarket
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item pr-4 ">
              <NavLink
                // exact={true}
                className={({ isActive }) =>
                  isActive ? "is-active nav-link" : "nav-link"
                }
                to="/"
              >
                Accueil
              </NavLink>
            </li>
            <li className="nav-item  pr-4 ">
              <NavLink
                // exact={true}
                className={({ isActive }) =>
                  isActive ? "is-active nav-link" : "nav-link"
                }
                to="/products"
              >
                Produits
              </NavLink>
            </li>
            <li className="nav-item pr-4 ">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "is-active nav-link" : "nav-link"
                }
                to="/about"
              >
                A propos
              </NavLink>
            </li>
            <li className="nav-item pr-4 ">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "is-active nav-link " : "nav-link"
                }
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
          {userState?.token && (
            <ul className="navbar-nav ml-auto d-flex align-items-center">
              <li className="nav-item ">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "is-active nav-link " : "nav-link"
                  }
                  to="/home"
                >
                  Mon Compte
                </NavLink>
              </li>
              {/* <li className=""> */}
              <li
                className="nav-link"
                onClick={logout}
                style={{ cursor: "pointer" }}
              >
                Déconnexion
              </li>
              {/* </li> */}
            </ul>
          )}
          {!userState?.token && (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item  ">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "is-active" : "nav-link"
                  }
                  to="/auth/login"
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "is-active " : "nav-link"
                  }
                  to="/auth/register"
                >
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
