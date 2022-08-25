import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { PlusCircle, DashCircle } from "react-bootstrap-icons";
import Stack from "react-bootstrap/Stack";
import {
  editProductOrder,
  deleteProductOrder,
} from "../axios-services/product_orders";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const { user } = useAuth();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    cart.product_orders?.forEach((product_order) => {
      sum += product_order.products.price * product_order.quantity;
    });
    setTotal(sum);
  }, [cart]);

  async function incrementQuantity(productId) {
    let productOrderIndex = -1;
    productOrderIndex = cart.product_orders?.findIndex(
      (product_order) => product_order.productId === productId
    );
    const cartCopy = { ...cart };
    cartCopy.product_orders[productOrderIndex].quantity += 1;
    setCart(cartCopy);
    if (user) {
      await editProductOrder(
        cart.product_orders[productOrderIndex].quantity + 1,
        cart.product_orders[productOrderIndex].id
      );
    } else {
      localStorage.setItem("guestCart", JSON.stringify(cartCopy));
    }
  }

  async function decrementQuantity(productId) {
    let productOrderIndex = -1;
    productOrderIndex = cart.product_orders?.findIndex(
      (product_order) => product_order.productId === productId
    );
    const cartCopy = { ...cart };
    cartCopy.product_orders[productOrderIndex].quantity -= 1;
    setCart(cartCopy);
    if (user) {
      await editProductOrder(
        cart.product_orders[productOrderIndex].quantity - 1,
        cart.product_orders[productOrderIndex].id
      );
    } else {
      localStorage.setItem("guestCart", JSON.stringify(cartCopy));
    }
  }

  async function removeFromCart(productOrderId) {
    const cartCopy = { ...cart };
    cartCopy.product_orders = cartCopy.product_orders.filter(
      (product_order) => product_order.id !== productOrderId
    );
    setCart(cartCopy);
    if (user) {
      await deleteProductOrder(productOrderId);
    } else {
      localStorage.setItem("guestCart", JSON.stringify(cartCopy));
    }
  }

  async function emptyCart() {
    const cartCopy = { ...cart };
    for (let i = 0; i < cartCopy.product_orders.length; i++) {
      if (user) {
        deleteProductOrder(cartCopy.product_orders[i].id);
      }
      cartCopy.product_orders.splice(i);
    }
    setCart(cartCopy);
    if (!user) {
      localStorage.setItem("guestCart", JSON.stringify(cartCopy));
    }
  }

  return (
    <div>
      {cart.product_orders?.length > 0 ? (
        <div className="checkoutHeader">
          <h3>Your Total: ${total}</h3>
          <Stack direction="horizontal" gap={3}>
            <Button
              style={{ backgroundColor: "#434343", border: "#434343" }}
              onClick={async () => {
                navigate("/checkout");
              }}
            >
              Check Out!
            </Button>
            <Button
              // variant="outline-dark"
              style={{ backgroundColor: "#ffc663", border: "#434343" }}
              onClick={async () => {
                emptyCart();
              }}
            >
              Empty Cart
            </Button>
          </Stack>
        </div>
      ) : (
        <div className="checkoutHeader">
          <p>There is nothing in your cart!</p>
          <Button
            style={{ backgroundColor: "#ffc663", border: "#434343" }}
            onClick={async () => {
              navigate("/");
            }}
          >
            Browse Our Products
          </Button>
        </div>
      )}
      {cart.product_orders?.length > 0 ? (
        <div className="flexContainer">
          {cart.product_orders?.map((product_order) => {
            return (
              <Card
                className="flexItem"
                style={{ width: "20rem", height: "32rem" }}
                key={product_order.productId}
              >
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
                      navigate(`/products/${product_order.productId}`);
                    }}
                  >
                    {product_order.products?.name}
                  </Card.Title>
                  <Card.Img
                    className="productImage"
                    style={{ marginBottom: "15px", maxWidth: "18rem" }}
                    src={product_order.products?.image_url}
                    alt="productImg"
                    onClick={() => {
                      navigate(`/products/${product_order.productId}`);
                    }}
                  />
                  <Card.Text>Price: ${product_order.products?.price}</Card.Text>
                  <Card.Text>Quantity: {product_order.quantity}</Card.Text>
                  <Stack direction="horizontal" gap={1}>
                    <Button
                      // variant="success"
                      style={{ backgroundColor: "#434343", border: "#434343" }}
                      onClick={async () => {
                        if (
                          product_order.quantity <
                          product_order.products.inventory
                        ) {
                          incrementQuantity(product_order.products.id);
                        }
                      }}
                    >
                      <PlusCircle />
                    </Button>
                    <Button
                      style={{ backgroundColor: "#ffc663", border: "#434343" }}
                      onClick={async () => {
                        if (product_order.quantity > 1) {
                          decrementQuantity(product_order.products.id);
                        }
                      }}
                    >
                      <DashCircle />
                    </Button>
                    <Button
                      className="ms-auto"
                      style={{ backgroundColor: "#434343", border: "#434343" }}
                      onClick={async () => {
                        removeFromCart(product_order.id);
                      }}
                    >
                      Remove Item
                    </Button>
                  </Stack>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
