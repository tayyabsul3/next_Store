const modal = require("../Models/user");
const ErrorHandler = require("../utils/errorhandler");
const User = modal.userModel;
const catchAysncErrors = require("../middleware/catchAsyncErrors");
const apiFeatures = require("../utils/apiFeatures");
const sendToken = require("../utils/jsonToken");
const sendEmail = require("../utils/sendemail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");

exports.registerUser = catchAysncErrors(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  const { name, email, password } = req.body;
  const user = await new User({
    name,
    email,
    password,
    // avatar: {
    //   public_id: myCloud.public_id,
    //   url: myCloud.secure_url,
    // },
  });

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  await user.save();

  sendToken(user, 201, res);
});

exports.Login = catchAysncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Enter Email and Password", 400));
  }

  //if email and password found
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  //If user found thengernerate a token
  const isMatchingPassowrd = await user.ComparePassword(password);

  if (!isMatchingPassowrd) {
    return next(new ErrorHandler("Incorrect Email or Password", 404));
  }

  sendToken(user, 200, res);

  //   const token = await user.getJwtToken();
  //   res.status(201).json({
  //     sucess: true,
  //     user,
  //     token,
  //   });
});

exports.Logout = catchAysncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httponly: true,
  });

  res.status(200).json({
    sucess: true,
    message: "User Logged out",
  });
});

//{ASSWORD FORGOTCODE

exports.forgotPassword = catchAysncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  //Getting reste pasword token

  const resetToken = await user.getResetPasswordToken();
  console.log("resetToken", resetToken);
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/users/password/reset/${resetToken}`;
  const message = `your reset Password token is \n\n\t\t${resetPasswordUrl} \n\n If you have not requested this email kindly Ignore this Email.`;
  console.log("message", message);
  // try {
  //   console.log("message #2");
  //   await sendEmail({
  //     email: user.email,
  //     subject: "Ecommerce Website Recovery Mail",
  //     message,
  //   });
  // } catch (error) {
  //   user.resetPasswordExpire = undefined;
  //   user.resetPasswordToken = undefined;
  //   await user.save({ validateBeforeSave: false });
  //   return next(new ErrorHandler(error.message, 404));
  // }
  console.log("message #2");
  res.status(200).json({
    sucess: true,
    token: resetToken,
    user,
  });
});

exports.resetPassword = catchAysncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  console.log(req.params.token);

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset Token Invalid or Expired", 404));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 402));
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save({ validateBeforeSave: false });
  sendToken(user, 200, res);
});

exports.updatePassword = catchAysncErrors(async (req, res, next) => {
  const oldpassword = req.body.password;

  const isMatchingPassowrd = await req.user.ComparePassword(oldpassword);

  if (!isMatchingPassowrd) {
    return next(new ErrorHandler("Incorrect Old Password", 401));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    if (!isMatchingPassowrd) {
      return next(new ErrorHandler("Passwords do not match", 401));
    }
  }

  req.user.password = req.body.newPassword;

  await req.user.save(); ///password hased
  res.status(200).json({
    sucess: true,
    message: "Password updated succesfully",
  });
});

exports.updateProfile = catchAysncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData);
  if (!user) {
    return next(new ErrorHandler("Error try agin", 404));
  }

  await user.save();
  res.status(200).json({
    sucess: true,
    message: "Profile updated succesfully",
  }); ///password hased
});

// ADMin get All users

// exports.updateRole = catchAysncErrors(async (req, res, next) => {
//   const newUserData = {
//     name: req.body.name,
//     email: req.body.email,
//     role: req.body.role,
//   };

//   const user = await User.findByIdAndUpdate(req.user.id, newUserData);

//   if (!user) {
//     return next(new ErrorHandler("user not found", 404));
//   }
//   await user.save(); ///password hased
// });

exports.GetAllUsers = catchAysncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    sucess: true,
    users,
  });
});

exports.getUser = catchAysncErrors(async (req, res, next) => {
  const users = await User.findById(req.params.id);

  if (!users) {
    return next(new ErrorHandler("User not Found", 404));
  }

  res.status(200).json({
    sucess: true,
    users,
  });
});

// exports.getUser = catchAysncErrors(async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     return next(new ErrorHandler("User not Found", 404));
//   }

//   res.status(200).json({
//     sucess: true,
//     user,
//   });
// });

exports.deleteUser = catchAysncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User does not exist", 404));
  }
  res.status(200).json({
    sucess: true,
    user,
  });
});

exports.getUserDetails = catchAysncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Cannot Access this resource", 404));
  }
  const decodeddata = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.find({ _id: decodeddata.id });

  res.status(200).json({
    success: true,
    user,
  });
});
