import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function AuthGuardAuthRoute({ children }) {
  // let logged = false;

  let userState = useSelector((state) => state.User);

  if (userState?.user) {
    return <Navigate to={"/home"} />;
  }
  return children;
}

export default AuthGuardAuthRoute;
