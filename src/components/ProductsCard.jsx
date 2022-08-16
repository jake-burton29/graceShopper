import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";

export default function ProductsCard({ product }) {
  return (
    <div className="d-flex flex-nowrap">
      <Card>
        <Card.Title>Product: {product.name}</Card.Title>
        <Card.Img src={product.image_url} className="w-50 p-3" />
        <Card.Body>Price: {product.price}</Card.Body>
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
