const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");
const authorize = require("../../../middlewares/roleMiddleware");
const authMiddleware = require("../../../middlewares/authMiddleware");

router.post(
  "/create-team",
  authMiddleware,
  authorize(3),
  controller.createTeam
);
router.get("/teams", authMiddleware, authorize(3), controller.getTeams);
router.get(
  "/team/:teamId",
  authMiddleware,
  authorize(3),
  controller.getTeamById
);

module.exports = router;
