import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { Button } from "react-bootstrap";
import { completeOrder } from "../axios-services/orders";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { cart } = useCart();
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
    if (sum > 50) {
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
      const completedOrder = completeOrder(cart.id);
      setUser({ ...user, orders: [...orders, completedOrder] });
      // const newOrder = await createOrder(user.id);
      // setCart(newOrder);
      navigate("/");
      console.log("user order submitted");
    } else {
      console.log("guest order submitted");
    }
  }

  return (
    <div>
      {cart.product_orders?.length > 0 ? (
        <div>
          {cart.product_orders?.map((product_order) => {
            return (
              <div key={product_order.productId}>
                <h4>
                  {product_order.products?.name} x{product_order.quantity}
                </h4>
                <h5>${product_order.products?.price}</h5>
              </div>
            );
          })}
          <h4>Sales Tax</h4>
          <h5>${salesTax}</h5>
          <h4>Shipping Charge</h4>
          {shippingCharge > 0 ? (
            <>
              <h5>${shippingCharge}</h5>
              <p>Orders of at least $50 will ship for free!</p>
            </>
          ) : (
            <h5>FREE</h5>
          )}
          <h3>Your Total: ${total}</h3>
          <Button
            className="btn-warning"
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
