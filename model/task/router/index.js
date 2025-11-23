const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");
const authorize = require("../../../middlewares/roleMiddleware");
const authMiddleware = require("../../../middlewares/authMiddleware");

// Create
router.post("/task", authMiddleware, authorize(3), controller.createTask);

// Get All Tasks
router.get("/tasks", authMiddleware, authorize(3), controller.getAllTasks);

module.exports = router;
