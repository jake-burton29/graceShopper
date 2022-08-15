import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import getProducts from "../axios-services/products";
import useProducts from "../hooks/useProducts";

export default function Home() {
  const { products } = useProducts();
  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <ProductsCard prodor={product} />
          </div>
        );
      })}
    </div>
  );
}
