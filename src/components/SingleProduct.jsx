import React from "react";
import { Card, Button } from "react-bootstrap";

export default function SingleProduct() {
  return (
    <div>
      <Card>
        <Card.Title>Product: {product.name}</Card.Title>
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
