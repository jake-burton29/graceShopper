const ordersRouter = require("express").Router();
const prisma = require("../db/prisma");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { requireAdmin, requireUser } = require("./utils");

//GET /api/users/myorders
ordersRouter.get("/myorders", requireUser, async (req, res, next) => {
  try {
    const user = req.user;
    const usersOrders = await prisma.orders.findMany({
      where: { shopperId: user.id },
      include: {
        product_orders: { include: { products: true } },
      },
    });
    res.send(usersOrders);
  } catch (error) {
    next(error);
  }
});

//GET /api/users/myorderslite
ordersRouter.get("/myorderslite", requireUser, async (req, res, next) => {
  try {
    const user = req.user;
    const usersOrders = await prisma.orders.findMany({
      where: { shopperId: user.id },
    });
    res.send(usersOrders);
  } catch (error) {
    next(error);
  }
});

//GET /orders/:orderId
ordersRouter.get("/:orderId", requireUser, async (req, res, next) => {
  try {
    const user = req.user;
    const id = +req.params.orderId;
    const order = await prisma.orders.findUnique({
      where: { id },
      include: {
        product_orders: { include: { products: true } },
      },
    });
    if (order.shopperId === user.id) {
      res.send(order);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

//POST to /api/orders
ordersRouter.post("/", async (req, res, next) => {
  try {
    const { shopperId } = req.body;
    const order = await prisma.orders.create({
      data: {
        total: 0,
        shopperId,
      },
    });
    res.send(order);
  } catch (error) {
    next(error);
  }
});

//PATCH to /api/orders/status/:orderId (for setting order to complete, updating total)
ordersRouter.patch("/status/:orderId", requireUser, async (req, res, next) => {
  try {
    const { complete } = req.body;
    if (!complete) {
      next();
    }
    console.log("PARAMS:", req.params.orderId);
    const id = +req.params.orderId;
    const order = await prisma.orders.findUnique({
      where: { id },
      include: {
        product_orders: { include: { products: true } },
      },
    });
    if (order.shopperId !== req.user.id || order.complete) {
      next();
    }
    let total = 0;
    order.product_orders?.forEach((product_order) => {
      total += product_order.products.price * product_order.quantity;
    });
    const updatedOrder = await prisma.orders.update({
      where: { id },
      data: {
        total,
        complete,
      },
      include: {
        product_orders: { include: { products: true } },
      },
    });
    res.send(updatedOrder);
  } catch (error) {
    next(error);
  }
});

//ADMIN ***********

//GET /orders //view all orders
ordersRouter.get("/", requireUser, requireAdmin, async (req, res, next) => {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        product_orders: { include: { products: true } },
      },
    });
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

//PATCH /orders/:orderId

ordersRouter.patch(
  "/:orderId",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    try {
      const orderId = +req.params.orderId;
      const { total } = req.body;
      const order = await prisma.orders.update({
        where: { id: orderId },
        data: {
          total,
        },
        include: {
          product_orders: { include: { products: true } },
        },
      });
      res.send(order);
    } catch (error) {
      next(error);
    }
  }
);

//DELETE /orders/:orderId

ordersRouter.delete(
  "/:orderId",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    try {
      const orderId = +req.params.orderId;
      await prisma.product_orders.deleteMany({
        where: { orderId },
      });
      const deletedOrder = await prisma.orders.delete({
        where: { id: orderId },
      });
      res.send(deletedOrder);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = ordersRouter;
