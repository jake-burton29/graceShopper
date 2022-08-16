import React, { useState } from "react";
import { Card, Button, Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";

export default function ProductsCard({ product }) {
  const navigate = useNavigate();

  const { setTargetProduct } = useProducts();

  return (
    <div className="d-flex flex-nowrap">
      <Card
        onClick={() => {
          setTargetProduct(product);
          navigate(`/products/${product.id}`);
        }}
      >
        <Breadcrumb>Product: {product.name}</Breadcrumb>
        <Card.Img src={product.image_url} className="w-50 p-3" />
        <Card.Body>Price: {product.price}</Card.Body>
        <Card.Text>In Stock: {product.inventory}</Card.Text>
        <Card.Text>Description: {product.description}</Card.Text>
        <Button
          onClick={() => {
            //some func to add to cart
          }}
        >
          Add to Cart!
        </Button>
      </Card>
    </div>
  );
}
