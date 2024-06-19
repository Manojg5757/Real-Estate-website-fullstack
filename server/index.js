import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => console.log(err));

const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Manoj" });
});

app.listen(port, () => {
  console.log("Connected to server");
});
