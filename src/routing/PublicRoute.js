import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../components/public/LandingPage/LandingPage";
import Products from "../components/public/Product/Products";
import Product from "../components/public/Product/Product";
import LayoutPublic from "../components/public/layout/LayoutPublic";
import About from "../components/public/About/About";
import Contact from "../components/public/Contact/Contact";
import DetailProduct from "../components/public/Product/DetailProduct";

const PublicRoute = () => {
  return (
    <Routes>
      <Route element={<LayoutPublic />}>
        <Route index element={<LandingPage />} />
        <Route path="products">
          <Route index element={<Products />} />
          <Route path=":id" element={<Product />} />
          <Route path="detail/:id" element={<DetailProduct />} />
        </Route>
        {/* <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Product />} /> */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};
export default PublicRoute;
