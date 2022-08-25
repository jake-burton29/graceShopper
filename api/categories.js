const categoriesRouter = require("express").Router();
const prisma = require("../db/prisma");
const { requireAdmin, requireUser } = require("./utils");

// GET from /api/categories
categoriesRouter.get("/", async (req, res, next) => {
  try {
    const getAllCategories = await prisma.categories.findMany();
    res.send(getAllCategories);
  } catch (error) {
    next(error);
  }
});

// GET from api/categories/:id
categoriesRouter.get("/:id", async (req, res, next) => {
  try {
    const categoryId = +req.params.id;
    const getCategoryById = await prisma.categories.findUnique({
      where: { id: categoryId },
    });
    res.send(getCategoryById);
  } catch (error) {
    next(error);
  }
});

// POST to /api/categories - admin
categoriesRouter.post(
  "/",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const createCategory = await prisma.categories.create({
        data: { name, description },
      });
      res.send(createCategory);
    } catch (error) {
      next(error);
    }
  }
);

// PATCH /categories/:categoryId - admin
categoriesRouter.patch(
  "/:id",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    try {
      const categoryId = +req.params.id;
      const { name, description } = req.body;
      const editCategory = await prisma.categories.update({
        where: { id: categoryId },
        data: { name, description },
      });
      res.send(editCategory);
    } catch (error) {
      next(error);
    }
  }
);

//  DELETE /categories/:categoryId - admin
categoriesRouter.delete(
  "/:id",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    try {
      const categoryId = +req.params.id;

      const deleteCategory = await prisma.categories.delete({
        where: { id: categoryId },
      });
      res.send(deleteCategory);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = categoriesRouter;
