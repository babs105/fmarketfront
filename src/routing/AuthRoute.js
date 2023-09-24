import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../components/Auth/auth/Login";
import Register from "../components/Auth/auth/Register";

function AuthRoute() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AuthRoute;
