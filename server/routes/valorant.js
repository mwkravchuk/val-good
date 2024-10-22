const express = require("express");
const router = express.Router();

const valorantController = require("../controllers/valorant");

router.get("/agent/:agentId", valorantController.agent);

module.exports = router;
