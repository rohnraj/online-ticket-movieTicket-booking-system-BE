import { 
    getUserByEmail, 
    createUser, 
    updateNewPassword,
    updateUsername,
    updatePhoneNumber,
    updateEmail,
    getUserByID
} from "../models/authModel.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utiles/generateJWTToken.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";


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

        const { email, password, role } = req.body;

        //we will redirect admin to admin portal from here
        // if( role === "admin" ) {
        //     return res.status(403).redirect();
        // }

        if( !email || !password ) {
            return res.status(400).send({ message: "All fields are required" });
        }
    
        const user = await getUserByEmail(email);
        if(user.rows.length === 0) {
            return res.status(404).send({ message: "User not found" });
        }
        const hashPassword = user.rows[0].password;
        const validPassword = await bcrypt.compare(password, hashPassword);
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

// export const refreshTokenController = (req, res) => {

//   const token = req.cookies?.refreshToken;
//     if (!token) return res.status(401).json({ message: "No refresh token provided" });

//   jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid or expired refresh token" });

//     const accessToken = generateAccessToken(user);
//     console.log("new access token", accessToken)
    
//     res.cookie("accessToken", accessToken, {
//         httpOnly: true,   // cannot be accessed by JS
//         secure: true,     // only works over https
//         sameSite: "strict", // prevent CSRF
//         maxAge: 15 * 60 * 1000, // 15 minutes
//     });

//     res.json({ message: "Access token refreshed successfully" });

//   });
// };

export async function logoutController(req, res) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
}

export async function getUserController(req, res) {
    const userData = await getUserByID(req?.user?.id);
    if(userData.rows.length === 0) {
        return res.status(404).send({ message: "User not found" });
    }
    const user = {
        id: userData.rows[0].id,
        username: userData.rows[0].username,
        email: userData.rows[0].email,
        phoneNumber: userData.rows[0].phonenumber,
    }
    res.status(200).json({ user });
}

export async function updateUserController(req, res) {
    const { username, phoneNumber, email, Newpassword, oldPassword } = req.body;
    const user = await getUserByID(req?.user?.id);
    if(user.rows.length === 0) {
        return res.status(404).send({ message: "User not found" });
    }
    if( Newpassword ) {
        const hashPassword = user.rows[0].password;
        const passwordValid = await bcrypt.compare(oldPassword, hashPassword);
        if(!passwordValid) {
            return res.status(401).send({ message: "Invalid credentials" });
        }else{
            const encyptedPassword = await bcrypt.hash(Newpassword, 10);
            const updateNewpass = await updateNewPassword(req?.user?.id, encyptedPassword)
            if(updateNewpass){
                return res.status(200).send({ message: "Password updated successfully" });
            }else{
                return res.status(500).send({ message: "Internal server error" });
            }
        }
    }

    else if(username) {
       updateUsername(req.user.id,username).then((data) => {
            res.status(200).send({ message: "Username updated successfully", user: data.rows[0] });
        }).catch((err) => {
            console.error("Error updating username:", err); 
            res.status(500).send({ message: "Internal server error" });
        });
    }
    else if(phoneNumber) {
        updatePhoneNumber(req.user.id,phoneNumber).then((data) => {
            res.status(200).send({ message: "Phone number updated successfully", user: data.rows[0] });
        }).catch((err) => {
            console.error("Error updating phone number:", err); 
            res.status(500).send({ message: "Internal server error" });
        });
    }
    else if(email) {
        updateEmail(req.user.id,email).then((data) => {
            res.status(200).send({ message: "Email updated successfully", user: data.rows[0] });
        }).catch((err) => {
            console.error("Error updating email:", err); 
            res.status(500).send({ message: "Internal server error" });
        });
    }

}