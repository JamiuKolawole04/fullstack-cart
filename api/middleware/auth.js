const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({
      succss: false,
      message: "Access denied.please log in...",
    });
  }

  try {
    const secretKey = process.env.ACCESS_TOKEN_SECRET;

    const user = jwt.verify(token, secretKey);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({
      success: true,
      message: err,
    });
  }
};

const isUser = (req, res, next) => {
  auth(req, res, () => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        success: true,
        message: "Access deneid. Not authorized",
      });
    }
  });
};

const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({
        succss: false,
        message: "Access denied.Not authorized...",
      });
    }
  });
};

module.exports = { auth, isAdmin, isUser };
