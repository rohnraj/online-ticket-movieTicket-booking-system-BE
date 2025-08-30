import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1]; // Bearer token

    const token = req.cookies.token; 

  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    console.log("user", user)
    req.user = user;
    next();
  });
};
