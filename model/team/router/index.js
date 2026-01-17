const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");
const authorize = require("../../../middlewares/roleMiddleware");
const authMiddleware = require("../../../middlewares/authMiddleware");

router.post(
  "/create-team",
  authMiddleware,
  authorize(1),
  controller.createTeam
);
router.get("/teams", authMiddleware, authorize(1), controller.getTeams);
router.get(
  "/team/:teamId",
  authMiddleware,
  authorize(1),
  controller.getTeamById
);
router.put("/team", authMiddleware, authorize(1), controller.updateTeam);
router.delete(
  "/team/:teamId",
  authMiddleware,
  authorize(1),
  controller.deleteTeam
);

module.exports = router;
