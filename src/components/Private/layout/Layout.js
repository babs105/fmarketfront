import { React } from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <SideBar />
        <NavBar />
      </header>
      <main style={{ marginTop: "58px" }}>
        <div className="container pt-4 card">
          {children ? children : <Outlet />}
        </div>
      </main>
    </div>
  );
};
export default Layout;
