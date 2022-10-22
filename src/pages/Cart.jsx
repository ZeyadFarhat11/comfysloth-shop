import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useGlobalContext } from "../context";
import { db } from "../firebase";
import { getCartTotal } from "../utilities";
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

  const total = getCartTotal(cart);
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
          <Link to="/products" className="btn">
            continue shopping
          </Link>
          <button type="button" className="btn clear" onClick={clear}>
            clear shopping cart
          </button>
        </div>
        <div className="checkout-info">
          <div className="wrapper">
            <div className="info">
              <p className="subtotal">
                <span>subtotal :</span>
                <span>${total}</span>
              </p>
              <p>
                <span>shipping fee :</span>
                <span>$5.34</span>
              </p>
              <hr />
              <h2 className="order-total">
                <span>order total :</span>
                <span>${+total + 5.34}</span>
              </h2>
            </div>
            <Link to="/checkout" className="btn">
              proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
