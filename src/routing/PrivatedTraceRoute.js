import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import AccessDined from "../page/error/AccessDined";

const PrivatedTraceRoute = ({
  children,

  user,
}) => {
  const location = useLocation();
  let navigate = useNavigate();
  // useEffect(() => {
  //   console.log("private route" + redirectPath);
  //   console.log("permet" + isAllowed);
  //   if (!user || !user?.roles.includes("USER")) {
  //     console.log("redirection " + isAllowed);
  //     // navigate("/401");
  //     // return <Navigate to={redirectPath} replace />;
  //   }
  // }, []);
  // if (!isAllowed) {
  //   console.log("redirection " + isAllowed);
  //   // navigate(redirectPath);
  //   return <Navigate to={redirectPath} replace />;
  // }
  if (!user?.roles.includes("USER_TRACE")) {
    console.log("redirection " + user);
    // navigate(redirectPath);
    // return <Navigate to={"/401"} replace />;
    return <AccessDined />;
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
export default PrivatedTraceRoute;
