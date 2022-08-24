import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { Button, Card } from "react-bootstrap";
import { completeOrder, createOrder } from "../axios-services/orders";
import { useNavigate } from "react-router-dom";
import { createProductOrder } from "../axios-services/product_orders";

export default function Checkout() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { cart, setCart } = useCart();
  const [total, setTotal] = useState(0);
  const taxRate = 0.1;
  const [salesTax, setSalesTax] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);

  useEffect(() => {
    let sum = 0;
    let ship = 0;
    let tax = 0;
    cart.product_orders?.forEach((product_order) => {
      sum += product_order.products.price * product_order.quantity;
    });
    tax = sum * taxRate;
    setSalesTax(tax);
    if (sum > 150) {
      ship = 0;
      setShippingCharge(ship);
    } else {
      ship = 12;
      setShippingCharge(ship);
    }
    setTotal(sum + ship + tax);
  }, [cart]);

  async function submitOrder() {
    if (user) {
      const completedOrder = await completeOrder(cart.id);
      if (user.orders) {
        setUser({ ...user, orders: [...user.orders, completedOrder] });
      } else {
        setUser({ ...user, orders: [completedOrder] });
      }
      navigate(`/orders/${completedOrder.id}`);
    } else {
      const newOrder = await createOrder();
      for (const product_order of cart.product_orders) {
        await createProductOrder(
          product_order.productId,
          newOrder.id,
          product_order.quantity
        );
      }
      completeOrder(newOrder.id);
      localStorage.setItem("guestCart", JSON.stringify({ product_orders: [] }));
      setCart({ product_orders: [] });
      navigate(`/orders/${newOrder.id}`);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {cart.product_orders?.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "75vw",
            boxShadow: "0 0 3px 2px #cec7c759",
            padding: 20,
            paddingTop: 20,
            borderRadius: 20,
            marginTop: 50,
          }}
        >
          <h3 style={{ textDecoration: "underline", marginBottom: "2vh" }}>
            Checkout:
          </h3>
          {cart.product_orders?.map((product_order) => {
            return (
              <div
                key={product_order.productId}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <img
                  style={{
                    marginBottom: "2vh",
                    maxWidth: "6vw",
                    marginRight: "1vw",
                  }}
                  src={product_order.products?.image_url}
                  alt="checkoutProductImage"
                />
                <div>
                  <h5>{product_order.products?.name}</h5>
                  <div>──────────────────────────</div>
                  <div>x{product_order.quantity}</div>
                  <div style={{ fontWeight: "bold" }}>
                    ${product_order.products?.price}.00
                  </div>
                </div>
              </div>
            );
          })}
          <h5>Sales Tax:</h5>
          <h5 style={{ fontWeight: "bold" }}>${salesTax}</h5>
          <h5>Shipping Charge:</h5>

          {shippingCharge > 0 ? (
            <h5 style={{ fontWeight: "bold" }}>${shippingCharge}.00</h5>
          ) : (
            <h5 style={{ fontWeight: "bold" }}>$0.00</h5>
          )}
          <p className="text-muted">
            Orders of at least $150 or more ship for free!
          </p>
          <h3>Your Total: ${total}.00</h3>
          <Button
            style={{
              width: "8vw",
              borderColor: "#434343",
              backgroundColor: "#FFC663",
              color: "black",
              marginTop: "1vh",
            }}
            onClick={async () => {
              submitOrder();
            }}
          >
            Submit Order
          </Button>
        </div>
      ) : (
        <div>ERROR: There is nothing in your cart!</div>
      )}
    </div>
  );
}
