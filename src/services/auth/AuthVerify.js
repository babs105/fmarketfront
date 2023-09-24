import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authService from "./authService";
import SessionExpire from "../../page/error/SessionExpire";

const parseJwt = (token) => {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64"));
    // return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    // return null;
    console.log("EEroor", error.response);
  }
};

const AuthVerify = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const userState = useSelector((state) => state.User);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userState?.user?.token) {
      console.log("TOKEN", userState?.user?.token);
      const decodedJwt = parseJwt(userState?.user?.token);
      console.log("USER  TOKEN", decodedJwt);
      if (decodedJwt.exp * 1000 < Date.now()) {
        console.log("expier");
        authService.logout();
        navigate("/error/expire");
        // return <SessionExpire />;
      }
    }
  }, [location]);

  return <div></div>;
};

export default AuthVerify;
