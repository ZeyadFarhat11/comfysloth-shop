const { createContext, useContext, useReducer, useState } = require("react");

const Context = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export const useGlobalContext = () => useContext(Context);
