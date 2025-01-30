const express = require("express");
const passport = require("passport");
const router = express.Router();

const authController = require("../controllers/auth");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.googleAuthSuccess
);

router.get("/logout", authController.logout);

module.exports = router;
