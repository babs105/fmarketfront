import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Carburant from "../components/carburant/Carburant";
import CuveList from "../components/carburant/cuve/CuveList";

import AddEvenement from "../components/trace/evenement/AddEvenement";
import Evenement from "../components/trace/evenement/Evenement";
import EvenementList from "../components/trace/evenement/EvenementList";
import Trace from "../components/trace/Trace";
import Home from "../page/Home";
import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import PrivatedRoute from "./PrivatedRoute";
import AccessDined from "../page/error/AccessDined";
import HomeLayout from "./HomeLayout";
import AddRemorquage from "../components/trace/evenement/AddRemorquage";
import AddDetailAccident from "../components/trace/evenement/AddDetailAccident";
import EditRemorquage from "../components/trace/evenement/EditRemorquage";
import EditDetailAccident from "../components/trace/evenement/EditDetailAccident";
import SearchRemorquage from "../components/trace/remorquage/SearchRemorquage";
import SearchDetailAccident from "../components/trace/detailAccident/SearchDetailAccident";

import AuthVerify from "../services/auth/AuthVerify";
import Security from "../components/security/Security";
import UsersList from "../components/security/users/UsersList";
import UserEdit from "../components/security/users/UserEdit";
import SessionExpire from "../page/error/SessionExpire";
import PrivatedTraceRoute from "./PrivatedTraceRoute";
import RolesList from "../components/security/roles/RolesList";
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
import BalayageList from "../components/trace/balayage/BalayageList";
import AddBalayage from "../components/trace/balayage/AddBalayage";
import EditBalayage from "../components/trace/balayage/EditBalayage";
import NettoyageList from "../components/trace/nettoyage/NettoyageList";
import AddNettoyage from "../components/trace/nettoyage/AddNettoyage";
import EditNettoyage from "../components/trace/nettoyage/EditNettoyage";

const MainRoute = ({ user, pth }) => {
  useEffect(() => {
    console.log("User " + user);
  }, []);

  // const logOut = () => {
  //   authService.logout();
  // };
  return (
    <div>
      <Routes>
        <Route index element={<Login user={user} />} />
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route element={<HomeLayout user={user} />}>
          <Route path="/home" element={<Home />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
        </Route>
        {/* //tracer */}
        <Route
          element={
            <PrivatedTraceRoute
              // redirectPath={"/401"}
              // isAllowed={user !== undefined && user?.roles.includes("USER")}
              user={user}
            />
          }
        >
          <Route path="trace" element={<Trace />} />
          <Route path="trace/evenements" element={<EvenementList />} />
          <Route path="trace/evenements/add" element={<AddEvenement />} />
          <Route path="trace/evenements/:id" element={<Evenement />} />
          <Route
            path="trace/event/remorquage/add/:id"
            element={<AddRemorquage />}
          />
          <Route
            path="trace/event/remorquage/edit/:id"
            element={<EditRemorquage />}
          />
          <Route
            path="trace/event/detailAccident/add/:id"
            element={<AddDetailAccident />}
          />
          <Route
            path="trace/event/detailAccident/edit/:id"
            element={<EditDetailAccident />}
          />
          <Route
            path="trace/remorquages/search"
            element={<SearchRemorquage />}
          />
          <Route
            path="trace/detailAccidents/search"
            element={<SearchDetailAccident />}
          />
          <Route path="trace/balayages" element={<BalayageList />} />
          <Route path="trace/balayages/add" element={<AddBalayage />} />
          <Route path="trace/balayages/edit/:id" element={<EditBalayage />} />

          <Route path="trace/nettoyages" element={<NettoyageList />} />
          <Route path="trace/nettoyages/add" element={<AddNettoyage />} />
          <Route path="trace/nettoyages/edit/:id" element={<EditNettoyage />} />
        </Route>
        {/* carburant */}
        <Route element={<PrivatedCarbuRoute user={user} />}>
          <Route path="carburant" element={<Carburant />} />
          <Route path="carburant/cuves" element={<CuveList />} />
          <Route
            path="carburant/ravitaillements"
            element={<RavitaillementList />}
          />
          <Route
            path="carburant/ravitaillements/add"
            element={<AddRavitaillement />}
          />
        </Route>
        {/* securite */}
        <Route
          element={
            <PrivatedSecurityRoute
              // redirectPath={"/401"}
              // isAllowed={user !== undefined && user?.roles.includes("USER")}
              user={user}
            />
          }
        >
          <Route path="security" element={<Security />} />
          <Route path="security/users" element={<UsersList />} />

          <Route path="security/users/:id" element={<UserEdit />} />

          <Route path="security/roles" element={<RolesList />} />
        </Route>
        {/* param vehicule */}
        <Route
          element={
            <PrivatedParamvhlRoute
              // redirectPath={"/401"}
              // isAllowed={user !== undefined && user?.roles.includes("USER")}
              user={user}
            />
          }
        >
          <Route path="paramvhl" element={<Vehicule />} />
          <Route path="paramvhl/vehicules" element={<VehiculeList />} />
          <Route path="paramvhl/vehicules/add" element={<AddVehicule />} />
          <Route
            path="paramvhl/affectations"
            element={<VehiculeAffectationList />}
          />
          {/*  <Route path="security/users/:id" element={<UserEdit />} />

          <Route path="security/roles" element={<RolesList />} /> */}
        </Route>
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
        <Route
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
        </Route>

        <Route path="/401" element={<AccessDined user={user} pth={pth} />} />
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
