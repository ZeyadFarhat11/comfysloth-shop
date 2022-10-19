import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();
const url = "https://course-api.com/react-store-products";

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log("fetched success", response);
      // console.log(
      //   `test:`,
      //   data.every((e) =>
      //     e.price.toString().length === 6 ? true : console.log(e)
      //   )
      // );
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err);
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
