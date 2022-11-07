import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ extended: true, limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

const PORT = process.env.PORT || 4000;

app.use("/auth", authRouter);
app.post("*", (req, res) => {
  res.status(200).json({ message: "Reached" });
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Backend running at port :", PORT);
    }),
  )
  .catch((err) => console.log(err));
