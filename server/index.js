import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
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


app.listen(port, () => {
  console.log("Connected to server");
});


app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)