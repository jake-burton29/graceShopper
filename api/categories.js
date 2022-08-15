const categoriesRouter = require("express").Router();
const prisma = require("../db/prisma");
const { requireAdmin } = require("./utils");

// getCategories
categoriesRouter.get("/", async (req, res, next) => {
  try {
    const getAllCategories = await prisma.categories.findMany();
    res.send(getAllCategories);
  } catch (error) {
    next(error);
  }
});
// getCategoriesId
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

// POST /categories - admin
categoriesRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const createCategory = await prisma.categories.create({
      data: { name, description },
    });
    res.send(createCategory);
  } catch (error) {
    next(error);
  }
});

// PATCH /categories/:categoryId - admin
categoriesRouter.patch("/:id", requireAdmin, async (req, res, next) => {
  try {
    const categoryId = +req.params.id;
    const { name, description, id } = req.body; // id could be wrong will fix DONT FORGFET
    const editCategory = await prisma.categories.update({
      where: { id: categoryId },
      data: { name, description, id },
    });
    res.send(editCategory);
  } catch (error) {
    next(error);
  }
});

//  DELETE /categories/:categoryId - admin
categoriesRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const categoryId = +req.params.id;

    const deleteCategory = await prisma.categories.delete({
      where: { id: categoryId },
    });
    res.send(deleteCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = categoriesRouter;
