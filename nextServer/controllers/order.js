const Order = require("../Models/order");
const ErrorHandler = require("../utils/errorhandler");
const apiFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { Product } = require("../Models/product");

//   Create New Order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    paidAt,
    subtotal,
    shipping,
    tax,
    totalPrice,
  } = req.body;

  console.log(subtotal, shipping, tax);
  const order = new Order({
    shippingInfo,
    orderItems,
    paidAt,
    subtotal,
    shipping,
    tax,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  if (!order) {
    return next(new ErrorHandler("Unable to Create Order", 403));
  }
  console.log("done");

  order.orderItems.forEach(async (o) => {
    await updateStocks(o.product, o.quantity);
  });
  await order.save();
  console.log("done 2");

  res.json({
    sucess: true,
    order,
  });
});

// get All Order User

exports.getAllOrders_User = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(new ErrorHandler(" Order not found", 404));
  }

  res.status(200).json({
    sucess: true,
    orders,
  });
});

// Get All ORder ADmin
exports.getAllOrders_Admin = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  if (!orders) {
    return next(new ErrorHandler(" Orders not found", 404));
  }

  let totalPrice = 0;

  orders.forEach((o) => {
    totalPrice += o.totalPrice;
  });

  res.status(200).json({
    sucess: true,
    totalPrice,
    orders,
  });
});

// Get a single  Order
exports.getOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.findById(req.params.id);

  if (!orders) {
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(200).json({
    sucess: true,
    orders,
  });
});

// delete Order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not Found", 403));
  }
  if (order.orderStatus === "Delivered") {
  } else {
    order.orderItems.forEach(async (o) => {
      await updateStocks(o.product, o.quantity, "+");
    });
  }

  res.status(200).json({
    sucess: true,
    order,
    message: "Order succesFully deleted",
  });
});

// Update ORder
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not Found", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Already Delivered", 400));
  }

  // order.orderItems.forEach(async (o) => {
  //   await updateStocks(o.product, o.quantity);
  // });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredon = Date.now();
  }

  order.save({ validateBeforeSave: false });
  res.status(200).json({
    sucess: true,
    message: "Order status updated",
  });
});

async function updateStocks(id, quantity, type) {
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Unable to find Product", 403));
  }
  console.log("before", product.stock);

  type==="+"? (product.stock += quantity) : (product.stock -= quantity);
  console.log("after", product.stock);

  await product.save({ validateBeforeSave: false });
}
