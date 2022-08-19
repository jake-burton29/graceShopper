import React from "react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  editProductOrder,
  deleteProductOrder,
} from "../axios-services/product_orders";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const { user } = useAuth();

  async function incrementQuantity(productId) {
    let productOrderIndex = -1;
    if (user) {
      productOrderIndex = cart.product_orders?.findIndex(
        (product_order) => product_order.productId === productId
      );
      await editProductOrder(
        cart.product_orders[productOrderIndex].quantity + 1,
        cart.product_orders[productOrderIndex].id
      );
      const cartCopy = { ...cart };
      cartCopy.product_orders[productOrderIndex].quantity += 1;
      setCart(cartCopy);
    } else {
      const cartCopy = { ...cart };
      cartCopy[productId] += 1;
      setCart(cartCopy);
      localStorage.setItem("guestCart", JSON.stringify(cart));
    }
  }

  async function decrementQuantity(productId) {
    let productOrderIndex = -1;
    if (user) {
      productOrderIndex = cart.product_orders?.findIndex(
        (product_order) => product_order.productId === productId
      );
      await editProductOrder(
        cart.product_orders[productOrderIndex].quantity - 1,
        cart.product_orders[productOrderIndex].id
      );
      const cartCopy = { ...cart };
      cartCopy.product_orders[productOrderIndex].quantity -= 1;
      setCart(cartCopy);
    } else {
      const cartCopy = { ...cart };
      cartCopy[productId] -= 1;
      setCart(cartCopy);
      localStorage.setItem("guestCart", JSON.stringify(cart));
    }
  }

  async function removeFromCart(productOrderId, productId) {
    if (user) {
      const cartCopy = { ...cart };
      const deletedProductOrder = await deleteProductOrder(productOrderId);
      cartCopy.product_orders = cartCopy.product_orders.filter(
        (product_order) => product_order.id !== productOrderId
      );
      setCart(cartCopy);
    } else {
      console.log("no user found");
      // guest cart stuff?
      // const cartCopy = { ...cart };
      // delete cartCopy[productId];
      // setCart(cartCopy);
    }
  }

  async function emptyCart() {
    const cartCopy = { ...cart };
    for (let i = 0; i < cartCopy.product_orders.length; i++) {
      deleteProductOrder(cartCopy.product_orders[i].id);
      cartCopy.product_orders.splice(i);
    }
    setCart(cartCopy);
  }

  return (
    <div>
      <Button
        className="btn-danger"
        onClick={async () => {
          emptyCart();
        }}
      >
        Empty Cart
      </Button>
      {user && cart.product_orders?.length > 0 ? (
        <div>
          {cart.product_orders?.map((product_order) => {
            return (
              <div key={product_order.id}>
                <h3>Name: {product_order.products?.name}</h3>
                <h3>Price: {product_order.products?.price}</h3>
                <h3>Quantity: {product_order.quantity}</h3>
                <Button
                  className="btn-success"
                  onClick={async () => {
                    if (
                      product_order.quantity < product_order.products.inventory
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
              </div>
            );
          })}
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
        <div>There is nothing in your cart!</div>
        // guest cart stuff?
        // <div>
        //   {Object.entries(cart).map((entry) => {
        //     console.log("Key:", entry[0], "Value:", entry[1]);
        //   })}
        // </div>
      )}
    </div>
  );
}

// to add to a cart, add a row to the through table
// you may need to add the item on the frontend as well
// { 1: 2, 4: 8 }
// guest cart persistence => map set to local storage
