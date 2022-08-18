import React, { useState, useEffect } from "react";
import { CartContext } from "../CreateContext";
import useAuth from "../hooks/useAuth";
// Will this change to the CartProvider???
export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useAuth([]);

  useEffect(() => {
    if (user) {
      if (user.orders) {
        setCart(user.orders[user.orders.length - 1]);
      } else {
        const createCart = async () => {
          const createdCart = await createOrder(user.id);
        };
        const newCart = createCart();
        setCart(newCart);
      }
    } else {
      const guestCart = localStorage.getItem("guestCart");
      if (guestCart) {
        setCart(guestCart);
      } else {
        localStorage.setItem("guestCart", {});
        setCart({});
      }
    }
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
