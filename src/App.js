import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import authService from "./services/auth/authService";
import MainRoute from "./routing/MainRoute";

const App = () => {
  const [user, setUser] = useState(undefined);
  let location = useLocation();
  let pth = "";
  useEffect(() => {
    console.log("USER APP useEffect" + user);
    const currentUser = authService.getCurrentUser();
    console.log("current user" + currentUser);
    if (currentUser) {
      setUser(currentUser);
    }
    // window.onbeforeunload = (e) => {
    //   console.log(location.pathname);

    //   e.preventDefault();

    //   e.returnValue = "";
    // };
  }, []);
  return (
    <>
      {console.log("app render" + location.pathname)}
      {console.log("user" + user)}
      <MainRoute user={user} pth={pth} />
    </>
  );
};
export default App;
