exports.logout = async (req, res) => {};

exports.user = (req, res) => {
  res.json({ user: req.user });
};
