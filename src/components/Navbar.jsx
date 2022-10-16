import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { Link, NavLink } from "react-router-dom";
import logo from "../imgs/logo.svg";
import "../style/header.scss";

export const Header = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <header className="container">
        <img src={logo} alt="logo" className="logo" />
        <div className={`menu${menu ? " active" : ""}`}>
          <nav>
            <NavLink to="/" end>
              home
            </NavLink>
            <NavLink to="/about">about</NavLink>
            <NavLink to="/products">products</NavLink>
          </nav>
          <div className="btns">
            <Link to="/cart" className="cart" data-items-count="5">
              <FaShoppingCart />
            </Link>
            <Link className="login" to="/login">
              login
            </Link>
          </div>
        </div>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenu((e) => !e)}
        >
          <GoThreeBars />
        </button>
      </header>
      {menu && <div className="layer" onClick={() => setMenu(false)}></div>}
    </>
  );
};

