import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Vehicule from "../components/param/vehicule/Vehicule";
import VehiculeList from "../components/param/vehicule/VehiculeList";
import AddVehicule from "../components/param/vehicule/AddVehicule";
import VehiculeAffectationList from "../components/param/vehicule/VehiculeAffectationList";

const PrivatedParamvhlRoute = () => {
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
  // if (!user?.roles.includes("ADMIN_PARA_VHL")) {
  //   console.log("redirection " + user);
  //   // navigate(redirectPath);
  //   // return <Navigate to={"/401"} replace />;
  //   return <AccessDined />;
  // }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Vehicule />} />
        <Route path="vehicules" element={<VehiculeList />} />
        <Route path="vehicules/add" element={<AddVehicule />} />
        <Route path="affectations" element={<VehiculeAffectationList />} />
      </Route>
    </Routes>
  );
};
export default PrivatedParamvhlRoute;
