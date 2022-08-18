import axios from "axios";

export async function getOrders() {
  try {
    const { data: orders } = await axios.get("/api/orders");
    console.log("ORDERS:", orders);
    return orders;
  } catch (err) {
    console.error(err);
  }
}

export async function getMyOrders() {
  try {
    const { data: orders } = await axios.get(`/api/orders/myorders`);
    console.log("ORDERS BY USER", orders);
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
    } else {
      const { data: order } = await axios.post("/api/orders");
    }
  } catch (error) {
    console.error(err);
  }
}
