const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Authorization header missing or malformed");
    return res.status(401).json({ message: "No token provided." });
  }

  const token = authHeader.split(" ")[1];
  console.log("Authorization Header:", authHeader);
  console.log("Extracted Token:", token);

  try {
    const { username, userid } = jwt.verify(token, "secret");
    console.log("Token Verified. User ID:", userid, "Username:", username);
    req.user = { userid, username };
    next();
  } catch (error) {
    console.log("Token Verification Error:", error.message);
    return res.status(400).json({ message: "Invalid token." });
  }
}

module.exports = authMiddleware;
