import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";

export default function ProductsCard({ product }) {
  const navigate = useNavigate();

  const { setTargetProduct } = useProducts();

  return (
    <div>
      <Card className="flex-row" style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title
            onClick={() => {
              setTargetProduct(product);
              navigate(`/products/${product.id}`);
            }}
          >
            Product: {product.name}
          </Card.Title>
          <Card.Img
            src={product.image_url}
            onClick={() => {
              setTargetProduct(product);
              navigate(`/products/${product.id}`);
            }}
          />
          <Card.Text>
            <p>Price: ${product.price}.00</p>
            <p>In Stock: {product.inventory} remaining</p>
            <p>Description: {product.description}</p>
          </Card.Text>
          <Button
            onClick={() => {
              //some func to add to cart
            }}
          >
            Add to Cart!
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
