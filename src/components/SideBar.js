import React from "react";
import { Routes, Route, NavLink, Navigate, Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div>
      <nav
        className="collapse d-lg-block sidebar collapse bg-white"
        id="sidebarMenu"
      >
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-4 overflow-auto h-100">
            <NavLink
              activeclassname="active"
              to={"/trace"}
              className="list-group-item list-group-item-action py-2 ripple  font-weight-bold"
              aria-current="true"
            >
              <i className="fas fa-tachometer-alt fa-fw me-3"></i>
              <span> Le Tracé</span>
            </NavLink>
            <NavLink
              activeclassname="active"
              to={"/carburant"}
              className="list-group-item list-group-item-action py-2 ripple  font-weight-bold "
            >
              <i className="fas fa-chart-area fa-fw me-3"></i>
              <span> Carburant</span>
            </NavLink>
            <NavLink
              to={"/parcauto"}
              activeclassname="active"
              className="list-group-item list-group-item-action py-2 ripple font-weight-bold"
            >
              <i className="fas fa-lock fa-fw me-3"></i>
              <span> Parc Automobile</span>{" "}
            </NavLink>

            {/* <a
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-chart-line fa-fw me-3"></i>
              <span>Analytics</span>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-chart-pie fa-fw me-3"></i>
              <span>SEO</span>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-chart-bar fa-fw me-3"></i>
              <span>Orders</span>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-globe fa-fw me-3"></i>
              <span>International</span>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-building fa-fw me-3"></i>
              <span>Partners</span>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-calendar fa-fw me-3"></i>
              <span>Calendar</span>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-users fa-fw me-3"></i>
              <span>Users</span>
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-money-bill fa-fw me-3"></i>
              <span>Sales</span>
            </a> */}
            <a
              className="list-group-item list-group-item-action  font-weight-bold py-2 ripple"
              aria-current="true"
              data-toggle="collapse"
              href="#collapseReport1"
              aria-expanded="true"
              aria-controls="collapseExample1"
            >
              <i className="fas fa-tachometer-alt fa-fw me-3"></i>
              <span>Rapport ▾</span>
            </a>

            <ul
              id="collapseReport1"
              className="collapse list-group list-group-flush"
            >
              <li className="list-group-item py-1">
                <NavLink
                  to={"/report/trace"}
                  activeclassname="active"
                  // className=" py-2 ripple text-primary"
                  className="list-group-item list-group-item-action py-1 ripple "
                >
                  <span className=""> Tracé</span>
                </NavLink>
              </li>
              <li className="list-group-item py-1">
                <NavLink
                  to={"/report/carburant"}
                  activeclassname="active"
                  className="list-group-item list-group-item-action py-1 ripple "
                >
                  <span className="">Carburant</span>
                </NavLink>
              </li>
              {/* <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li>
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li> */}
            </ul>
            <a
              className="list-group-item list-group-item-action  font-weight-bold py-2 ripple"
              aria-current="true"
              data-toggle="collapse"
              href="#collapseExample1"
              aria-expanded="true"
              aria-controls="collapseExample1"
            >
              <i className="fas fa-tachometer-alt fa-fw me-3"></i>
              <span>Paramètrage ▾</span>
            </a>

            <ul
              id="collapseExample1"
              className="collapse list-group list-group-flush"
            >
              <li className="list-group-item py-1">
                <NavLink
                  to={"/paramvhl"}
                  activeclassname="active"
                  // className=" py-2 ripple text-primary"
                  className="list-group-item list-group-item-action py-1 ripple "
                >
                  <span className=""> Véhicules</span>
                </NavLink>
              </li>
              <li className="list-group-item py-1">
                <NavLink
                  to={"/paramrh"}
                  activeclassname="active"
                  className="list-group-item list-group-item-action py-1 ripple "
                >
                  <span className="">RH</span>
                </NavLink>
              </li>
              {/* <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li>
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li> */}
            </ul>
            <NavLink
              to={"/security"}
              activeclassname="active"
              className="list-group-item list-group-item-action py-2 ripple font-weight-bold"
            >
              <i className="fas fa-users fa-fw me-3"></i>
              <span> Utilisateurs</span>
            </NavLink>
            {/* <a
              className="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              data-toggle="collapse"
              href="#collapseExample2"
              aria-expanded="true"
              aria-controls="collapseExample2"
            >
              <i className="fas fa-chart-area fa-fw me-3"></i>
              <span>Collapsed menu</span>
            </a>

            <ul
              id="collapseExample2"
              className="collapse list-group list-group-flush"
            >
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li>
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li>
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li>
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li>
            </ul>
            <a
              className="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              data-toggle="collapse"
              href="#collapseExample3"
              aria-expanded="true"
              aria-controls="collapseExample3"
            >
              <i className="fas fa-chart-area fa-fw me-3"></i>
              <span>Collapsed menu</span>
            </a>

            <ul
              id="collapseExample3"
              className="collapse list-group list-group-flush"
            >
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li>
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li>
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li>
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li>
            </ul>
            <a
              className="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              data-toggle="collapse"
              href="#collapseExample2"
              aria-expanded="true"
              aria-controls="collapseExample2"
            >
              <i className="fas fa-chart-area fa-fw me-3"></i>
              <span>Collapsed menu</span>
            </a>

            <ul
              id="collapseExample2"
              className="collapse list-group list-group-flush"
            >
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li>
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li>
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li>
              <li className="list-group-item py-1">
                <a href="" className="text-reset">
                  Link
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </div>
  );
};
export default SideBar;
