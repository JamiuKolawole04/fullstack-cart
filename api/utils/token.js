const jwt = require("jsonwebtoken");

const generateAuthToken = (user) => {
  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    secretKey
  );
  return token;
};

module.exports = generateAuthToken;
