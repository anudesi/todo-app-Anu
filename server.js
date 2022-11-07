import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import { verifyToken } from "./middlewares/verifyToken.js";

import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json({ extended: true, limit: "30mb" }));

const PORT = process.env.PORT || 4000;

app.use("/auth", authRouter);
app.use("/dashboard", verifyToken, dashboardRouter)
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
