import React from 'react'
import {Routes, Route, NavLink,Navigate} from "react-router-dom";
const SideBar = () => {
  return (
    <div>
      <nav className="collapse d-lg-block sidebar collapse bg-white" id="sidebarMenu">
    <div className="position-sticky">
      <div className="list-group list-group-flush mx-3 mt-4 overflow-auto h-100">
        <NavLink activeClassName="active"
        to={"/trace"}
          className="list-group-item list-group-item-action py-2 ripple  font-weight-bold"
          aria-current="true"
        >
          <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Le Trace</span>
        </NavLink>
        <NavLink  activeClassName="active" to={'/carburant'} className="list-group-item list-group-item-action py-2 ripple  font-weight-bold ">
          <i className="fas fa-chart-area fa-fw me-3"></i><span>Carburant</span>
        </NavLink>
        <NavLink to={'/parcauto'} activeClassName="active"className="list-group-item list-group-item-action py-2 ripple font-weight-bold"
          ><i className="fas fa-lock fa-fw me-3"></i><span>Parc Automobile</span> </NavLink>
        <a href="#" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-chart-line fa-fw me-3"></i><span>Analytics</span></a
        >
        <a href="#" className="list-group-item list-group-item-action py-2 ripple">
          <i className="fas fa-chart-pie fa-fw me-3"></i><span>SEO</span>
        </a>
        <a href="#" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-chart-bar fa-fw me-3"></i><span>Orders</span></a
        >
        <a href="#" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-globe fa-fw me-3"></i><span>International</span></a
        >
        <a href="#" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-building fa-fw me-3"></i><span>Partners</span></a
        >
        <a href="#" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-calendar fa-fw me-3"></i><span>Calendar</span></a
        >
        <a href="#" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-users fa-fw me-3"></i><span>Users</span></a
        >
        <a href="#" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-money-bill fa-fw me-3"></i><span>Sales</span></a
        >
        <a
          class="list-group-item list-group-item-action py-2 ripple"
          aria-current="true"
          data-toggle="collapse"
          href="#collapseExample1"
          aria-expanded="true"
          aria-controls="collapseExample1"
        >
          <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>Expanded menu ▾</span>
        </a>
  
        <ul id="collapseExample1" class="collapse  list-group list-group-flush">
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
        </ul>
       
        <a
          class="list-group-item list-group-item-action py-2 ripple"
          aria-current="true"
          data-toggle="collapse"
          href="#collapseExample2"
          aria-expanded="true"
          aria-controls="collapseExample2"
        >
          <i class="fas fa-chart-area fa-fw me-3"></i><span>Collapsed menu</span>
        </a>
     
        <ul id="collapseExample2" class="collapse list-group list-group-flush">
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
        </ul>
        <a
          class="list-group-item list-group-item-action py-2 ripple"
          aria-current="true"
          data-toggle="collapse"
          href="#collapseExample3"
          aria-expanded="true"
          aria-controls="collapseExample3"
        >
          <i class="fas fa-chart-area fa-fw me-3"></i><span>Collapsed menu</span>
        </a>
     
        <ul id="collapseExample3" class="collapse list-group list-group-flush">
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
        </ul>
        <a
          class="list-group-item list-group-item-action py-2 ripple"
          aria-current="true"
          data-toggle="collapse"
          href="#collapseExample2"
          aria-expanded="true"
          aria-controls="collapseExample2"
        >
          <i class="fas fa-chart-area fa-fw me-3"></i><span>Collapsed menu</span>
        </a>
     
        <ul id="collapseExample2" class="collapse list-group list-group-flush">
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
          <li class="list-group-item py-1">
            <a href="" class="text-reset">Link</a>
          </li>
        </ul>
      </div>
   
    </div>
       </nav>
    </div>
  )
}
export default SideBar

