const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const { authentication, adminAuth } = require("../middleware/auth");

router
  .post("/new", authentication, orderController.newOrder)
  .get("/myOrders", authentication, orderController.getAllOrders_User)
  .get(
    "/allOrders",
    authentication,
    adminAuth("admin"),
    orderController.getAllOrders_Admin
  )
  .get("/:id", authentication, adminAuth("admin"), orderController.getOrder)
  .put("/:id", authentication, adminAuth("admin"), orderController.updateOrder)
  .delete(
    "/:id",
    authentication,
    adminAuth("admin"),
    orderController.deleteOrder
  );

exports.router = router;
