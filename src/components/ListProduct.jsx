import React from "react";
import { Link } from "react-router-dom";

function ListProduct({ image, id, name, price, description }) {
  return (
    <div className="list-product">
      <img src={image} alt={name} />
      <div className="text">
        <h3>{name}</h3>
        <h4 className="price">
          ${Intl.NumberFormat().format(price.toString().slice(0, -2))}.99
        </h4>
        <p>{description.slice(0, 150)}...</p>
        <Link to={`/products/${id}`}>details</Link>
      </div>
    </div>
  );
}

export default ListProduct;
