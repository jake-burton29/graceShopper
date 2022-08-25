import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CategoriesProvider from "./components/CategoriesProvider";
import ProductsProvider from "./components/ProductsProvider";
import CartProvider from "./components/CartProvider";
import AuthProvider from "./components/AuthProvider";

import "./style/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <CategoriesProvider>
      <ProductsProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
    </CategoriesProvider>
  </AuthProvider>
);
