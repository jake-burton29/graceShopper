import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
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
        <div>
          <Button
            className="btn-danger"
            onClick={async () => {
              emptyCart();
            }}
          >
            Empty Cart
          </Button>
          {cart.product_orders?.map((product_order) => {
            return (
              <div className="singleCart">
                <div key={product_order.productId}>
                  <Card
                    className="flex-row"
                    style={{ width: "20rem", height: "20rem" }}
                  >
                    <Card.Body>
                      <Card.Title>
                        Item: {product_order.products?.name}
                      </Card.Title>
                      <Card.Text>
                        Price: ${product_order.products?.price}
                      </Card.Text>
                      <Card.Text>Quantity: {product_order.quantity}</Card.Text>
                      <Button
                        className="btn-success"
                        onClick={async () => {
                          if (
                            product_order.quantity <
                            product_order.products.inventory
                          ) {
                            incrementQuantity(product_order.products.id);
                          }
                        }}
                      >
                        +
                      </Button>
                      <Button
                        className="btn-danger"
                        onClick={async () => {
                          if (product_order.quantity > 1) {
                            decrementQuantity(product_order.products.id);
                          }
                        }}
                      >
                        -
                      </Button>
                      <Button
                        onClick={async () => {
                          removeFromCart(product_order.id);
                        }}
                      >
                        Remove Item
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            );
          })}
          <h3>Your Total: ${total}</h3>
          <Button
            className="btn-warning"
            onClick={async () => {
              navigate("/checkout");
            }}
          >
            Check Out!
          </Button>
        </div>
      ) : (
        <div>
          <p>There is nothing in your cart!</p>
          <Button
            className="btn-warning"
            onClick={async () => {
              navigate("/");
            }}
          >
            Browse Our Products
          </Button>
        </div>
      )}
    </div>
  );
}

// to add to a cart, add a row to the through table
// you may need to add the item on the frontend as well
// { 1: 2, 4: 8 }
// guest cart persistence => map set to local storage
