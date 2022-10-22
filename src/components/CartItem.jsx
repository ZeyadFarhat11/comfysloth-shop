import React, { useEffect } from "react";
import useCounter from "../hooks/useCounter";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useGlobalContext } from "../context";

function CartItem({ quantity, color, image, name, price, id, stock }) {
  const { user, cart } = useGlobalContext();

  const [count, dispatch] = useCounter(quantity);

  useEffect(() => {
    updateDoc(doc(db, "users", user.uid), {
      cart: cart.map((e) => {
        if (e.id === id) {
          return { ...e, quantity: count };
        }
        return e;
      }),
    });
  }, [count]);

  const fixedPrice = `$${Intl.NumberFormat().format(
    price.toString().slice(0, -2)
  )}.99`;

  const total =
    "$" + ((+price.toString().slice(0, -2) + 0.99) * count).toFixed(2);

  const deleteItem = () => {
    updateDoc(doc(db, "users", user.uid), {
      cart: cart.filter((e) => e.id !== id),
    });
  };

  return (
    <div className="cart-item">
      <div className="item-info">
        <img src={image} alt={name} />
        <div className="text">
          <h4>{name}</h4>
          <div className="color-wrapper">
            color:
            <span className="color" style={{ backgroundColor: color }}></span>
          </div>
          <div className="price">{fixedPrice}</div>
        </div>
      </div>
      <span className="price">{fixedPrice}</span>
      <div className="quantity">
        <button type="button" onClick={() => dispatch(-1, stock)}>
          <FaMinus />
        </button>
        <h2>{count}</h2>
        <button type="button" onClick={() => dispatch(1, stock)}>
          <FaPlus />
        </button>
      </div>
      <span className="total">{total}</span>
      <button className="delete" type="button" onClick={deleteItem}>
        <FaTrash />
      </button>
    </div>
  );
}

export default CartItem;
