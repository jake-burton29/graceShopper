import axios from "axios";

export async function getOrders() {
  try {
    const { data: orders } = await axios.get("/api/orders");
    return orders;
  } catch (err) {
    console.error(err);
  }
}

export async function getMyOrders() {
  try {
    const { data: orders } = await axios.get(`/api/orders/myorders`);
    return orders;
  } catch (err) {
    console.error(err);
  }
}

export async function getMyOrdersLite() {
  try {
    const { data: orders } = await axios.get(`/api/orders/myorderslite`);
    return orders;
  } catch (err) {
    console.error(err);
  }
}

export async function createOrder(shopperId) {
  try {
    if (shopperId) {
      const { data: order } = await axios.post("/api/orders", {
        shopperId,
      });
      return order;
    } else {
      const { data: order } = await axios.post("/api/orders");
      return order;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function getOrderById(orderId) {
  try {
    const { data: order } = await axios.get(`/api/orders/${orderId}`);
    return order;
  } catch (err) {
    console.error(err);
  }
}

export async function completeOrder(orderId) {
  try {
    const { data: order } = await axios.patch(`/api/orders/status/${orderId}`, {
      complete: true,
    });
    return order;
  } catch (error) {
    console.error(error);
  }
}
