const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");
const authorize = require("../../../middlewares/roleMiddleware");
const authMiddleware = require("../../../middlewares/authMiddleware");

router.post("/task", authMiddleware, authorize(3), controller.createTask);

module.exports = router;
