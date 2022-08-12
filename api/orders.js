const ordersRouter = require("express").Router();
const prisma = require("../db/prisma");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { requireAdmin, requireUser, requireAuthor } = require("./utils");

//GET /orders/users/:userId

ordersRouter.get("/users/:userId", requireUser, async (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    const user = jwt.verify(token, JWT_SECRET);
    const userId = +req.params.userId;
    if (user.id === userId) {
      const usersOrders = await prisma.orders.findMany({
        where: { shopperId: userId },
      });
      res.send(usersOrders);
    } else {
      res.status(401).send({
        loggedIn: false,
        message: "You are def not authorized.",
      });
    }
  } catch (error) {
    next(error);
  }
});

//GET /orders/:orderId
ordersRouter.get("/:orderId", requireUser, async (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    const user = jwt.verify(token, JWT_SECRET);
    const id = +req.params.orderId;
    const order = await prisma.orders.findUnique({
      where: { id, shopperId: user.id },
    });
    res.send(order);
  } catch (error) {
    next(error);
  }
});

//POST  /orders
ordersRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const { total, shopperId } = req.body;
    const order = await prisma.orders.create({
      data: {
        total,
        shopperId,
      },
    });
    res.send(order);
  } catch (error) {
    next(error);
  }
});

//ADMIN ***********

//GET /orders //view all orders
ordersRouter.get("/", requireAdmin, async (req, res, next) => {
  try {
    const orders = await prisma.orders.findMany();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

//PATCH /orders/:orderId

ordersRouter.patch("/:orderId", async (req, res, next) => {
  try {
    const orderId = +req.params.orderId;
    const { total } = req.body;
    const order = await prisma.orders.update({
      where: { id: orderId },
      data: {
        total,
      },
    });
    res.send(order);
  } catch (error) {
    next(error);
  }
});
//DELETE /orders/:orderId

ordersRouter.delete("/:orderId", requireAdmin, async (req, res, next) => {
  try {
    const orderId = +req.params.orderId;
    const deletedOrder = await prisma.orders.delete({
      where: { id: orderId },
    });
    res.send(deletedOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
