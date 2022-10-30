import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { getCartTotal } from "../utilities";
import "../style/checkout.scss";

function Checkout() {
  const { user, cart, setCart } = useGlobalContext();
  const [card, setCard] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const yearsRef = useRef();
  const monthsRef = useRef();
  const cvcRef = useRef();

  const numberOnly = (e, maxLength) => {
    if (
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      e.keyCode === 8
    ) {
      const inputLength = e.target.value.length;
      if (inputLength >= maxLength && e.keyCode !== 8) {
        e.preventDefault();
      }
    } else {
      e.preventDefault();
    }
  };

  const handleCard = (e) => {
    const array = [];
    const value = e.target.value
      .split("")
      .filter((e) => e && e !== " ")
      .join("");
    for (let i = 0; i < value.length; i += 4) {
      array.push(value.slice(i, i + 4));
    }

    setCard(array.join(" "));

    if (array.join("").length === 16) {
      monthsRef.current.focus();
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        clearCart();
        navigate("/", { replace: true });
      }, 3000);
    }, 2000);
  };

  return (
    <main className="checkout">
      <div className="page-path container">
        <Link to="/">home</Link> / checkout
      </div>
      <div className="container checkout-container">
        {!success ? (
          <div className="wrapper">
            <h3 className="greet">Hello, {user.displayName}</h3>
            <h4 className="total">
              your total is <span>${getCartTotal(cart)}</span>
            </h4>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className={`card-number ${
                  card.length === 19 ? "valid" : "unvalid"
                }`}
                value={card}
                onChange={handleCard}
                onKeyDown={(e) => numberOnly(e, 19)}
                placeholder="card number"
              />
              <div className="gap">
                <div className="date">
                  <input
                    type="text"
                    placeholder="MM"
                    ref={monthsRef}
                    onKeyDown={(e) => numberOnly(e, 2)}
                    onChange={(e) => {
                      if (e.target.value.length >= 2) {
                        yearsRef.current.focus();
                      }
                    }}
                  />
                  <input
                    type="text"
                    placeholder="YY"
                    ref={yearsRef}
                    onKeyDown={(e) => numberOnly(e, 2)}
                    onChange={(e) => {
                      if (e.target.value.length >= 2) {
                        cvcRef.current.focus();
                      }
                    }}
                  />
                </div>
                <input
                  type="text"
                  className="cvc"
                  ref={cvcRef}
                  placeholder="CVC"
                  onKeyDown={(e) => numberOnly(e, 3)}
                />
              </div>
              <button type="submit">
                {loading ? <span className="loading-effect"></span> : "pay"}
              </button>
            </form>
          </div>
        ) : (
          <div className="wrapper">
            <h2>
              Thank You Your Payment Was Successful! Redirecting To Home Page
              Shortly
            </h2>
          </div>
        )}
      </div>
    </main>
  );
}

export default Checkout;
