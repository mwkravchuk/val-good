const express = require("express");
const passport = require("passport");
const router = express.Router();

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
    const { user } = req.user;

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });

    // Set the token in the HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // The cookie cannot be accessed by JavaScript
      secure: process.env.NODE_ENV === "production", // Use 'secure' flag in production for HTTPS
      sameSite: "Strict", // CSRF protection
      maxAge: 60 * 60 * 1000, // 1 hour expiration
    });

    res.redirect("http://localhost:5173");
  }
);

router.get("/logou/failed", authController.logout);

module.exports = router;
