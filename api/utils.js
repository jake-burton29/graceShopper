const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const requireUser = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    const user = jwt.verify(token, JWT_SECRET);
    delete user.password;
    req.user = user;
    if (user) {
      next();
    }
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "You'll need to register for access to this function!",
    });
    return;
  }
};

const requireAdmin = (req, res, next) => {
  try {
    const user = req.user;
    if (!user.isAdmin) {
      throw error;
    }
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "Who do you think you are, an admin or something?",
    });
    return;
  }

  next();
};

const requireUserOrGuest = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    if (!token) {
      req.user.id = null;
      next();
    }
    const user = jwt.verify(token, JWT_SECRET);
    delete user.password;
    req.user = user;
    if (user) {
      next();
    }
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "You'll need to register for access to this function!",
    });
    return;
  }
};

module.exports = { requireUser, requireAdmin, requireUserOrGuest };
