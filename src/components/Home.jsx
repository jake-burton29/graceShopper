import React, { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import ProductsCard from "./ProductsCard";
import { Button, Form } from "react-bootstrap";
import { getProductsByCategoryId } from "../axios-services/products";
import Carousel from "./Carousel";

// importing from react-bootstrap-icons is possible!

export default function Home() {
  const { products } = useProducts();
  const { categories } = useCategories();
  const [displayProducts, setDisplayProducts] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getProductsToDisplay = async () => {
      if (!categoryId) {
        setDisplayProducts(products);
      } else {
        const productsToDisplay = await getProductsByCategoryId(categoryId);
        setDisplayProducts(productsToDisplay);
      }
      function productMatches(product, text) {
        if (product.name.toLowerCase().includes(text)) {
          return true;
        } else if (product.description?.toLowerCase().includes(text)) {
          return true;
        } else {
          return false;
        }
      }
      if (searchTerm.length) {
        const filteredProducts = products.filter((product) =>
          productMatches(product, searchTerm.toLowerCase())
        );
        console.log("filtered", filteredProducts);
        setDisplayProducts(
          searchTerm.length ? filteredProducts : displayProducts
        );
      }
    };
    getProductsToDisplay();
  }, [categoryId, products, searchTerm]);

  return (
    <>
      <Carousel />
      <Form
        className="d-block mx-auto "
        style={{
          width: "85vw",
          boxShadow: "0 0 3px 2px #cec7c759",
          padding: 15,
          borderRadius: 20,
          marginBottom: 20,
          backgroundColor: "#434343",
        }}
      >
        <input
          style={{ width: "80vw" }}
          value={searchTerm}
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          style={{
            width: "15rem",
            backgroundColor: "#434343",
            border: "#434343",
          }}
          size="lg"
          onClick={() => {
            setCategoryId(null);
          }}
        >
          All
        </Button>

        {categories.map((category) => {
          return (
            <Button
              style={{
                width: "15rem",
                backgroundColor: "#434343",
                border: "#434343",
              }}
              size="lg"
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
