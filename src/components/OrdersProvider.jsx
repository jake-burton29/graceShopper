import React, { useState, useEffect } from "react";
import { getMyOrders } from "../axios-services/orders";
import { OrdersContext } from "../CreateContext";
import useAuth from "../hooks/useAuth";

// Will this change to the CartProvider???
export default function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth([]);

  useEffect(() => {
    const getAllUsersOrders = async () => {
      if (!user) {
        setOrders([]);
      } else {
        const orders = await getMyOrders();
        setOrders(orders);
      }
    };
    getAllUsersOrders();
  }, [user]);

  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrdersContext.Provider>
  );
}
