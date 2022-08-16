const usersRouter = require("express").Router();
const prisma = require("../db/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { requireUser, requireAdmin } = require("./utils");
const { JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

// getAllUsers()  requireAdmin
usersRouter.get("/", requireAdmin, async (req, res, next) => {
  try {
    const users = await prisma.users.findMany({ include: { orders: true } });
    res.send(users);
  } catch (error) {
    next(error);
  }
});

//GET from /me
usersRouter.get("/me", requireUser, async (req, res, next) => {
  console.log("What is happening?");
  try {
    const token = req.signedCookies.token;
    const user = jwt.verify(token, JWT_SECRET);
    delete user.password;
    res.send(user);
  } catch (error) {
    next(error);
  }
});

//GET from /:username
usersRouter.get("/:username", requireUser, async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await prisma.users.findUnique({
      where: { username },
      include: { orders: true },
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

//POST to /register
usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, email, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        email,
        isAdmin,
      },
    });
    const token = jwt.sign(newUser, JWT_SECRET);
    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    delete newUser.password;
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});

//POST to /login
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.users.findUnique({
      where: { username },
      include: { orders: true },
    });
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const token = jwt.sign(user, JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      delete user.password;
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

//PATCH to /:username
usersRouter.patch("/:username", requireUser, async (req, res, next) => {
  try {
    const username = req.params.username;
    const { newUsername, password, email, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const editedUser = await prisma.users.update({
      data: {
        username: newUsername,
        password: hashedPassword,
        email,
        isAdmin,
      },
      where: { username },
      include: { orders: true },
    });
    res.send(editedUser);
  } catch (error) {
    next(error);
  }
});

//deleteUser      adminRequired
usersRouter.delete("/:username", requireAdmin, async (req, res, next) => {
  try {
    const username = req.params.username;
    const deletedUser = await prisma.users.delete({
      where: { username },
    });
    res.send(deletedUser);
  } catch (error) {
    next(error);
  }
});

// Log Out
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

//GET from /me
usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
