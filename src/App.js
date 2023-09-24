import React, { useState, useEffect } from "react";
import {
  //   BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

// import PrivatedTraceRoute from "./routing/PrivatedTraceRoute";
// import PrivatedCarbuRoute from "./routing/PrivatedCarbuRoute";
// import PrivatedSecurityRoute from "./routing/PrivatedSecurityRoute";
// import PrivatedReportTraceRoute from "./routing/PrivatedReportTraceRoute";
// import PrivatedParamvhlRoute from "./routing/PrivatedParamvhlRoute";

import PrivatedRoute from "./routing/PrivatedRoute";
import ErrorRoute from "./routing/ErrorRoute";
// import AuthVerify from "./services/auth/AuthVerify";
//import AuthGuardTrace from "./components/authGuard/AuthGuardTrace";
import AuthGuardAuthRoute from "./components/authGuard/AuthGuardAuthRoute";
import AuthRoute from "./routing/AuthRoute";
import { setupResponseInterceptor } from "./axios/http-common";
import PublicRoute from "./routing/PublicRoute";
import AuthGuardPrivate from "./components/authGuard/AuthGuardPrivate";

const App = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [user, setUser] = useState(undefined);
  // // let location = useLocation();

  useEffect(() => {
    // console.log("USER APP useEffect" + user);
    // const currentUser = authService.getCurrentUser();
    // console.log("current user" + currentUser);
    // if (currentUser) {
    //   setUser(currentUser);
    // }
    if (!isLoaded) {
      console.log("IN PAPP");
      setIsLoaded(true);
      setupResponseInterceptor(navigate);
    }
  }, []);

  return (
    // <BrowserRouter>

    <Routes>
      <Route path="/*" element={<PublicRoute />} />
      <Route
        path="/home/*"
        element={
          <AuthGuardPrivate>
            <PrivatedRoute />
          </AuthGuardPrivate>
        }
      />
  
      <Route
        path="/auth/*"
        element={
          <AuthGuardAuthRoute>
            <AuthRoute />
          </AuthGuardAuthRoute>
        }
      />
      <Route path="/error/*" element={<ErrorRoute />} />
    </Routes>
  );
};
export default App;
