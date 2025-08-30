import express from "express"
import dotenv from "dotenv"

dotenv.config()
const  app = express()

const PORT = process.env.PORT || 8000;


app.get("/", (req, res) => {
  res.status(200).send("Connected to the PORT successfully");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
