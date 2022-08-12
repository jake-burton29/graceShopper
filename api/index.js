const apiRouter = require("express").Router();
const usersRouter = require("./users");
const productsRouter = require("./products");
const ordersRouter = require("./orders");
const product_ordersRouter = require("./product_orders");
const categoriesRouter = require("./categories");

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here
apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/orders", ordersRouter);
// apiRouter.use("/product_orders", product_ordersRouter);
apiRouter.use("/categories", categoriesRouter);

module.exports = apiRouter;
