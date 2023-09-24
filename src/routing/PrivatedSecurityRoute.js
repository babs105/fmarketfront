import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Security from "../components/security/Security";
import UsersList from "../components/Private/users/UsersList";
import UserEdit from "../components/Private/users/UserEdit";
import RolesList from "../components/Private/roles/RolesList";

const PrivatedSecurityRoute = () => {
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
  // if (!user?.roles.includes("SUPER_ADMIN")) {
  //   console.log("redirection " + user);
  //   // navigate(redirectPath);
  //   // return <Navigate to={"/401"} replace />;
  //   return <AccessDined />;
  // }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Security />} />
        <Route path="users" element={<UsersList />} />
        <Route path="users/:id" element={<UserEdit />} />
        <Route path="roles" element={<RolesList />} />
      </Route>
    </Routes>
  );
};
export default PrivatedSecurityRoute;
