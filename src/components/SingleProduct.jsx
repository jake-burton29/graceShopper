import React from "react";
import { Card, Button } from "react-bootstrap";
import useProducts from "../hooks/useProducts";

export default function SingleProduct() {
  const { targetProduct } = useProducts();

  return (
    <div>
      <Card>
        <Card.Title>Product: {targetProduct.name}</Card.Title>
        <Card.Img src={targetProduct.image_url} className="w-50 p-3" />
        <Card.Body>Price: {targetProduct.price}</Card.Body>
        <Card.Text>In Stock: {targetProduct.inventory}</Card.Text>
        <Card.Text>Description: {targetProduct.description}</Card.Text>
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
