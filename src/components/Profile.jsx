import React, { useEffect, useState } from "react";
import { getMyOrders } from "../axios-services/orders";
import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const getUsersOrders = async () => {
      if (!user) {
        console.log("no user found");
        setMyOrders([]);
      } else {
        const orders = await getMyOrders();
        setMyOrders(orders);
      }
    };
    getUsersOrders();
    console.log("MY ORDERS:", myOrders);
  }, []);

  return (
    <div id="profile">
      {user ? (
        <div id="accountInfo">
          <h3>Account Info:</h3>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : null}

      <div id="myOrders">
        <h3>My Orders:</h3>
        {myOrders?.length > 0 &&
          myOrders.map((order) => {
            return (
              <div key={order.id}>
                <h4>Order #{order.id}</h4>
                <div>
                  {order?.product_orders &&
                    order.product_orders.map((productOrder) => {
                      return (
                        <div key={productOrder.id}>
                          <p>
                            {productOrder.products.name} x
                            {productOrder.quantity}
                          </p>
                        </div>
                      );
                    })}
                </div>
                <p>Total: ${order.total}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
