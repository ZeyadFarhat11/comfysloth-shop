const { createContext } = require("react");

const Context = createContext();

export const AppProvider = ({ children }) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};
