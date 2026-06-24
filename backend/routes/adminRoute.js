const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { adminDashboard, getAllUsers, getUserById } = require("../controllers/adminDashboard");

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  adminDashboard
);
router.get("/users",authMiddleware,adminMiddleware, getAllUsers);
router.get("/user",authMiddleware,adminMiddleware, getUserById);


module.exports = router;