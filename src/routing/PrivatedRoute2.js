import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import AccessDined from "../components/error/AccessDined";

const PrivatedRoute2 = ({ children, user }) => {
  const location = useLocation();
  let navigate = useNavigate();

  if (!user) {
    console.log("user not exist");
    return <Navigate to={"/login"} replace />;
  }

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
export default PrivatedRoute2;
