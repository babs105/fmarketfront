import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Carburant from "../components/carburant/Carburant";
import CuveList from "../components/carburant/cuve/CuveList";
import AddRavitaillement from "../components/carburant/ravitaillement/AddRavitaillement";
import RavitaillementList from "../components/carburant/ravitaillement/RavitaillementList";
import Layout from "../components/layout/Layout";

const PrivatedCarbuRoute = () => {
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
  // if (!user?.roles.includes("USER_CARBURANT")) {
  //   console.log("redirection " + user);
  //   // navigate(redirectPath);
  //   // return <Navigate to={"/401"} replace />;
  //   return <AccessDined />;
  // }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Carburant />} />
        <Route path="cuves" element={<CuveList />} />
        <Route path="ravitaillements" element={<RavitaillementList />} />
        <Route path="ravitaillements/add" element={<AddRavitaillement />} />
      </Route>
    </Routes>
  );
};
export default PrivatedCarbuRoute;
