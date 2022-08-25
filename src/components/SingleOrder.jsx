import React, { useState, useEffect } from "react";
import { getOrderById } from "../axios-services/orders";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";

export default function SingleOrder() {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState({});
  const [tax, setTax] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
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

  useEffect(() => {
    if (order.total) {
      let taxes = 0;
      order.product_orders?.forEach((product_order) => {
        taxes += product_order.products.price * product_order.quantity * 0.1;
      });
      setTax(Math.trunc(taxes));
      if (order.total > 150) {
        setShippingCharge(0);
      } else {
        setShippingCharge(12);
      }
    }
  }, [order]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5vh",
      }}
    >
      {order.complete ? (
        <div>
          <h3>Order #{order.id}</h3>
          {order.shopperId ? (
            <h5
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p>Customer:</p>
              <p>{order.users.username}</p>
            </h5>
          ) : (
            <h5
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p>Customer:</p>
              <p>Guest</p>
            </h5>
          )}
          <h5>Items:</h5>
          <ul>
            {order.product_orders?.map((product_order) => {
              return (
                <li
                  key={product_order.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <p style={{ paddingRight: "30px" }}>
                    {product_order.quantity}x {product_order.products.name}:
                  </p>
                  <p>
                    ${product_order.products.price * product_order.quantity}.00
                  </p>
                </li>
              );
            })}
            <li
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p>Tax:</p>
              <p>${tax}.00</p>
            </li>
            <li
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p>Shipping Charge:</p>
              <p>${shippingCharge}.00</p>
            </li>
          </ul>
          <h3
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>Total:</p>
            <p>${order.total}.00</p>
          </h3>
        </div>
      ) : (
        <div
          style={{
            color: "red",
            backgroundColor: "#FFD2D2",
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}
