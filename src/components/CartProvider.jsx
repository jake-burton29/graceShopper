import React, { useState, useEffect } from "react";
import { CartContext } from "../CreateContext";
import useAuth from "../hooks/useAuth";
export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useAuth([]);
  console.log("CART:", cart);

  useEffect(() => {
    if (user) {
      if (user.orders && !user.orders[user.orders.length - 1].complete) {
        setCart(user.orders[user.orders.length - 1]);
        console.log("got cart from orders!");
      } else {
        const createCart = async () => {
          const createdCart = await createOrder(user.id);
          return createdCart;
        };
        const newCart = createCart();
        setCart(newCart);
        console.log("created new cart order!");
      }
    } else {
      const guestCart = JSON.parse(localStorage.getItem("guestCart"));
      if (guestCart) {
        setCart(guestCart);
        console.log("got cart from local storage!");
      } else {
        localStorage.setItem("guestCart", JSON.stringify({}));
        setCart({});
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
