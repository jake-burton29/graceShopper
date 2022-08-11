const usersRouter = require("express").Router();
const prisma = require("../db/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../db/prisma");
const { JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

// getAllUsers()  requireAdmin
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await prisma.users.findMany();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

//getUserByUsername
usersRouter.get("/:username", async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await prisma.users.findUnique({
      where: { username },
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

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
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.users.findUnique({
      where: { username },
    });
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const token = jwt.sign(user, JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/:username", async (req, res, next) => {
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
    });
    res.send(editedUser);
  } catch (error) {
    next(error);
  }
});

//deleteUser      adminRequired
usersRouter.delete("/:username", async (req, res, next) => {
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

module.exports = usersRouter;
