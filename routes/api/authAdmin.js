const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

module.exports = function(req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token || token.indexOf("Bearer ") === -1)
    return res.status(401).json({ error: "Access denied. No token provided." });
  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token.replace("Bearer ", ""), keys.secretOrKey);
    req.user = decoded;
    if (req.user.IsAdmin !== true) {
      throw "Not Permitted!!";
    }
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send({ errror: "Invalid token." });
  }
};
