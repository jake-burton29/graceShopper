const productsRouter = require("express").Router();
const prisma = require("../db/prisma");
const { requireAdmin } = require("./utils");

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
productsRouter.post("/", requireAdmin, async (req, res, next) => {
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

//editProduct() - admin
productsRouter.patch("/:id", requireAdmin, async (req, res, next) => {
  try {
    const productId = +req.params.id;
    const { name, price, description, inventory, categoryId, image_url } =
      req.body;
    const editProduct = await prisma.products.update({
      where: { id: productId },
      data: { name, price, description, inventory, categoryId },
    });
    res.send(editProduct);
  } catch (error) {
    next(error);
  }
});

//deleteProduct() - admin
productsRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const productId = +req.params.id;

    const deleteProduct = await prisma.products.delete({
      where: { id: productId },
    });
    res.send(deleteProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
