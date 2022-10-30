import React from "react";
import { Link } from "react-router-dom";
import BoxProduct from "../components/BoxProduct";
import { useGlobalContext } from "../context";
import landingLg from "../imgs/landing-lg.jpeg";
import landingSm from "../imgs/landing-sm.jpeg";
import "../style/home.scss";
import s1 from "../imgs/services1.svg";
import s2 from "../imgs/services2.svg";
import s3 from "../imgs/services3.svg";

function Home() {
  const { products, loading } = useGlobalContext();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  if (loading) {
    return <></>;
  }

  return (
    <main className="home">
      <div className="landing container">
        <div className="wrapper">
          <div className="text">
            <h1 data-aos="fade-up">Design Your Comfort Zone</h1>
            <p data-aos="fade-up" data-aos-delay="150">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
              at sed omnis corporis doloremque possimus velit! Repudiandae nisi
              odit, aperiam odio ducimus, obcaecati libero et quia tempora
              excepturi quis alias?
            </p>
            <Link
              to="/products"
              className="btn"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              shop now
            </Link>
          </div>
          <div className="imgs" data-aos="fade-left">
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

      <div className="services container">
        <div className="text">
          <h1>Custom Furniture Built Only For You</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            dolorum debitis consectetur reprehenderit non aliquam voluptates
            dolore aut vero consequuntur.
          </p>
        </div>
        <div className="cards">
          <div className="card">
            <div className="icon">
              <img src={s1} alt="icon" />
            </div>
            <h3>mission</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum
              velit autem unde numquam nisi
            </p>
          </div>
          <div className="card">
            <div className="icon">
              <img src={s2} alt="icon" />
            </div>
            <h3>vision</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum
              velit autem unde numquam nisi
            </p>
          </div>
          <div className="card">
            <div className="icon">
              <img src={s3} alt="icon" />
            </div>
            <h3>history</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum
              velit autem unde numquam nisi
            </p>
          </div>
        </div>
      </div>

      <div className="newsletter container">
        <div className="text">
          <h1>Join our newsletter and get 20% off</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            sint unde quaerat ratione soluta veniam provident adipisci cumque
            eveniet tempore?
          </p>
        </div>
        <form onSubmit={handleNewsletterSubmit}>
          <input type="email" required placeholder="Enter Email" />
          <button>subscribe</button>
        </form>
      </div>
    </main>
  );
}

export default Home;
