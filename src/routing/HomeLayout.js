import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import AccessDined from "../page/error/AccessDined";

const HomeLayout = ({ children, user }) => {
  const location = useLocation();
  let navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     return <Navigate to={"/login"} replace />;
  //     navigate('/login');
  //   }
  // }, []);
  if (!user) {
    // navigate("/login");\
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
        <div className="container pt-4">{children ? children : <Outlet />}</div>
      </main>
    </div>
  );
};
export default HomeLayout;
