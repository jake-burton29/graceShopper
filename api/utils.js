const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const requireUser = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    const isValid = jwt.verify(token, JWT_SECRET);
    if (isValid) {
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
  const token = req.signedCookies.token;
  try {
    const user = jwt.verify(token, JWT_SECRET);
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

module.exports = { requireUser, requireAdmin };
