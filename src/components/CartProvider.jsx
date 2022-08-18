import React, { useState, useEffect } from "react";
import { CartContext } from "../CreateContext";
import useAuth from "../hooks/useAuth";

// Will this change to the CartProvider???
export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useAuth([]);

  // useEffect(() => {
  //   const getAllUsersOrders = async () => {
  //     if (!user) {
  //       setOrders([]);
  //     } else {
  //       const orders = await getMyOrders();
  //       setOrders(orders);
  //     }
  //   };
  //   getAllUsersOrders();
  // }, [user]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
