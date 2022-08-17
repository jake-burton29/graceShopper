import React, { useState } from "react";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import ProductsCard from "./ProductsCard";
import { Button, Carousel } from "react-bootstrap";

export default function Home() {
  const { products } = useProducts();
  const { categories } = useCategories();
  const [displayProducts, setDisplayProducts] = useState(null);

  function findProductsByCategory(id) {
    setDisplayProducts(products.filter((product) => product.categoryId === id));
  }

  return (
    <>
      <div>
        <Carousel variant="dark">
          <Carousel.Item>
            <img
              className="some code here to center"
              src="https://c1.neweggimages.com/ProductImage/83-227-920-V01.jpg"
              alt="First slide"
              height={400}
            />
            <Carousel.Caption>
              <h3>Epic Starter Pc You NEED</h3>
              <p>For real.. for on sale for only 9,000$</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="some code here to center"
              src="https://m.media-amazon.com/images/I/41NWfrMr-8L.jpg"
              alt="Second slide"
              height={400}
            />
            <Carousel.Caption>
              <h3>Why wont these images center??</h3>
              <p>
                We just need some bottom padding, greyed out sides, a caption,
                and it'd look ok
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="some code here to center"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaDc-SATHfce_moGUnpk5307NBUdAxfkuyanuuDyy0zTCEjIoeerVdgSv9oUmMzeB2TpI&usqp=CAU"
              alt="Third slide"
              height={400}
            />
            <Carousel.Caption>
              <h3>Damn Ramses</h3>
              <p>
                Some these images low quality fr fr. It called dummy data not
                supposed to BE dummy data
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
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
    </>
  );
}
