import React, { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import ProductsCard from "./ProductsCard";
import { Button } from "react-bootstrap";
import { getProductsByCategoryId } from "../axios-services/products";
import Carousel from "./Carousel";

// importing from react-bootstrap-icons is possible!

export default function Home() {
  const { products } = useProducts();
  const { categories } = useCategories();
  const [displayProducts, setDisplayProducts] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const getProductsToDisplay = async () => {
      if (!categoryId) {
        setDisplayProducts(products);
      } else {
        const productsToDisplay = await getProductsByCategoryId(categoryId);
        setDisplayProducts(productsToDisplay);
      }
    };
    getProductsToDisplay();
  }, [categoryId, products]);

  return (
    <>
      <Carousel />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          style={{ width: "15rem" }}
          size="lg"
          variant="dark"
          onClick={() => {
            setCategoryId(null);
          }}
        >
          All
        </Button>

        {categories.map((category) => {
          return (
            <Button
              style={{ width: "15rem" }}
              size="lg"
              variant="dark"
              key={category.id}
              onClick={() => {
                setCategoryId(category.id);
              }}
            >
              {category.name}
            </Button>
          );
        })}
      </div>
      <div className="wrapcards">
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
    </>
  );
}
