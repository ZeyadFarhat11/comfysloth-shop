import React, { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BoxProduct from "../components/BoxProduct";
import ListProduct from "../components/ListProduct";
import ProductsList from "../components/ProductsList";
import { useGlobalContext } from "../context";
import "../style/products.scss";

function Products() {
  const { products } = useGlobalContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isList, setIsList] = useState(false);
  const priceLabel = useRef();

  let fProducts = [...products];
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const company = searchParams.get("company");
  const color = searchParams.get("color");
  const price = searchParams.get("price");
  const sort = searchParams.get("sort");
  const freeShipping = searchParams.get("free_shipping");

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
  if (sort) {
    if (sort === "heighest") {
      fProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "asc") {
      fProducts.sort((a, b) => a.name.localeCompare(b));
    } else if (sort === "desc") {
      fProducts.sort((a, b) => (a.name.localeCompare(b) === 1 ? -1 : 1));
    }
  } else {
    fProducts.sort((a, b) => a.price - b.price);
  }

  return (
    <main className="products">
      <div className="page-path container">
        <Link>home</Link> / products
      </div>
      <div className="products-container">
        <div className="sort-tools">
          <div className="search">
            <input
              type="text"
              placeholder="Search"
              defaultValue={query || ""}
              onChange={(e) => {
                if (!e.target.value.trim()) {
                  searchParams.delete("query");
                } else {
                  searchParams.set("query", e.target.value);
                }
                setSearchParams(searchParams);
              }}
            />
          </div>
          <div className="section">
            <h4>category</h4>
            <ul className="categories">
              <li
                onClick={() => {
                  searchParams.delete("category");
                  setSearchParams(searchParams);
                }}
              >
                all
              </li>
              <li
                onClick={() => {
                  searchParams.set("category", "office");
                  setSearchParams(searchParams);
                }}
              >
                office
              </li>
              <li
                onClick={() => {
                  searchParams.set("category", "living room");
                  setSearchParams(searchParams);
                }}
              >
                living room
              </li>
              <li
                onClick={() => {
                  searchParams.set("category", "kitchen");
                  setSearchParams(searchParams);
                }}
              >
                kitchen
              </li>
              <li
                onClick={() => {
                  searchParams.set("category", "bedroom");
                  setSearchParams(searchParams);
                }}
              >
                bedroom
              </li>
              <li
                onClick={() => {
                  searchParams.set("category", "dinking");
                  setSearchParams(searchParams);
                }}
              >
                dinking
              </li>
              <li
                onClick={() => {
                  searchParams.set("category", "kids");
                  setSearchParams(searchParams);
                }}
              >
                kids
              </li>
            </ul>
          </div>
          <div className="section">
            <h4>company</h4>
            <select
              className="company-select"
              defaultValue="all"
              onChange={(e) => {
                if (e.target.value === "all") {
                  searchParams.delete("company");
                } else {
                  searchParams.set("company", e.target.value);
                }
                setSearchParams(searchParams);
              }}
            >
              <option value="all">all</option>
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
                onClick={() => {
                  searchParams.delete("color");
                  setSearchParams(searchParams);
                }}
              >
                all
              </li>
              <li
                className="color"
                style={{ backgroundColor: "red" }}
                onClick={() => {
                  searchParams.set("color", "#ff0000");
                  setSearchParams(searchParams);
                }}
              ></li>
              <li
                className="color"
                style={{ backgroundColor: "green" }}
                onClick={() => {
                  searchParams.set("color", "#00ff00");
                  setSearchParams(searchParams);
                }}
              ></li>
              <li
                className="color"
                style={{ backgroundColor: "blue" }}
                onClick={() => {
                  searchParams.set("color", "#0000ff");
                  setSearchParams(searchParams);
                }}
              ></li>
              <li
                className="color"
                style={{ backgroundColor: "black" }}
                onClick={() => {
                  searchParams.set("color", "#000");
                  setSearchParams(searchParams);
                }}
              ></li>
              <li
                className="color"
                style={{ backgroundColor: "#ffb900" }}
                onClick={() => {
                  searchParams.set("color", "#ffb900");
                  setSearchParams(searchParams);
                }}
              ></li>
            </ul>
          </div>
          <div className="section">
            <h4>price</h4>
            <div className="price">
              <label htmlFor="price-range" ref={priceLabel}>
                ${Intl.NumberFormat().format(price || 3099)}
              </label>
              <input
                type="range"
                id="price-range"
                max="3099"
                defaultValue={price || 3099}
                onChange={(e) => {
                  priceLabel.current.innerHTML = `$${new Intl.NumberFormat().format(
                    e.target.value
                  )}`;
                  if (e.target.value === "3099") {
                    searchParams.delete("price");
                  } else {
                    searchParams.set("price", e.target.value);
                  }
                  setSearchParams(searchParams);
                }}
              />
            </div>
          </div>
          <div className="free-shipping">
            <span>free shipping</span>
            <input
              type="checkbox"
              defaultChecked={!!freeShipping}
              onChange={(e) => {
                if (e.target.checked) {
                  searchParams.set("free_shipping", "true");
                } else {
                  searchParams.delete("free_shipping");
                }
                setSearchParams(searchParams);
              }}
            />
          </div>
        </div>
        <div className="products-wrapper">
          <div className="wrapper-head">
            <div className="btn-container">
              <button type="button"></button>
              <button type="button"></button>
            </div>
            <p>{fProducts.length} products found</p>
            <div className="line"></div>
            <div className="sort-by">
              <span>sort by</span>
              <select
                defaultValue={sort || "lowest"}
                onChange={(e) => {
                  if (e.target.value === "lowest") {
                    searchParams.delete("sort");
                  } else {
                    searchParams.set("sort", e.target.value);
                  }
                  setSearchParams(searchParams);
                }}
              >
                <option value="lowest">Price (Lowest)</option>
                <option value="heighest">Price (Heighest)</option>
                <option value="asc">name (A - Z)</option>
                <option value="desc">name (Z - A)</option>
              </select>
            </div>
          </div>
          <div className="wrapper-body">
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
