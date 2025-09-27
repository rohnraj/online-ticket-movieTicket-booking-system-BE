import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import movieRoutes from "./routes/movieRoutes.js"
import cookieParser from "cookie-parser";
import { adminRightsController } from "./controllers/adminRightsController.js";

dotenv.config()
const  app = express()



app.get("/", (req, res) => {
    res.status(200).send("Connected to the PORT successfully");
});

app.use(express.json()); 
app.use(cookieParser()); 
app.use("/api/auth", authRoutes)
app.use("/api/movie", movieRoutes)
app.use("/api/getAdminRights", adminRightsController)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
