const productsRouter = require("express").Router();
const prisma = require("../db/prisma");
const { requireAdmin, requireUser } = require("./utils");

// GET from /api/products
productsRouter.get("/", async (req, res, next) => {
  try {
    const getAllProducts = await prisma.products.findMany();
    res.send(getAllProducts);
  } catch (error) {
    next(error);
  }
});

//GET from /api/products/:id
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

//GET from /api/products/category/:categoryId
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

//POST to /api/products - admin
productsRouter.post("/", requireUser, requireAdmin, async (req, res, next) => {
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

//PATCH /api/products/:id - admin
productsRouter.patch(
  "/:id",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
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
  }
);

//DELETE /api/products/:id - admin
productsRouter.delete(
  "/:id",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    try {
      const productId = +req.params.id;

      const deleteProduct = await prisma.products.delete({
        where: { id: productId },
      });
      res.send(deleteProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = productsRouter;
