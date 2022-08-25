import axios from "axios";

export async function getProducts() {
  try {
    const { data: products } = await axios.get("/api/products");
    return products;
  } catch (err) {
    console.error(err);
  }
}
export async function getProductById(id) {
  try {
    const { data: product } = await axios.get(`/api/products/${id}`);

    return product;
  } catch (err) {
    console.error(err);
  }
}
export async function getProductsByCategoryId(categoryId) {
  try {
    const { data: products } = await axios.get(
      `/api/products/category/${categoryId}`
    );

    return products;
  } catch (err) {
    console.error(err);
  }
}
