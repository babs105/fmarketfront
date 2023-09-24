import React from "react";
import "./Hero.css";
import background from "../../../data/images/Hero.jpg";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div
      className="hero-section"
      // style={{ backgroundImage: `url(${background})` }}
      style={{
        backgroundImage: 'url("https://picsum.photos/1200/800?random=2")',
      }}
    >
      <div className="container">
        <div className="row">
          <div className=" d-flex flex-column justify-content-center align-items-center w-100 text-white ">
            <h1>Achetez plus vite avec nous</h1>
            {/* <p>Un site web pour montrer mes compétences en développement</p> */}
            <div>
              <Link
                to={"/products"}
                className="btn btn-lg btn-warning  font-weight-bold"
              >
                Nos Produits
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
