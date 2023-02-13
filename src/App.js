import React, { useState, useEffect } from "react";
import {Routes, Route, NavLink, Outlet} from "react-router-dom";
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import './App.css';
import Home from "./page/Home";
import authService from "./services/authService";
import Login from "./page/auth/Login";
import Register from "./page/auth/Register";
import PrivatedTraceRoute from "./routing/MainRoute";
import PrivatedCarbuRoute from "./routing/PrivatedCarbuRoute";
import EvenementList from "./components/trace/evenement/EvenementList";
import AddEvenement from "./components/trace/evenement/AddEvenement";
import Evenement from "./components/trace/evenement/Evenement";
import Trace from "./components/trace/Trace";
import MainRoute from "./routing/MainRoute";

const App = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
  const currentUser =  authService.getCurrentUser() ;
    if(currentUser){
      setUser(currentUser);
    }
  },[]);
  return (
  <MainRoute user={user}/>
  )
}
export default App;