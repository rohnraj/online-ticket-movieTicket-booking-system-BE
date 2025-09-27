import pool_instance from "../config/db.js";
import { generateAccessToken, generateRefreshToken } from "../utiles/generateJWTToken.js";

//this data will provided by userAdmin that only me rohan
export const adminRightsController = (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email ) {
            return res.status(400).json({ message: "userName and email is required plz provide them" });
        }
        const query = "SELECT * FROM admins WHERE email = $1";
        const values = [email];
        pool_instance.query(query, values)
            .then(result => {

                if (result.rows.length === 0) {
                    return res.status(409).json({ message: "Admin with this email already exists" });
                }
                else if(password !== result.rows[0].password) {
                    return res.status(403).json({ message: "Only admin can grant admin rights" });
                }
                const accessToken = generateAccessToken(result.rows[0]);
                const refreshToken = generateRefreshToken(result.rows[0]);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000, 
                });
                res.cookie("accessToken", accessToken, {
                    httpOnly: true,   
                    secure: true,     
                    sameSite: "strict", 
                    maxAge: 15 * 60 * 1000, 
                });
                res.status(201).json({ message: "Admin rights granted successfully", admin: result.rows[0] });
            })
            .catch(error => {
                console.error("Error granting admin rights:", error);
                res.status(500).json({ message: "Internal server error" });
            });
    } catch (error) {
        console.error("Error in adminRightsController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}