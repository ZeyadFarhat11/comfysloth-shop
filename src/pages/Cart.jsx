import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useGlobalContext } from "../context";
import { db } from "../firebase";
import useCounter from "../hooks/useCounter";
import "../style/cart.scss";

function Cart() {
  const { cart, user } = useGlobalContext();

  const clear = () => {
    if (window.confirm()) {
      updateDoc(doc(db, "users", user.uid), {
        cart: [],
      });
    }
  };

  if (!cart.length) {
    return (
      <main className="cart-container empty">
        <h1>your cart is empty</h1>
        <Link to="/products" className="btn">
          fill it
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-container">
      <div className="page-path container">
        <Link to="/">home</Link> / cart
      </div>
      <div className="cart-wrapper container">
        <div className="table">
          <div className="head">
            <span>item</span>
            <span>price</span>
            <span>quantity</span>
            <span>subtotal</span>
          </div>
          <div className="body">
            {cart.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
        </div>
        <div className="btn-container">
          <button type="button" className="btn">
            continue shopping
          </button>
          <button type="button" className="btn" onClick={clear}>
            clear shopping cart
          </button>
        </div>
      </div>
    </main>
  );
}

export default Cart;
