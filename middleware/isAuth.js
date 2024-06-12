const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.headers[tokenHeaderKey];

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return next();
    } else {
      // Access Denied
      return res.status(401).send({
        flag: false,
        message: "Access Denied",
      });
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send({
      flag: false,
      message: "Access Denied",
    });
  }
};
