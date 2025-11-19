const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");

router.post("/reg", controller.Registration);
router.post("/login", controller.Login);

module.exports = router;
