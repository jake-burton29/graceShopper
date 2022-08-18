import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart"

export default function ProductsCard({ product }) {
  const navigate = useNavigate();
  const {cart, setCart} = useCart();
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
          <Card.Text>Price: ${product.price}.00</Card.Text>
          <Card.Text>In Stock: {product.inventory} remaining.</Card.Text>
          <Card.Text>Description: {product.description}</Card.Text>

          <Button
            onClick={async () => {
              //some func to add to cart
              if ()
            }}
          >
            Add to Cart!
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
