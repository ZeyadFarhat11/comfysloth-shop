import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { db } from "../firebase";

function Product() {
  const { setLoading, user, cart } = useGlobalContext();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);
  const [counter, setCounter] = useState(1);
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const adjustCount = (val) => {
    setCounter((currentCount) => {
      if (currentCount < 10 && val === 1) {
        return currentCount + 1;
      } else if (currentCount > 1 && val === -1) {
        return currentCount - 1;
      }
      return currentCount;
    });
  };

  const addToCart = async () => {
    if (btnLoading) return;
    if (!user) {
      navigate("/login");
    }
    setBtnLoading(true);

    try {
      console.log(cart);
      const productObject = {
        quantity: counter,
        color: currentColor,
        image: product.images[0].url,
        name: product.name,
        price: product.price,
      };
      console.log(productObject);
      await setDoc(doc(db, "users", user.uid), {
        cart: [...cart, productObject],
      });
    } catch (err) {
      console.log(err);
    } finally {
      setBtnLoading(false);
    }
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        ` https://course-api.com/react-store-single-product?id=${productId}`
      );
      console.log(`fetch single product`, data);
      setProduct(data);
      setCurrentColor(data.colors[0]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const setStars = () => {
    const stars = [];
    let counter = Math.round(product.stars * 2) / 2;
    while (counter > 0) {
      if (counter >= 1) {
        stars.push(BsStarFill);
        counter -= 1;
      } else if (counter >= 0.5) {
        stars.push(BsStarHalf);
        counter -= 0.5;
      }
    }
    while (stars.length < 5) {
      stars.push(BsStar);
    }
    return stars.map((Star, i) => <Star key={i} />);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) {
    return <></>;
  }

  return (
    <main className="product">
      <div className="page-path">
        <Link to="/">home</Link> / <Link to="/products">products</Link> /{" "}
        {product.name}
      </div>
      <div className="product-container">
        <Link to="/products" className="main-btn">
          back to products
        </Link>
        <div className="product-wrapper">
          <div className="gallery"></div>
          <div className="text">
            <h3 className="title">{product.name}</h3>
            <div className="starts">
              <div className="starts-wrapper">{setStars()}</div>
              <p>(10 customer reviews)</p>
            </div>
            <h4 className="price">
              $
              {Intl.NumberFormat().format(
                +product.price.toString().slice(0, -2)
              )}
              .99
            </h4>
            <p>{product.description}</p>
            <div className="info">
              <span>Available :</span>
              <span>{product.stock ? "in stock" : "out stock"}</span>
            </div>
            <div className="info">
              <span>SKU :</span>
              <span>{product.id}</span>
            </div>
            <div className="info">
              <span>Brand :</span>
              <span>{product.company}</span>
            </div>
            <hr />
            <div className="info colors">
              <span>colors :</span>
              <ul>
                {product.colors.map((color, idx) => (
                  <li
                    key={idx}
                    className={`color${
                      currentColor === color ? " active" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setCurrentColor(color)}
                  ></li>
                ))}
              </ul>
            </div>

            <div className="counter">
              <button type="button" onClick={() => adjustCount(-1)}>
                -
              </button>
              <h2>{counter}</h2>
              <button type="button" onClick={() => adjustCount(1)}>
                +
              </button>
            </div>
            <button className="main-btn" type="button" onClick={addToCart}>
              {btnLoading ? (
                <span className="loading-effect"></span>
              ) : (
                "add to cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Product;
