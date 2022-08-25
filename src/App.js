import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getAPIHealth } from "./axios-services";
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
  const [APIHealth, setAPIHealth] = useState("");

  useEffect(() => {
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };
    getAPIStatus();
  }, []);

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
