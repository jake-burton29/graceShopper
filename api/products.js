const productsRouter = require("express").Router();
const prisma = require("../db/prisma");

// getAllProducts()
productsRouter.get("/", async (req, res, next) => {
  try {
    const getAllProducts = await prisma.products.findMany();
    res.send(getAllProducts);
  } catch (error) {
    next(error);
  }
});

//getProductById()
productsRouter.get("/:id", async (req, res, next) => {
  try {
    const productsId = +req.params.id;
    const getProductById = await prisma.products.findUnique({
      where: { id: productsId },
    });
    res.send(getProductById);
  } catch (error) {
    next(error);
  }
});

//getProductsByCategory()
productsRouter.get("/category/:categoryId", async (req, res, next) => {
  try {
    const categoryId = +req.params.categoryId;
    const getProductsByCategory = await prisma.products.findMany({
      where: { categoryId: categoryId },
    });
    res.send(getProductsByCategory);
  } catch (error) {
    next(error);
  }
});

//createProduct() - admin
productsRouter.post("/", async (req, res, next) => {
  try {
    const { name, price, description, inventory, categoryId, image_url } =
      req.body;
    const createProduct = await prisma.products.create({
      data: { name, price, description, inventory, categoryId, image_url },
    });
    res.send(createProduct);
  } catch (error) {
    next(error);
  }
});

// to test still below

//editProduct() - admin
productsRouter.patch("/:id", async (req, res, next) => {
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
productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const deleteProduct = await prisma.products.delete({
      where: { id },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
