import React, { useEffect } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";

import authService from "./authService";

const parseJwt = (token) => {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64"));
    // return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = () => {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    //   const user = JSON.parse(localStorage.getItem("user"));
    const user = authService.getCurrentUser();
    // console.log("USER TEST TOKEN");

    if (user) {
      const decodedJwt = parseJwt(user.token);
      console.log("USER  TOKEN", decodedJwt);
      if (decodedJwt.exp * 1000 < Date.now()) {
        console.log("expier");
        authService.logout();
        navigate("/expire");
        //   return <SessionExpire />;
      }
    }
  }, [location]);

  return <div></div>;
};

export default AuthVerify;
