import React from "react";
import { Routes, Route } from "react-router-dom";
import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Home,
  NavBar,
  Login,
  Register,
  ShoppingCart,
  SingleProduct,
  SingleOrder,
  Profile,
  Checkout,
} from "./components";
import Favicon from "react-favicon";

const App = () => {
  return (
    <div id="appContainer">
      <Favicon url="https://i.ibb.co/87t5mNr/favicon.png"></Favicon>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/orders/:id" element={<SingleOrder />} />
      </Routes>
    </div>
  );
};

export default App;
