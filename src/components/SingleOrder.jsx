import React, { useState, useEffect } from "react";
import { getOrderById } from "../axios-services/orders";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";

export default function SingleOrder() {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getSingleOrder = async (id) => {
      const order = await getOrderById(id);
      if (!order || !order.complete) {
        setErrorMessage("This order does not exist.");
        return;
      }
      if (user) {
        if (order.shopperId === user.id) {
          setOrder(order);
        } else {
          setErrorMessage(
            "You do not have access to this order. Please log in to view your orders."
          );
        }
      } else {
        setOrder(order);
      }
    };
    getSingleOrder(id);
  }, [user]);

  return (
    <div>
      {order.complete ? (
        <div>
          <h3>Order #{order.id}</h3>
          {order.shopperId ? (
            <h3>User: {order.shopperId}</h3>
          ) : (
            <h3>User: Guest</h3>
          )}
          <ul>
            {order.product_orders?.map((product_order) => {
              return (
                <li key={product_order.id}>
                  {product_order.products.name} x{product_order.quantity}: $
                  {product_order.products.price * product_order.quantity}
                </li>
              );
            })}
          </ul>
          <h3>Total: ${order.total}</h3>
        </div>
      ) : (
        <div>{errorMessage}</div>
      )}
    </div>
  );
}
