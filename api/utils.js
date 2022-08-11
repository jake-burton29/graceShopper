const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const requireUser = (req, res, next) => {
  const token = req.signedCookies.token;
  try {
    jwt.verify(token, JWT_SECRET);
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "You are def not authorized.",
    });
    return;
  }

  next();
};

const requireAdmin = (req, res, next) => {
  const token = req.signedCookies.token;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    if (user.isAdmin) {
      next();
    }
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "You are def not authorized.",
    });
    return;
  }

  next();
};

module.exports = { requireUser, requireAdmin };
