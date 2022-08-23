import React, { useState, useEffect } from "react";
import { CartContext } from "../CreateContext";
import useAuth from "../hooks/useAuth";
import { getOrderById, createOrder } from "../axios-services/orders";
export default function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const { user } = useAuth();
  console.log("CART:", cart);

  useEffect(() => {
    if (user) {
      if (user.orders[0] && !user.orders[user.orders.length - 1].complete) {
        const cartId = user.orders[user.orders.length - 1].id;
        const getCartById = async (id) => {
          const myCart = await getOrderById(id);
          setCart(myCart);
        };
        getCartById(cartId);
        console.log("got cart from orders!");
      } else {
        const createCart = async () => {
          const createdCart = await createOrder(user.id);
          setCart(createdCart);
        };
        createCart();
        console.log("created new cart order!");
      }
    } else {
      const guestCart = JSON.parse(localStorage.getItem("guestCart"));
      if (guestCart) {
        setCart(guestCart);
        console.log("got cart from local storage!");
      } else {
        localStorage.setItem(
          "guestCart",
          JSON.stringify({ product_orders: [] })
        );
        setCart({ product_orders: [] });
        console.log("created new cart in local storage!");
      }
    }
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
