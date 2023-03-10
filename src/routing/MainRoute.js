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
import AddRemorquage from "../components/trace/evenement/AddRemorquage";
import AddDetailAccident from "../components/trace/evenement/AddDetailAccident";
import EditRemorquage from "../components/trace/evenement/EditRemorquage";
import EditDetailAccident from "../components/trace/evenement/EditDetailAccident";
import SearchRemorquage from "../components/trace/remorquage/SearchRemorquage";
import SearchDetailAccident from "../components/trace/detailAccident/SearchDetailAccident";
import authService from "../services/auth/authService";
import AuthVerify from "../services/auth/AuthVerify";
import Security from "../components/security/Security";
import UsersList from "../components/security/users/UsersList";
import UserEdit from "../components/security/users/UserEdit";

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
        </Route>

        <Route element={<PrivatedRoute user={user} />}>
          <Route path="carburant" element={<Carburant />} />
          <Route path="carburant/cuves" element={<CuveList />} />
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
          <Route path="security" element={<Security />} />
          <Route path="security/users" element={<UsersList />} />

          <Route path="security/users/:id" element={<UserEdit />} />
          {/*   <Route
              path="trace/event/remorquage/add/:id"
            element={<AddRemorquage />}
          /> 
          {/* <Route
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
          /> */}
        </Route>
        <Route path="/401" element={<AccessDined user={user} pth={pth} />} />
      </Routes>
      <AuthVerify />
    </div>
  );
};
export default MainRoute;

// user={
//   !!user && user.permissions.includes('analyze')
// }
