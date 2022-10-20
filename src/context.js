import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();
const url = "https://course-api.com/react-store-products";

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log("fetched success", response);
      setProducts(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Context.Provider value={{ user, setUser, products, setProducts, loading }}>
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => useContext(Context);
