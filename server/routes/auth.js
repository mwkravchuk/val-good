const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

const authenticateUser = require("../middleware/authenticateUser");
const authController = require("../controllers/auth");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the token in the HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // The cookie cannot be accessed by JavaScript
      //secure: true,
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000, // 1 hour expiration
    });

    res.redirect("http://localhost:5173/redirect");
  }
);

router.get("/user", authenticateUser, authController.user);

router.get("/logout/failed", authController.logout);

module.exports = router;
