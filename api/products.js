const { response } = require("express");
const router = require("express").Router();
const client = require("../client");
const prisma = require("../prisma");
const { products } = require("../prisma");

// getAllProducts()
router.get("/products", async (req, res, next) => {
  try {
    const getAllProducts = await prisma.products.findMany();
    res.send(getAllProducts);
  } catch (error) {
    next(error);
  }
});

//getProductById()
router.get("/products/:productId", async (req, res, next) => {
  try {
    const getProductById = await prisma.products.findUnique({
      where: { id },
    });
    res.send(getProductById);
  } catch (error) {
    next(error);
  }
});

//getProductsByCategory()
router.get("/products/:categoryId", async (req, res, next) => {
  try {
    const getProductsByCategory = await prisma.products.findMany({
      where: { categoryId },
    });
    res.send(getProductsByCategory);
  } catch (error) {
    next(error);
  }
});

//createProduct() - admin
router.post("/products", async (req, res, next) => {
  // could be the wrong route
  try {
    const createProduct = await prisma.products.create({
      data: { name, price, description, inventory, categoryId, img_url },
    });
  } catch (error) {
    next(error);
  }
});

//editProduct() - admin
router.patch("/products/:id", async (req, res, next) => {
  // could be the wrong route
  try {
    const editProduct = await prisma.products.update({
      where: { id },
      data: { name, price, description, inventory, categoryId },
    });
  } catch (error) {
    next(error);
  }
});

//deleteProduct() - admin
router.delete("/products/:id", async (req, res, next) => {
  try {
    const deleteProduct = await prisma.products.delete({
      where: { id },
    });
  } catch (error) {
    next(error);
  }
});
