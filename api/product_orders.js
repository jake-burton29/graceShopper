const product_orderRouter = require("express").Router();
const prisma = require("../db/prisma");

// POST to PRODUCT_ORDERS
product_orderRouter.post("/", async (req, res, next) => {
  try {
    const { orderId, productId, quantity } = req.body;
    const newProductOrder = await prisma.product_orders.create({
      data: {
        productId,
        orderId,
        quantity,
      },
    });
    res.send(newProductOrder);
  } catch (error) {
    next(error);
  }
});

//PATCH PRODUCT_ORDER by ID
product_orderRouter.patch("/:productOrderId", async (req, res, next) => {
  try {
    const productOrderId = +req.params.orderId;
    const { quantity } = req.body;
    const updatedProductOrder = await prisma.product_orders.update({
      data: {
        quantity,
      },
      where: { id: productOrderId },
    });
    res.send(updatedProductOrder);
  } catch (error) {
    next(error);
  }
});

// DELETE PRODUCT_ORDER by ID
product_orderRouter.delete("/:productOrderId", async (req, res, next) => {
  try {
    const productOrderId = +req.params.productOrderId;
    const updatedProductOrder = await prisma.product_orders.delete({
      where: { id: productOrderId },
    });
    res.send(updatedProductOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = product_orderRouter;
