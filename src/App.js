import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { Navbar } from "./components/Navbar";
import { RequireUser } from "./components/RequireUser";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Loading />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/cart"
          element={
            <RequireUser>
              <Cart />
            </RequireUser>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequireUser>
              <Checkout />
            </RequireUser>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
