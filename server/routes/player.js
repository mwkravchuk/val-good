const express = require("express");
const router = express.Router();

const playerController = require("../controllers/player");

router.get("/puuid", playerController.puuid);

router.get("/matches/:puuid", playerController.matches);

router.get("/stored-matches/:puuid", playerController.storedMatches);

module.exports = router;
