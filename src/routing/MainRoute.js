import React, { useState, useEffect } from "react";
import { Router, Routes, Route } from "react-router-dom";

import Home from "../components/Private/home/Home";
import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import PrivatedRoute from "./PrivatedRoute2";
import AccessDined from "../components/error/AccessDined";
import HomeLayout from "./HomeLayout";

import AuthVerify from "../services/auth/AuthVerify";
import Security from "../components/security/Security";
import UsersList from "../components/Private/users/UsersList";
import UserEdit from "../components/Private/users/UserEdit";
import SessionExpire from "../page/error/SessionExpire";
import PrivatedTraceRoute from "./PrivatedTraceRoute";
import RolesList from "../components/Private/roles/RolesList";
import Vehicule from "../components/param/vehicule/Vehicule";
import VehiculeList from "../components/param/vehicule/VehiculeList";
import ParcAuto from "../components/parcauto/ParcAuto";
import Rh from "../components/rh/Rh";
import PrivatedCarbuRoute from "./PrivatedCarbuRoute";
import AddVehicule from "../components/param/vehicule/AddVehicule";
import PrivatedSecurityRoute from "./PrivatedSecurityRoute";
import RavitaillementList from "../components/carburant/ravitaillement/RavitaillementList";
import AddRavitaillement from "../components/carburant/ravitaillement/AddRavitaillement";
import VehiculeAffectationList from "../components/param/vehicule/VehiculeAffectationList";
import ReportTrace from "../components/report/trace/ReportTrace";
import EvenementReport from "../components/report/trace/evenementReport/EvenementReport";
import PrivatedReportTraceRoute from "./PrivatedReportTraceRoute";
import PrivatedParamvhlRoute from "./PrivatedParamvhlRoute";
import UserProfile from "../components/profile/UserProfile";

const MainRoute = ({ user }) => {
  useEffect(() => {
    console.log("User " + user);
  }, []);

  // const logOut = () => {
  //   authService.logout();
  // };
  return (
    <div>
      {/* <Router> </Router> */}
      <Routes>
        {/* <Route index element={<Login user={user} />} />
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/register" element={<Register />} /> */}
        {/* <Route element={<PrivatedRoute user={user} />}>
          <Route path="/profile" element={<UserProfile user={user} />} />
        </Route>

        <Route element={<HomeLayout user={user} />}>
          <Route path="/home" element={<Home />} /> */}

        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        {/* </Route> */}

        {/* securite */}
        {/* <Route element={<PrivatedSecurityRoute user={user} />}>
          <Route path="security" element={<Security />} />
          <Route path="security/users" element={<UsersList />} />

          <Route path="security/users/:id" element={<UserEdit />} />

          <Route path="security/roles" element={<RolesList />} />
        </Route> */}
        {/* param vehicule */}
        {/* <Route element={<PrivatedParamvhlRoute user={user} />}>
          <Route path="paramvhl" element={<Vehicule />} />
          <Route path="paramvhl/vehicules" element={<VehiculeList />} />
          <Route path="paramvhl/vehicules/add" element={<AddVehicule />} />
          <Route
            path="paramvhl/affectations"
            element={<VehiculeAffectationList />}
          />
        </Route> */}
        {/* param rh */}
        <Route
          element={
            <PrivatedRoute
              // redirectPath={"/401"}
              // isAllowed={user !== undefined && user?.roles.includes("USER")}
              user={user}
            />
          }
        >
          <Route path="paramrh" element={<Rh />} />
          {/* <Route path="security/users" element={<UsersList />} />

          <Route path="security/users/:id" element={<UserEdit />} />

          <Route path="security/roles" element={<RolesList />} /> */}
        </Route>
        {/* parc auto */}
        <Route
          element={
            <PrivatedRoute
              // redirectPath={"/401"}
              // isAllowed={user !== undefined && user?.roles.includes("USER")}
              user={user}
            />
          }
        >
          <Route path="parcauto" element={<ParcAuto />} />
          {/* <Route path="security/users" element={<UsersList />} />

          <Route path="security/users/:id" element={<UserEdit />} />

          <Route path="security/roles" element={<RolesList />} /> */}
        </Route>
        {/* report */}
        {/* <Route
          element={
            <PrivatedReportTraceRoute
              // redirectPath={"/401"}
              // isAllowed={user !== undefined && user?.roles.includes("USER")}
              user={user}
            />
          }
        >
          <Route path="report/trace" element={<ReportTrace />} />
          <Route path="report/trace/evenements" element={<EvenementReport />} />
        </Route> */}

        <Route path="/401" element={<AccessDined user={user} />} />
        <Route path="/expire" element={<SessionExpire />} />
      </Routes>
      <AuthVerify />
    </div>
  );
};
export default MainRoute;

// user={
//   !!user && user.permissions.includes('analyze')
// }
