import React from "react";
import { NavLink } from "react-router-dom";
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
              to={"/home/categories"}
              className="list-group-item list-group-item-action py-2 ripple  font-weight-bold"
              aria-current="true"
            >
              <i className="fas fa-tachometer-alt fa-fw me-3"></i>
              <span> Les Catégories</span>
            </NavLink>
            <NavLink
              activeclassname="active"
              to={"/home/products"}
              className="list-group-item list-group-item-action py-2 ripple  font-weight-bold "
            >
              <i className="fas fa-chart-area fa-fw me-3"></i>
              <span> Les Produits</span>
            </NavLink>
            <NavLink
              to={"/home/security"}
              activeclassname="active"
              className="list-group-item list-group-item-action py-2 ripple font-weight-bold"
            >
              <i className="fas fa-users fa-fw me-3"></i>
              <span> Utilisateurs</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default SideBar;
