///

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "15s" });
}

export { authenticateToken, generateAccessToken };
