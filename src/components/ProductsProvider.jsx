import React, { useState, useEffect } from "react";
import { getProducts } from "../axios-services/products";
import { ProductsContext } from "../CreateContext";

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [targetProduct, setTargetProduct] = useState({});

  useEffect(() => {
    const getAllProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    getAllProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, targetProduct, setTargetProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
