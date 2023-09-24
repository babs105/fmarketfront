import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import AccessDined from "../components/error/AccessDined";
import SessionExpire from "../components/error/SessionExpire";
const ErrorRoute = ({ children, user }) => {
  // const location = useLocation();
  // let navigate = useNavigate();

  // if (!user) {
  //   console.log("user not exist");
  //   return <Navigate to={"/login"} replace />;
  // }

  return (
    <Routes>
      <Route element={<AccessDined />} />
      <Route path="/403" element={<AccessDined />} />
      <Route path="/401" element={<SessionExpire />} />
    </Routes>
  );
};
export default ErrorRoute;
