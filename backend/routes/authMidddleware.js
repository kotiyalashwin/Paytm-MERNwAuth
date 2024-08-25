const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHead = req.headers.authorization;

  if (!authHead || !authHead.startsWith("Bearer ")) {
    return res.status(400).json({});
  }

  const token = authHead.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWT_SECRET);

    if (decode.userId) {
      req.userId = decode.userId;
      next();
    }
  } catch (e) {
    return res.status(411).json({
      message: "error in auth",
    });
  }
};

module.exports = {
  authMiddleware,
};
