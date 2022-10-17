import React from "react";
import { Link } from "react-router-dom";

function BoxProduct({ image, id, name, price }) {
  let editPrice = new Intl.NumberFormat().format(
    +price.toString().slice(0, -2)
  );

  return (
    <div className="box-product">
      <Link to={`/products/${id}`}>
        <img src={image} alt={name} />
      </Link>
      <div className="info">
        <h3 className="title">{name}</h3>
        <h3 className="price">${editPrice}.99</h3>
      </div>
    </div>
  );
}

export default BoxProduct;
