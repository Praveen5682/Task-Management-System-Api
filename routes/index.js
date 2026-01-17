const express = require("express");

const router = express.Router();

// Authentication
router.use("/auth", require("../model/auth/router/index"));

// Team
router.use("/team", require("../model/team/router/index"));

// Task
router.use("/task", require("../model/task/router/index"));

// User
router.use("/users", require("../model/users/router/index"));

module.exports = router;
