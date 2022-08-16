import React, { useState } from "react";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import ProductsCard from "./ProductsCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

export default function Home() {
  const { products } = useProducts();
  const { categories } = useCategories();
  const [displayProducts, setDisplayProducts] = useState(null);

  function findProductsByCategory(id) {
    setDisplayProducts(products.filter((product) => product.categoryId === id));
  }

  return (
    <div>
      <div>
        <h3>Categories:</h3>
        <Button
          className="btn-success"
          onClick={() => {
            setDisplayProducts(products);
          }}
        >
          All
        </Button>

        {categories.map((category) => {
          return (
            <Button
              className="btn-danger"
              key={category.id}
              onClick={() => {
                findProductsByCategory(category.id);
              }}
            >
              {category.name}
            </Button>
          );
        })}
      </div>

      {displayProducts
        ? displayProducts.map((product) => {
            return (
              <div key={product.id}>
                <ProductsCard product={product} />
              </div>
            );
          })
        : products.map((product) => {
            return (
              <div key={product.id}>
                <ProductsCard product={product} />
              </div>
            );
          })}
    </div>
  );
}
