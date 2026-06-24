const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { submitRating, updateRating } = require("../controllers/rating");


router.post(
  "/submit",
  authMiddleware,
  submitRating
);

router.put(
  "/update/:storeId",
  authMiddleware,
  updateRating
);

module.exports = router;