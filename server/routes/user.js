const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const authenticateUser = require("../middleware/authenticateUser");

router.get("/current-user", authenticateUser, userController.currentUser);
router.post("/setup-riot-id", authenticateUser, userController.setupRiotId);

module.exports = router;
