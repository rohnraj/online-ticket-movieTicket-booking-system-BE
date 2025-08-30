import { getUserByEmail, createUser } from "../models/authModel.js";


export async function registerUserController(req, res) {
    const { username, password, gender, phoneNumber, email } = req.body;
    console.log("req.body", req.body);
    if( !username || !password || !gender || !phoneNumber || !email ) {
        return res.status(400).send({ message: "All fields are required" });
    }
    // check if user already exists
    const alreadyExist = await getUserByEmail()
    console.log("alreadyExist", alreadyExist);
    if(alreadyExist.rows.length > 0) {
        return res.status(409).send({ message: "User already exists" });
    }

    createUser(username, password, gender, phoneNumber, email).then((data) => {
        res.status(201).send({ message: "User registered successfully", user: data.rows[0] });
    }).catch((err) => {
        console.error("Error creating user:", err); 
        res.status(500).send({ message: "Internal server error" });
    });
}