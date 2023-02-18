import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import AccessDined from "../page/error/AccessDined";

const PrivatedRoute = ({
  isAllowed,
  redirectPath = "/login",
  children,
  path,
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
  if (!user) {
    console.log("redirection " + user);
    // navigate(redirectPath);
    return <AccessDined />;
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
export default PrivatedRoute;
