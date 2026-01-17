const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");
const authorize = require("../../../middlewares/roleMiddleware");
const authMiddleware = require("../../../middlewares/authMiddleware");

// Create
router.post("/task", authMiddleware, authorize(1), controller.createTask);

// Get All Tasks
router.get("/tasks", authMiddleware, authorize(1), controller.getAllTasks);

// Update Task
router.put(
  "/task/:taskid",
  authMiddleware,
  authorize(1),
  controller.updateTask
);

// Delete Task
router.delete(
  "/task/:taskid",
  authMiddleware,
  authorize(1),
  controller.deleteTask
);

module.exports = router;
