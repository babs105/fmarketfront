import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation,
} from "react-router-dom";
import Carburant from "../components/carburant/Carburant";
import AddCuve from "../components/carburant/cuve/AddCuve";
import Cuve from "../components/carburant/cuve/Cuve";
import CuveList from "../components/carburant/cuve/CuveList";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import AddEvenement from "../components/trace/evenement/AddEvenement";
import Evenement from "../components/trace/evenement/Evenement";
import EvenementList from "../components/trace/evenement/EvenementList";
import RemorquageList from "../components/trace/remorquage/RemorquageList";
import Trace from "../components/trace/Trace";
import Home from "../page/Home";
import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import PrivatedRoute from "./PrivatedRoute";
import AccessDined from "../page/error/AccessDined";
import HomeLayout from "./HomeLayout";

const MainRoute = ({ user, pth }) => {
  useEffect(() => {
    console.log("User " + user);
  }, []);

  return (
    //   <div>
    //   <header>

    //     <SideBar/>
    //     <NavBar/>
    //  </header>
    //  <main style={{marginTop: "58px"}}>
    // <div className="container pt-4">
    <Routes>
      <Route index element={<Login user={user} />} />
      <Route path="/login" element={<Login user={user} />} />
      <Route path="/register" element={<Register />} />
      <Route element={<HomeLayout user={user} />}>
        <Route path="/home" element={<Home />} />
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
      </Route>
      <Route
        element={
          <PrivatedRoute
            // redirectPath={"/401"}
            // isAllowed={user !== undefined && user?.roles.includes("USER")}
            user={user}
          />
        }
      >
        <Route path="trace" element={<Trace />} />
        <Route path="trace/evenements" element={<EvenementList />} />
        <Route path="trace/evenements/:id" element={<Evenement />} />
      </Route>

      <Route
        element={
          <PrivatedRoute redirectPath={"/401"} isAllowed={user !== undefined} />
        }
      >
        <Route path="carburant" element={<Carburant />} />
        <Route path="carburant/cuves" element={<CuveList />} />
      </Route>
      <Route path="/401" element={<AccessDined user={user} pth={pth} />} />
    </Routes>
    //   </div>
    //  </main>
    // </div>
  );
};
export default MainRoute;

// user={
//   !!user && user.permissions.includes('analyze')
// }
