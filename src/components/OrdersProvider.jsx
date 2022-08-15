import React, { useState, useEffect } from "react";
import { getOrdersByUserId } from "../axios-services/orders";
import { OrdersContext } from "../CreateContext";
import useAuth from "../hooks/useAuth";

export default function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth([]);

  useEffect(() => {
    const getAllUsersOrders = async () => {
      if (!user) {
        setOrders([]);
      } else {
        const orders = await getOrdersByUserId(user.id);
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
