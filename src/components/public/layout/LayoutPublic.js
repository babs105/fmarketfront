import { React, Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const LayoutPublic = ({ children }) => {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <>
      <NavBar />
      <div style={{ paddingTop: "", minHeight: "calc(100vh - 80px)" }}>
        {children ? children : <Outlet />}
      </div>
    </>
  );
};
export default LayoutPublic;
