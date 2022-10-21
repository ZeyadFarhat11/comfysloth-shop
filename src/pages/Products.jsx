import React, { useState } from "react";
import { Link } from "react-router-dom";
import BoxProduct from "../components/BoxProduct";
import ListProduct from "../components/ListProduct";
import { useGlobalContext } from "../context";
import { FaList, FaCheck } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import "../style/products.scss";

function Products() {
  const { products } = useGlobalContext();
  const [isList, setIsList] = useState(false);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(3099);
  const [sort, setSort] = useState("");
  const [freeShipping, setFreeShipping] = useState(false);

  const clear = () => {
    setQuery("");
    setCategory("");
    setCompany("");
    setColor("");
    setPrice(3099);
    setSort("lowest");
    setFreeShipping(false);
  };

  let fProducts = [...products];

  if (query) {
    fProducts = fProducts.filter((p) => p.name.includes(query));
  }
  if (category) {
    fProducts = fProducts.filter((p) => p.category === category);
  }
  if (company) {
    fProducts = fProducts.filter((p) => p.company === company);
  }
  if (color) {
    fProducts = fProducts.filter((p) => p.colors.includes(color));
  }
  if (price) {
    fProducts = fProducts.filter(
      (p) => +p.price.toString().slice(0, -2) <= price
    );
  }
  if (sort === "lowest") {
    fProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "heighest") {
    fProducts.sort((a, b) => b.price - a.price);
  } else if (sort === "asc") {
    fProducts.sort((a, b) => a.name.localeCompare(b));
  } else if (sort === "desc") {
    fProducts.sort((a, b) => (a.name.localeCompare(b) === 1 ? -1 : 1));
  }
  if (freeShipping) {
    fProducts = fProducts.filter((e) => e.shipping);
  }

  return (
    <main className="products">
      <div className="page-path container">
        <Link>home</Link> / products
      </div>
      <div className="products-container container">
        <div className="sort-tools-wrapper">
          <div className="sort-tools">
            <div className="search">
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="section">
              <h4>category</h4>
              <ul className="categories">
                <li
                  className={category === "" ? "active" : ""}
                  onClick={() => setCategory("")}
                >
                  all
                </li>
                <li
                  className={category === "office" ? "active" : ""}
                  onClick={() => setCategory("office")}
                >
                  office
                </li>
                <li
                  className={category === "living room" ? "active" : ""}
                  onClick={() => setCategory("living room")}
                >
                  living room
                </li>
                <li
                  className={category === "kitchen" ? "active" : ""}
                  onClick={() => setCategory("kitchen")}
                >
                  kitchen
                </li>
                <li
                  className={category === "bedroom" ? "active" : ""}
                  onClick={() => setCategory("bedroom")}
                >
                  bedroom
                </li>
                <li
                  className={category === "dinking" ? "active" : ""}
                  onClick={() => setCategory("dinking")}
                >
                  dinking
                </li>
                <li
                  className={category === "kids" ? "active" : ""}
                  onClick={() => setCategory("kids")}
                >
                  kids
                </li>
              </ul>
            </div>
            <div className="section">
              <h4>company</h4>
              <select
                className="company-select"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              >
                <option value="">all</option>
                <option value="marcos">marcos</option>
                <option value="liddy">liddy</option>
                <option value="ikea">ikea</option>
                <option value="caressa">caressa</option>
              </select>
            </div>
            <div className="section">
              <h4>colors</h4>
              <ul className="colors">
                <li
                  onClick={(_) => setColor("")}
                  className={!color ? "active" : ""}
                >
                  all
                </li>
                <li
                  onClick={(_) => setColor("#ff0000")}
                  className="color"
                  style={{ backgroundColor: "#ff0000" }}
                >
                  {color === "#ff0000" && <FaCheck />}
                </li>
                <li
                  onClick={(_) => setColor("#00ff00")}
                  className="color"
                  style={{ backgroundColor: "#00ff00" }}
                >
                  {color === "#00ff00" && <FaCheck />}
                </li>
                <li
                  onClick={(_) => setColor("#0000ff")}
                  className="color"
                  style={{ backgroundColor: "#0000ff" }}
                >
                  {color === "#0000ff" && <FaCheck />}
                </li>
                <li
                  onClick={(_) => setColor("#000")}
                  className="color"
                  style={{ backgroundColor: "#000" }}
                >
                  {color === "#000" && <FaCheck />}
                </li>
                <li
                  onClick={(_) => setColor("#ffb900")}
                  className="color"
                  style={{ backgroundColor: "#ffb900" }}
                >
                  {color === "#ffb900" && <FaCheck />}
                </li>
              </ul>
            </div>
            <div className="section">
              <h4>price</h4>
              <div className="price">
                <label htmlFor="price-range">
                  ${Intl.NumberFormat().format(price)}
                </label>
                <input
                  type="range"
                  id="price-range"
                  max="3099"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="free-shipping">
              <label htmlFor="free-shipping">free shipping</label>
              <input
                type="checkbox"
                id="free-shipping"
                onChange={(e) => setFreeShipping(e.target.checked)}
              />
            </div>
            <button className="clear" onClick={clear}>
              clear filters
            </button>
          </div>
        </div>
        <div className="products-wrapper">
          <div className="wrapper-head">
            <div className="btn-container">
              <button
                type="button"
                className={!isList ? "active" : ""}
                onClick={() => setIsList(false)}
              >
                <BsGridFill />
              </button>
              <button
                type="button"
                className={isList ? "active" : ""}
                onClick={() => setIsList(true)}
              >
                <FaList />
              </button>
            </div>
            <p>{fProducts.length} products found</p>
            <div className="line"></div>
            <div className="sort-by">
              <span>sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="lowest">Price (Lowest)</option>
                <option value="heighest">Price (Heighest)</option>
                <option value="asc">name (A - Z)</option>
                <option value="desc">name (Z - A)</option>
              </select>
            </div>
          </div>
          <div className={!isList ? "wrapper-body grid" : "wrapper-body list"}>
            {isList
              ? fProducts.map((product) => (
                  <ListProduct key={product.id} {...product} />
                ))
              : fProducts.map((product) => (
                  <BoxProduct key={product.id} {...product} />
                ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Products;
