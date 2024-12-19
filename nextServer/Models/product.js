const mongoose = require("mongoose");
const { type } = require("os");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, " Please enter product name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, " Please enter product description"],
  },
  category: {
    type: String,
    required: [true, " Please enter product catgory"],
  },
  price: {
    type: Number,
    required: [true, " Please enter product price"],
    maxLength: [8, "cannot be greater than 8 characters"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    maxLength: [4, "cannot be greater than 4 characters"],
    default: 1,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  images: {
    type: [String],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
    default: "New",
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

exports.Product = mongoose.model("Product", productSchema);
