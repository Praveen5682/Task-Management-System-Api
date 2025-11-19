const express = require("express");

const router = express.Router();

// Authentication
router.use("/auth", require("../model/auth/router/index"));

// Team
router.use("/team", require("../model/team/router/index"));

module.exports = router;
