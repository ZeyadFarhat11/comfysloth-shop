import React from "react";
import { Link } from "react-router-dom";
import BoxProduct from "../components/BoxProduct";
import { useGlobalContext } from "../context";
import landingLg from "../imgs/landing-lg.jpeg";
import landingSm from "../imgs/landing-sm.jpeg";
import "../style/home.scss";

function Home() {
  const { products } = useGlobalContext();

  return (
    <main className="home">
      <div className="landing container">
        <div className="wrapper">
          <div className="text">
            <h1>Design Your Comfort Zone</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
              at sed omnis corporis doloremque possimus velit! Repudiandae nisi
              odit, aperiam odio ducimus, obcaecati libero et quia tempora
              excepturi quis alias?
            </p>
            <Link to="/products" className="btn">
              shop now
            </Link>
          </div>
          <div className="imgs">
            <img src={landingLg} alt="wood table" className="lg" />
            <img src={landingSm} alt="worker" className="sm" />
          </div>
        </div>
      </div>

      <div className="featured container">
        <h2 className="main-title">featured products</h2>
        <div className="wrapper">
          {products
            .filter((e) => e.featured)
            .map((product) => {
              return <BoxProduct key={product.id} {...product} />;
            })}
        </div>
        <Link to="/products" className="btn">
          all products
        </Link>
      </div>
    </main>
  );
}

export default Home;
