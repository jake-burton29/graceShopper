const client = require("../client");

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

module.exports = {
  // add your database adapter fns here
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  editProduct,
  deleteProduct,
};

// getAllProducts()
async function getAllProducts() {
  const result = await prisma.products.findMany();
  return result;
}

//getProductById()
async function getProductById(id) {
  const result = await prisma.products.findMany({
    where: { id: id },
  });
  return result;
}
console.log(result);

//getProductsByCategory()
async function getProductsByCategory(categoryId) {
  const result = await prisma.products.findMany({
    where: { categoryId: categoryId },
  });
  return result;
}

//createProduct() - admin
async function createProduct({ name, price, description, inventory }) {
  const updatedProduct = await prisma.products.upsert({
    create: { name: name },
    create: { price: price },
    create: { description: description },
    create: { inventory: inventory },
  });
  return result;
}

//editProduct() - admin
async function editProduct({ name, price, description, inventory }) {
  const updatedProduct = await prisma.products.upsert({
    update: { name: name },
    update: { price: price },
    update: { description: description },
    update: { inventory: inventory },
  });
}

//deleteProduct() - admin
async function deleteProduct(id) {
  const deleteProduct = await prisma.products.delete({
    where: { id: products.id },
  });
  return deleteProduct;
}
