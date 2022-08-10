const client = require("../client");
const prisma = require("../prisma");
const { products } = require("../prisma");

module.exports = {
  // add your database adapter fns here
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  editProduct,
  deleteProduct,
};

console.log("working");

// getAllProducts()
async function getAllProducts() {
  const result = await prisma.products.findMany();
  return result;
}

//getProductById()
async function getProductById(id) {
  const result = await prisma.products.findUnique({
    where: { id },
  });
  return result;
}

//getProductsByCategory()
async function getProductsByCategory(categoryId) {
  const result = await prisma.products.findMany({
    where: { categoryId },
  });
  return result;
}

//createProduct() - admin
async function createProduct({
  name,
  price,
  description,
  inventory,
  categoryId,
  img_url,
}) {
  const result = await prisma.products.create({
    data: { name, price, description, inventory, categoryId, img_url },
  });
  return result;
}

//editProduct() - admin
async function editProduct(
  { name, price, description, inventory, categoryId },
  { id }
) {
  const result = await prisma.products.update({
    where: { id },
    data: { name, price, description, inventory, categoryId },
  });
  return result;
}

//deleteProduct() - admin
async function deleteProduct(id) {
  const result = await prisma.products.delete({
    where: { id },
  });
  return result;
}
