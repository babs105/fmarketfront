import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authService from "../../services/auth/authService";

function AuthGuardPrivate({ children }) {
  // let logged = false;

  let userState = useSelector((state) => {
    // console.log("ROLES", state.User.user.roles);
    return state.User;
  });

  if (!userState?.user) {
    return <Navigate to={"/"} />;
  }
  return children;
}

export default AuthGuardPrivate;
