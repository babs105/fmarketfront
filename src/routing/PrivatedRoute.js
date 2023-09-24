import { useEffect } from "react";

import Home from "../components/Private/home/Home";
import { Routes, Route } from "react-router-dom";
import LayoutPrivate from "../components/Private/layout/Layout";
import Products from "../components/Private/products/Products";
import AddProduct from "../components/Private/products/AddProduct";
import UserProfile from "../components/Private/profile/UserProfile";
import EditProduct from "../components/Private/products/EditProduct";
import Categories from "../components/Private/categories/Categories";
import AddCategory from "../components/Private/categories/AddCategory";
import EditCategory from "../components/Private/categories/EditCategory";
import Security from "../components/Private/security/Security";
import UsersList from "../components/Private/security/users/UsersList";
import UserEdit from "../components/Private/security/users/UserEdit";
import RolesList from "../components/Private/security/roles/RolesList";
import EditProfile from "../components/Private/profile/EditProfile";

const PrivatedRoute = () => {
  // const location = useLocation();
  // let navigate = useNavigate();

  // if (!user) {
  //   console.log("user not exist");
  //   return <Navigate to={"/login"} replace />;
  // }

  return (
    <Routes>
      <Route element={<LayoutPrivate />}>
        <Route index element={<Home />} />
        <Route path="products">
          <Route index element={<Products />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>
        <Route path="categories">
          <Route index element={<Categories />} />
          <Route path="add" element={<AddCategory />} />
          <Route path="edit/:id" element={<EditCategory />} />
        </Route>
        <Route path="security">
          <Route index element={<Security />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/edit/:id" element={<UserEdit />} />
          <Route path="roles" element={<RolesList />} />
          {/* <Route path="users/edit/:id" element={<UserEdit />} /> */}
        </Route>
        <Route path="profile">
          <Route index element={<UserProfile />} />
          <Route path="edit/" element={<EditProfile />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default PrivatedRoute;
