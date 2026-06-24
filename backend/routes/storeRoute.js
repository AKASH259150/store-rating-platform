const express = require("express");
const router = express.Router();

const {createStore, getAllStores} = require("../controllers/store");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");



router.post("/create",authMiddleware, adminMiddleware, createStore );
router.get("/", getAllStores);

module.exports = router;