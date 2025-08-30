import { getUserByEmail, createUser } from "../models/authModel.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utiles/generateJWTToken.js";
import cookie from "cookie";


export async function registerUserController(req, res) {
    const { username, password, gender, phoneNumber, email } = req.body;
    console.log("req.body", req.body);
    if( !username || !password || !gender || !phoneNumber || !email ) {
        return res.status(400).send({ message: "All fields are required" });
    }
    // check if user already exists
    const alreadyExist = await getUserByEmail()
    if(alreadyExist.rows.length > 0) {
        return res.status(409).send({ message: "User already exists" });
    }

    const encyptedPassword = await bcrypt.hash(password, 10);
    console.log("encyptedPassword", encyptedPassword);

    createUser(username, encyptedPassword, gender, phoneNumber, email).then((data) => {
        res.status(201).send({ message: "User registered successfully", user: data.rows[0] });
    }).catch((err) => {
        console.error("Error creating user:", err); 
        res.status(500).send({ message: "Internal server error" });
    });
}


export async function loginUserController(req, res) {

    try {

        const { email, password } = req.body;
        if( !email || !password ) {
            return res.status(400).send({ message: "All fields are required" });
        }
    
        const user = await getUserByEmail(email);
        if(user.rows.length === 0) {
            return res.status(404).send({ message: "User not found" });
        }
        const validPassword = await bcrypt.compare(someOtherPlaintextPassword, hash);
        if(!validPassword) {
            return res.status(401).send({ message: "Invalid credentials" });
        }
    
        const accessToken = generateAccessToken(user.rows[0]);
        const refreshToken = generateRefreshToken(user.rows[0]);
    
        res.cookie("accessToken", accessToken, {
          httpOnly: true,   // cannot be accessed by JS
          secure: true,     // only works over https
          sameSite: "strict", // prevent CSRF
          maxAge: 15 * 60 * 1000, // 15 minutes
        });
    
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
    
        res.json({ message: "Login successful" });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: "Internal server error" });
    }

}

export const refreshTokenController = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "No refresh token provided" });

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired refresh token" });

    const accessToken = generateAccessToken(user);
    
    res.cookie("accessToken", accessToken, {
        httpOnly: true,   // cannot be accessed by JS
        secure: true,     // only works over https
        sameSite: "strict", // prevent CSRF
        maxAge: 15 * 60 * 1000, // 15 minutes
    });

  });
};

export async function logoutController(req, res) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
}