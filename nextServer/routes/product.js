const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const { authentication, adminAuth } = require("../middleware/auth");

router
  .get("/", productController.getAll)
  .get("/:id", productController.get)
  .post("/", authentication, adminAuth("admin"), productController.create)
  .patch("/:id", authentication, adminAuth("admin"), productController.update)
  .delete("/:id", authentication, adminAuth("admin"), productController.delete)
  .post("/review", authentication, productController.createReview)
  .get("/review/:id", productController.getAllReviews)
  .get("/review/delete", productController.deleteReview);

exports.router = router;
