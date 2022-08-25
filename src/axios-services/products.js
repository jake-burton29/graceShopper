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
export async function createProduct(
  name,
  price,
  description,
  image_url,
  inventory,
  categoryId
) {
  const { data: product } = await axios.post("/api/products/", {
    name,
    price: +price,
    description,
    image_url,
    inventory: +inventory,
    categoryId: +categoryId,
  });
  return product;
}

export async function deleteProduct(productId) {
  const { data: product } = await axios.delete(`/api/products/${productId}`);
  return product;
}
