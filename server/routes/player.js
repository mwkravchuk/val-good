const express = require("express");
const router = express.Router();

const playerController = require("../controllers/player");

router.get("/puuid", playerController.puuid);

router.get("/matches/:puuid", playerController.matches);

module.exports = router;
