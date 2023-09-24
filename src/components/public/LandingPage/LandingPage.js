import React from "react";
import Hero from "../Hero/Hero";
import Products from "../Product/Products";

function LandingPage() {
  return (
    <div>
      <Hero />
      {/* <h1>Welcome to je new page</h1> */}
      <div style={{ padding: "30px", minHeight: "calc(100vh - 100px)" }}>
        <Products />
      </div>
    </div>
  );
}

export default LandingPage;
