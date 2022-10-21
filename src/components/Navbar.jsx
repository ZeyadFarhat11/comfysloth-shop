import { signOut } from "firebase/auth";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { Link, NavLink } from "react-router-dom";
import { useGlobalContext } from "../context";
import { auth } from "../firebase";
import logo from "../imgs/logo.svg";
import "../style/header.scss";

export const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { user, setUser, cart } = useGlobalContext();

  const logout = () => {
    setMenu(false);
    signOut(auth).then(() => {
      console.log(`signed out`);
      setUser(null);
    });
  };

  return (
    <>
      <header className="container">
        <img src={logo} alt="logo" className="logo" />
        <div className={`menu${menu ? " active" : ""}`}>
          <nav>
            <NavLink to="/" end onClick={() => setMenu(false)}>
              home
            </NavLink>
            <NavLink to="/about" onClick={() => setMenu(false)}>
              about
            </NavLink>
            <NavLink to="/products" onClick={() => setMenu(false)}>
              products
            </NavLink>
            {!!user && (
              <NavLink to="/checkout" onClick={() => setMenu(false)}>
                checkout
              </NavLink>
            )}
          </nav>
          <div className="btns">
            <NavLink
              to="/cart"
              className={`cart${cart.length ? " contain" : ""}`}
              data-items-count={cart.length}
              onClick={() => setMenu(false)}
            >
              <FaShoppingCart />
            </NavLink>
            {!user ? (
              <Link
                className="login"
                to="/login"
                onClick={() => setMenu(false)}
              >
                login
              </Link>
            ) : (
              <button type="button" onClick={logout} className="logout">
                logout
              </button>
            )}
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
