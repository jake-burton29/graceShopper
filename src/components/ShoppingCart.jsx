import React from "react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { Button } from "react-bootstrap";
import { editProductOrder } from "../axios-services/product_orders";
export default function ShoppingCart() {
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

  return (
    <div>
      {user ? (
        <div>
          {cart.product_orders?.map((product_order) => {
            return (
              <div key={product_order.id}>
                <h3>Name: {product_order.products.name}</h3>
                <h3>Price: {product_order.products.price}</h3>
                <h3>Quantity: {product_order.quantity}</h3>
                <Button
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
                  onClick={async () => {
                    if (product_order.quantity > 1) {
                      decrementQuantity(product_order.products.id);
                    }
                  }}
                >
                  -
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {Object.entries(cart).map((entry) => {
            console.log("Key:", entry[0], "Value:", entry[1]);
          })}
        </div>
      )}
    </div>
  );
}

// to add to a cart, add a row to the through table
// you may need to add the item on the frontend as well
// { 1: 2, 4: 8 }
// guest cart persistence => map set to local storage
