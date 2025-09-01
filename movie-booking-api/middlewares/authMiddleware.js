import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1]; // Bearer token

    const token = req.cookies?.accessToken; 
    console.log("token", req.cookies)

  if (!token) {
    refreshTokenController()
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    console.log("user", user)
    req.user = user;
    next();
  });
};
