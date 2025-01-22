const express = require("express");
const router = express.Router();

const valorantController = require("../controllers/valorant");

router.get("/agent/:agentId", valorantController.agent);
router.get("/agents/", valorantController.agents);
router.get("/tiers/", valorantController.tiers);
router.get("/gamemodes/", valorantController.gamemodes);
router.get("/map/:mapId", valorantController.map);
router.get("/content", valorantController.content);

module.exports = router;
