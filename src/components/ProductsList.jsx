import React from "react";
import { useGlobalContext } from "../context";
import BoxProduct from "./BoxProduct";

function ProductsList({
  query,
  category,
  company,
  color,
  price,
  freeShipping,
  type,
  sort,
}) {
  const { products } = useGlobalContext();

  const setProducts = () => {
    let cProducts = [...products];

    return cProducts.map((product) => <BoxProduct {...product} />);
  };

  return <>{setProducts()}</>;
}

export default ProductsList;
