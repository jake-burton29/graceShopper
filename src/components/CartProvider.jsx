import React, { useState, useEffect } from "react";
import { CartContext } from "../CreateContext";
import useAuth from "../hooks/useAuth";
import { getOrderById, createOrder } from "../axios-services/orders";
export default function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.orders[0] && !user.orders[user.orders.length - 1].complete) {
        const cartId = user.orders[user.orders.length - 1].id;
        const getCartById = async (id) => {
          const myCart = await getOrderById(id);
          setCart(myCart);
        };
        getCartById(cartId);
      } else {
        const createCart = async () => {
          const createdCart = await createOrder(user.id);
          setCart(createdCart);
        };
        createCart();
      }
    } else {
      const guestCart = JSON.parse(localStorage.getItem("guestCart"));
      if (guestCart) {
        setCart(guestCart);
      } else {
        localStorage.setItem(
          "guestCart",
          JSON.stringify({ product_orders: [] })
        );
        setCart({ product_orders: [] });
      }
    }
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
