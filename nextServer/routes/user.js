const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { authentication, adminAuth } = require("../middleware/auth");

router

  .get("/me", userController.getUserDetails)
  .post("/register", userController.registerUser)
  .post("/login", userController.Login)
  .get("/logout", authentication, userController.Logout)
  .post("/password/forgot", userController.forgotPassword)
  .put("/password/reset/:token", userController.resetPassword)
  .put("/password/update", authentication, userController.updatePassword)
  .put("/update/:id", authentication, userController.updateProfile)
  .get("/", authentication, adminAuth("admin"), userController.GetAllUsers)
  .get("/:id", authentication, adminAuth("admin"), userController.getUser)
  .delete(
    "/:id",
    authentication,
    adminAuth("admin"),
    userController.deleteUser
  );
exports.router = router;

// .put(
//   "/role/update",
//   authentication,
//   adminAuth("admin"),
//   userController.updateRole
// )
