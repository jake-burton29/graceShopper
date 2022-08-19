import axios from "axios";

export async function createProductOrder(productId, orderId, quantity) {
  try {
    const { data: product_order } = await axios.post("/api/product_orders/", {
      productId,
      orderId,
      quantity,
    });
    return product_order;
  } catch (err) {
    console.error(err);
  }
}

export async function editProductOrder(quantity, productOrderId) {
  try {
    const { data: product_order } = await axios.patch(
      `/api/product_orders/${productOrderId}`,
      {
        quantity,
      }
    );
    return product_order;
  } catch (err) {
    console.error(err);
  }
}
export async function deleteProductOrder(productOrderId) {
  try {
    const { data: product_order } = await axios.delete(
      `/api/product_orders/${productOrderId}`
    );
    return product_order;
  } catch (err) {
    console.error(err);
  }
}
