const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateUser = async (req, res, next) => {
  console.log("Auth Middleware: Checking user...");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("No token found. Skipping authentication.");
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    req.user = user;
    console.log("User authenticated:", user._id);
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.clearCookie("token");
    return res.redirect("/");
  }
};

module.exports = authenticateUser;
