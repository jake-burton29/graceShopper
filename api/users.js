const usersRouter = require("express").Router();
const prisma = require("../db/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { requireUser, requireAdmin } = require("./utils");
const { product_orders } = require("../db/prisma");
const { JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

// GET from /api/users - admin
usersRouter.get("/", requireUser, requireAdmin, async (req, res, next) => {
  try {
    const users = await prisma.users.findMany({ include: { orders: true } });
    res.send(users);
  } catch (error) {
    next(error);
  }
});

//GET from /me
usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    next(error);
  }
});

//GET from api/users/:username
usersRouter.get("/:username", requireUser, async (req, res, next) => {
  try {
    const username = req.params.username;
    if (req.user.username !== username) {
      throw error;
    } else {
      const user = await prisma.users.findUnique({
        where: { username },
        include: {
          orders: true,
        },
      });
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

//POST to /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  try {
    // removed admin with creating a user
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });
    const token = jwt.sign(newUser, JWT_SECRET);
    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    newUser.orders = [];
    delete newUser.password;
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});

//POST to /api/users/login
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let user = await prisma.users.findUnique({
      where: { username },
    });

    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const usersOrders = await prisma.orders.findMany({
        where: { shopperId: user.id },
      });
      user.orders = usersOrders;

      const token = jwt.sign(user, JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      delete user.password;
      res.send(user);
    } else {
      throw "Incorrect password provided.";
    }
  } catch (error) {
    next(error);
  }
});

//PATCH to /api/users/:username
usersRouter.patch("/:username", requireUser, async (req, res, next) => {
  try {
    const username = req.params.username;
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    const editedUser = await prisma.users.update({
      data: {
        password: hashedPassword,
      },
      where: { username },
      include: {
        orders: true,
      },
    });
    res.send(editedUser);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/users/:username - adminRequired
usersRouter.delete(
  "/:username",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    try {
      const username = req.params.username;
      const deletedUser = await prisma.users.delete({
        where: { username },
      });
      res.send(deletedUser);
    } catch (error) {
      next(error);
    }
  }
);

// POST to /api/users/logout
usersRouter.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
