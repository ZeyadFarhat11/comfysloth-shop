import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";
import { FaCheck, FaMinus, FaPlus } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { db } from "../firebase";
import useCounter from "../hooks/useCounter";
import "../style/product.scss";
import { randomId } from "../utilities";

function Product() {
  const { setLoading, user, cart } = useGlobalContext();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [count, dispatchCount] = useCounter();
  const [btnLoading, setBtnLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  function showMessage(message) {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }

  const addToCart = async () => {
    if (btnLoading) return;
    if (!user) {
      navigate("/login");
    }
    setBtnLoading(true);

    try {
      console.log("cart::", cart);
      const productObject = {
        quantity: count,
        color: currentColor,
        image: product.images[0].url,
        name: product.name,
        price: product.price,
        id: randomId(),
      };
      console.log(productObject);
      await updateDoc(doc(db, "users", user.uid), {
        cart: [...cart, productObject],
      });
      showMessage({
        text: "the product has been successfully added to cart",
        style: { color: "green" },
      });
    } catch (err) {
      console.log(err);
      showMessage({
        text: "an error occurredd while trying to add the product to cart",
        style: { color: "red" },
      });
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
      setCurrentImage(data.images[0].url);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!product) {
    return <></>;
  }

  return (
    <main className="product">
      <div className="page-path container">
        <Link to="/">home</Link> / <Link to="/products">products</Link> /{" "}
        {product.name}
      </div>
      <div className="product-container container">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-wrapper">
          <div className="gallery">
            <img src={currentImage} alt={product.name} className="main-img" />
            <div className="thumbs">
              {product.images.map((img) => (
                <img
                  src={img.url}
                  alt={product.name}
                  key={img.id}
                  className={currentImage === img.url ? "active" : ""}
                  onClick={() => setCurrentImage(img.url)}
                />
              ))}
            </div>
          </div>
          <div className="text">
            <h3 className="title">{product.name}</h3>
            <div className="stars">
              <div className="stars-wrapper">{setStars()}</div>
              <p>({product.reviews} customer reviews)</p>
            </div>
            <h4 className="price">
              $
              {Intl.NumberFormat().format(
                +product.price.toString().slice(0, -2)
              )}
              .99
            </h4>
            <p className="description">{product.description}</p>
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
                    className={`color`}
                    style={{ backgroundColor: color }}
                    onClick={() => setCurrentColor(color)}
                  >
                    {currentColor === color && <FaCheck />}
                  </li>
                ))}
              </ul>
            </div>

            <div className="counter">
              <button type="button" onClick={() => dispatchCount(-1)}>
                <FaMinus />
              </button>
              <h2>{count}</h2>
              <button type="button" onClick={() => dispatchCount(1)}>
                <FaPlus />
              </button>
            </div>
            <button
              className="btn submit-btn"
              type="button"
              onClick={addToCart}
            >
              {btnLoading ? (
                <span className="loading-effect"></span>
              ) : (
                "add to cart"
              )}
            </button>
            {message && (
              <p className="message" style={message.style}>
                {message.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Product;
