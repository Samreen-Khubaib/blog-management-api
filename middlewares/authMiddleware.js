const { getLoggedInUserId } = require("../controllers/authController");

const isAuthenticated = (req, res, next) => {
  const userId = getLoggedInUserId();
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  req.userId = userId;
  next();
};

module.exports = isAuthenticated;
