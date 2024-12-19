// const validator = require("validator");
// const bycrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
// const { Product } = require("./product");
// const { type } = require("os");

const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    // pinCode: {
    //   type: Number,
    //   required: true,
    // },
    phoneNo: {
      type: Number,
      required: true,
    },
  },

  orderItems: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],

  // paymentInfo: {
  //   id: {
  //     type: String,
  //     required: true,
  //   },
  //   status: {
  //     type: String,
  //     required: true,
  //   },
  // },

  // paidAt: {
  //   type: Date,
  //   required: true,
  // },

  subtotal: {
    type: Number,
    default: 0,
    required: true,
  },
  shipping: {
    type: Number,
    default: 0,
    required: true,
  },
  tax: {
    type: Number,
    default: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredon: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
