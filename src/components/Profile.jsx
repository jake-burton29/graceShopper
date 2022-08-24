import React, { useEffect, useState } from "react";
import { getMyOrders } from "../axios-services/orders";
import useAuth from "../hooks/useAuth";
import { Card } from "react-bootstrap";

export default function Profile() {
  const { user } = useAuth();
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const getUsersOrders = async () => {
      const orders = await getMyOrders();
      setMyOrders(orders);
    };
    getUsersOrders();
  }, [user]);

  return (
    <div
      id="profile"
      style={{
        alignContent: "center",
        textAlign: "center",
      }}
    >
      {user ? (
        <div
          style={{
            margin: "auto",
            width: "30%",
          }}
        >
          <div
            id="accountInfo"
            style={{
              padding: "40px",
              marginTop: "20px",
              width: "30vw",
              height: "30wh",
            }}
          >
            <Card.Title style={{ fontSize: "30px" }}>Account Info:</Card.Title>
            <Card.Text>Username: {user.username}</Card.Text>
            <Card.Text>Email: {user.email}</Card.Text>
          </div>
        </div>
      ) : null}
      <div
        style={{
          margin: "auto",
          width: "50%",
        }}
      >
        <div
          id="myOrders"
          style={{
            padding: "40px",
            width: "50vw",
            height: "30wh",
          }}
        >
          <h3>My Orders:</h3>
          {myOrders?.map((order) => {
            if (order.complete)
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
                  <p
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Total: ${order.total}
                  </p>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}
