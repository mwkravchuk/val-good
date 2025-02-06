const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};

module.exports = authenticateUser;
