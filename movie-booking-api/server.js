import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()
const  app = express()



app.get("/", (req, res) => {
    res.status(200).send("Connected to the PORT successfully");
});

app.use(express.json());  
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
