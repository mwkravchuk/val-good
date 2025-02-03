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
  (req, res) => {
    // User is authenticated. Redirect.
    res.redirect("http://localhost:5173/");
  }
);

router.get("/logout", authController.logout);

module.exports = router;
