import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import {
  createProductOrder,
  editProductOrder,
} from "../axios-services/product_orders";
import { CartPlus, CartCheck } from "react-bootstrap-icons";

export default function ProductsCard({ product }) {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const { user } = useAuth();
  const [addedToCart, setAddedToCart] = useState(false);
  async function addToCart() {
    let productOrderIndex = -1;
    productOrderIndex = cart.product_orders?.findIndex(
      (product_order) => product_order.productId === product.id
    );
    if (productOrderIndex !== undefined && productOrderIndex !== -1) {
      console.log("Adding another to cart!");
      const cartCopy = { ...cart };
      cartCopy.product_orders[productOrderIndex].quantity += 1;
      setCart(cartCopy);
      if (user) {
        await editProductOrder(
          cart.product_orders[productOrderIndex].quantity + 1,
          cart.product_orders[productOrderIndex].id
        );
      } else {
        localStorage.setItem("guestCart", JSON.stringify(cart));
      }
    } else {
      console.log("Creating a new product_order!");
      if (user) {
        const newProductOrder = await createProductOrder(
          product.id,
          cart.id,
          1
        );
        if (cart.product_orders) {
          setCart({
            ...cart,
            product_orders: [...cart.product_orders, newProductOrder],
          });
        } else {
          setCart({ ...cart, product_orders: [newProductOrder] });
        }
      } else {
        const newProductOrder = {
          id: product.id,
          productId: product.id,
          products: product,
          quantity: 1,
        };
        if (cart.product_orders) {
          setCart({
            ...cart,
            product_orders: [...cart.product_orders, newProductOrder],
          });
        } else {
          setCart({ ...cart, product_orders: [newProductOrder] });
        }
        localStorage.setItem("guestCart", JSON.stringify(cart));
      }
    }
  }

  return (
    <div>
      <Card className="flex-row" style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title
            className="cardTitle"
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              marginBottom: "20px",
              height: "40px",
            }}
            onClick={() => {
              navigate(`/products/${product.id}`);
            }}
          >
            {product.name}
          </Card.Title>
          <Card.Img
            className="productImage"
            style={{ marginBottom: "15px" }}
            src={product.image_url}
            onClick={() => {
              navigate(`/products/${product.id}`);
            }}
          />
          <Card.Text>Price: ${product.price}.00</Card.Text>
          <Card.Text>In Stock: {product.inventory} remaining</Card.Text>
          <Card.Text>
            Description: {product.description.substring(0, 75)}...
          </Card.Text>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {!addedToCart ? (
              <Button
                variant="dark"
                onClick={async () => {
                  addToCart();
                  setAddedToCart(true);
                  setTimeout(() => {
                    setAddedToCart(false);
                  }, 2000);
                }}
              >
                Add to Cart! <CartPlus size={25} />
              </Button>
            ) : (
              <Button variant="success">
                Added to Cart! <CartCheck size={25} />
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
