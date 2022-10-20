import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductsList from "../components/ProductsList";
import "../style/products.scss";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // searchParams.set()

  const insertParam = (key, value) => {
    searchParams.forEach((e) => console.log(e));
  };

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
              onChange={(e) => {
                if (!e.target.value) return;
                searchParams.set("query", e.target.value);
                setSearchParams(searchParams);
              }}
            />
          </div>
          <div className="section">
            <h4>category</h4>
            <ul className="categories">
              <li
                onClick={() => {
                  searchParams.set("category", "all");
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
                searchParams.set("company", e.target.value);
                setSearchParams(searchParams);
              }}
            >
              <option value="all">all</option>
              <option value="macros">macros</option>
              <option value="liddy">liddy</option>
              <option value="ikea">ikea</option>
              <option value="caressa">caressa</option>
            </select>
          </div>
          <div className="section">
            <h4>colors</h4>
            <ul className="colors">
              <li>all</li>
              <li
                className="color"
                style={{ backgroundColor: "red" }}
                onClick={() => {
                  searchParams.set("color", "red");
                  setSearchParams(searchParams);
                }}
              ></li>
              <li
                className="color"
                style={{ backgroundColor: "green" }}
                onClick={() => {
                  searchParams.set("color", "green");
                  setSearchParams(searchParams);
                }}
              ></li>
              <li
                className="color"
                style={{ backgroundColor: "blue" }}
                onClick={() => {
                  searchParams.set("color", "blue");
                  setSearchParams(searchParams);
                }}
              ></li>
              <li
                className="color"
                style={{ backgroundColor: "black" }}
                onClick={() => {
                  searchParams.set("color", "black");
                  setSearchParams(searchParams);
                }}
              ></li>
              <li
                className="color"
                style={{ backgroundColor: "gold" }}
                onClick={() => {
                  searchParams.set("color", "gold");
                  setSearchParams(searchParams);
                }}
              ></li>
            </ul>
          </div>
          <div className="section">
            <h4>price</h4>
            <div className="price">
              <label htmlFor=""></label>
              <input
                type="range"
                max="3099.99"
                step="5"
                defaultValue="3099.99"
              />
            </div>
          </div>
        </div>
        <div className="products-wrapper">
          <div className="wrapper-head"></div>
          <div className="wrapper-body">
            <ProductsList searchParams={searchParams} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Products;
