import React, { useEffect, useState } from "react";
import { getProducts } from "../axios-services/products";

export default function ProductsCard() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const result = await getProducts();
      setProducts(result);
    };
    getProducts();
  }, []);

  return (
    <div>
      <form>{products.map({
        return (
            <ProductsCard />
        );
      })}</form>
    </div>
  );
}
