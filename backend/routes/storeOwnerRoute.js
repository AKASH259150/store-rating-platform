const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {storeOwnerDashboard} = require("../controllers/storeOwner");

router.get("/dashboard", authMiddleware, storeOwnerDashboard);

module.exports = router;
