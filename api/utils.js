const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const requireUser = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    const user = jwt.verify(token, JWT_SECRET);
    delete user.password;
    req.user = user;

    // is valid is actually the user, so you could set the req.user here
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
