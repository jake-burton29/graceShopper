import React, { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import ProductsCard from "./ProductsCard";
import { Button, Carousel } from "react-bootstrap";
import { getProductsByCategoryId } from "../axios-services/products";

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
      <div>
        {
          // Break Carousel into separate component
        }
        <Carousel variant="dark">
          <Carousel.Item>
            <img
              className="d-block mx-auto "
              style={{ marginBottom: 140 }}
              src="https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660935299/R2S-8_1_22_badiyy.png"
              alt="First slide"
              height={400}
            />
            <Carousel.Caption className="bgC">
              <h3>Godly Starter Streaming PC's </h3>
              <p>For real.. for on sale for only 9,000$</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block mx-auto "
              style={{ marginBottom: 140 }}
              src="https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660934931/6471870cv2d_wmoynh.jpg"
              alt="Second slide"
              height={400}
            />
            <Carousel.Caption className="bgC">
              <h3>Why wont these images center??</h3>
              <p>
                We just need some bottom padding, greyed out sides, a caption,
                and it'd look ok
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block mx-auto "
              style={{ marginBottom: 140 }}
              src="https://res.cloudinary.com/dgnfm1iyp/image/upload/v1660934718/PhoenixMain45-Edit-Edit_dlree6.jpg"
              alt="Third slide"
              height={400}
            />
            <Carousel.Caption className="bgC">
              <h3>Custom Keyboards</h3>
              <p>
                We sell some of the most popular custom keybaords, shipping
                world wide with 10% sale with the purchase of two items or more!
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <h3>Categories:</h3>
        <Button
          className="btn-success"
          onClick={() => {
            setCategoryId(null);
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
