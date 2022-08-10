const prisma = require("prisma");
const { products } = require("./prisma");

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
  console.log("test", result);
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
async function createProduct({ name, price, description, inventory }) {
  const updatedProduct = await prisma.products.upsert({
    create: { name },
    create: { price },
    create: { description },
    create: { inventory },
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

getAllProducts();
