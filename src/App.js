import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { useGlobalContext } from "./context";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Signup from "./pages/Signup";

function App() {
  const { loading } = useGlobalContext();
  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
