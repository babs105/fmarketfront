import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import ReportTrace from "../components/report/trace/ReportTrace";
import EvenementReport from "../components/report/trace/evenementReport/EvenementReport";

const PrivatedReportTraceRoute = () => {
  // const location = useLocation();
  // let navigate = useNavigate();
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
  // if (!user?.roles.includes("ADMIN_PARA_TRACE")) {
  //   console.log("redirection " + user);
  //   // navigate(redirectPath);
  //   // return <Navigate to={"/401"} replace />;
  //   return <AccessDined />;
  // }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ReportTrace />} />
        <Route path="evenements" element={<EvenementReport />} />
      </Route>
    </Routes>
  );
};
export default PrivatedReportTraceRoute;
