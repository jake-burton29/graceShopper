const product_orderRouter = require("express").Router();
const prisma = require("../db/prisma");
const { requireUserOrGuest } = require("./utils");

// POST to PRODUCT_ORDERS
product_orderRouter.post("/", requireUserOrGuest, async (req, res, next) => {
  try {
    const { orderId, productId, quantity } = req.body;
    const order = await prisma.orders.findUnique({
      where: { id: orderId },
    });
    if (order.shopperId !== req.user.id || order.complete) {
      res.status(401).send({
        loggedIn: false,
        message: "You don't have access to this order.",
      });
    }
    const newProductOrder = await prisma.product_orders.create({
      data: {
        productId,
        orderId,
        quantity,
      },
      include: { products: true },
    });
    res.send(newProductOrder);
  } catch (error) {
    next(error);
  }
});

//PATCH PRODUCT_ORDER by ID
product_orderRouter.patch(
  "/:productOrderId",
  requireUserOrGuest,
  async (req, res, next) => {
    try {
      const productOrderId = +req.params.productOrderId;
      const { quantity } = req.body;
      const product_order = await prisma.product_orders.findUnique({
        where: { id: productOrderId },
        include: { orders: true },
      });
      if (
        product_order.orders.shopperId !== req.user.id ||
        product_order.orders.complete
      ) {
        res.status(401).send({
          loggedIn: false,
          message: "You don't have access to this order.",
        });
      }

      const updatedProductOrder = await prisma.product_orders.update({
        data: {
          quantity,
        },
        where: { id: productOrderId },
        include: { products: true },
      });
      res.send(updatedProductOrder);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE PRODUCT_ORDER by ID
product_orderRouter.delete(
  "/:productOrderId",
  requireUserOrGuest,
  async (req, res, next) => {
    try {
      const productOrderId = +req.params.productOrderId;
      const product_order = await prisma.product_orders.findUnique({
        where: { id: productOrderId },
        include: { orders: true },
      });
      if (
        product_order.orders.shopperId !== req.user.id ||
        product_order.orders.complete
      ) {
        res.status(401).send({
          loggedIn: false,
          message: "You don't have access to this order.",
        });
      }
      const updatedProductOrder = await prisma.product_orders.delete({
        where: { id: productOrderId },
      });
      res.send(updatedProductOrder);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = product_orderRouter;
