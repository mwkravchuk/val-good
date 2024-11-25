const express = require("express");
const router = express.Router();

const valorantController = require("../controllers/valorant");

router.get("/agent/:agentId", valorantController.agent);
router.get("/tiers/", valorantController.tiers);

module.exports = router;
