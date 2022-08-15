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

export async function getOrdersByUserId(id) {
  try {
    const { data: orders } = await axios.get(`/api/orders/users/${id}`);
    console.log("ORDERS BY USER", orders);
  } catch (err) {
    console.error(err);
  }
}
