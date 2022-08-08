// Utility functions for being more efficient! Also called helper funcs etc

// Higher order func, takes a callback and automatically returns an error
function asyncErrorHandler(callback) {
  return async function (req, res, next) {
    try {
      return callback(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

const requireUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401);
    next({
      error: "Invalid Token",
      message: "You must be logged in to perform this action",
      name: "Invalid token",
    });
  }
};

module.exports = {
  asyncErrorHandler,
  requireUser,
};
