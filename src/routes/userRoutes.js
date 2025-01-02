const express = require("express");
const { userController } = require("../controllers");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateRequest");
const { addUserSchema } = require("../utils/validationSchemas");

const router = express.Router();

// Get all users (Admin only)
router.get("/", authenticate, authorize(["admin"]), userController.getAllUsers);

// Add a new user (Admin only)
router.post(
  "/add-user",
  authenticate,
  validate(addUserSchema),
  authorize(["admin"]),
  userController.addUser
);

// Delete a user by ID (Admin only)
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  userController.deleteUser
);

// Update user password (Any authenticated user)
router.put("/update-password", authenticate, userController.updatePassword);

module.exports = router;
