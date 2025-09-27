import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } 
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } 
  );
};

export const refreshTokenController = (req, res, next) => {

  const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token provided" });

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired refresh token" });

    const accessToken = generateAccessToken(user);
    console.log("new access token", accessToken)
    
    res.cookie("accessToken", accessToken, {
        httpOnly: true,   // cannot be accessed by JS
        secure: true,     // only works over https
        sameSite: "strict", // prevent CSRF
        maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // res.json({ message: "Access token refreshed successfully" });
    next();

  });
};
