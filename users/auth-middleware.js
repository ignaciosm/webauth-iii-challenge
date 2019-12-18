const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const {token} = req.headers;

  if (token) {
    const secret = process.env.JWT_SECRET || "senorita potatito del peru";

    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.token = decoded;

        next();
      }
    })
  } else {
    res.status(400).json({ message: "Please login and try again" });
  }
}