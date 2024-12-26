const modal = require("../Models/user");
const ErrorHandler = require("../utils/errorhandler");
const User = modal.userModel;
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

const authentication = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login First.", 404));
  }
  const decodeddata = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodeddata.id);

  next();
});

const adminAuth = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        new ErrorHandler(
          `Role : ${req.user.role} is not allowed to acces this resource`,
          403
        )
      );
    }

    next();
  };
};

module.exports = { authentication, adminAuth };
