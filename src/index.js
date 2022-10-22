import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ScrollTop from "./components/ScrollTop";
import { AppProvider } from "./context";
import "./style/style.scss";

console.log(`from index`);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppProvider>
      <ScrollTop>
        <App />
      </ScrollTop>
    </AppProvider>
  </BrowserRouter>
);
