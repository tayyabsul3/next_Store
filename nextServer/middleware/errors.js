const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  //mongo db error
  if (err.name === "CastError") {
    const message = `Not found: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  //duplicate data entered error handler
  if (err.code === 11000 || err.code === 11001) {
    const message = `Duplicate: ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Json web token error: try again`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json web token expired: try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
