import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import { verifyToken } from "./middlewares/verifyToken.js";

// To get the path of our build folder and index.html in side heroku we need path and url packages.

import path from "path";
import { fileURLToPath } from "url";

import mongoose from "mongoose";

// First we will try to get the name of current file that is in our case server.js

const __filename = fileURLToPath(import.meta.url)


// We need to get name of the current directory that is in our case MERN-APP

const __dirname = path.dirname(__filename)

console.log("file name", __filename, "dir name", __dirname)

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json({ extended: true, limit: "30mb" }));


/* If we want to some images or files accessible to user from our backend we need to declare them as statice */
/* 
relative path to the build folder from server.js
./client/build this is our relative path to build folder from server.js

*/


// If we want to share a file or image or js from our backend to front then we need to declare that folder that is containing
// specific file as static. For the reason we are using expree.static() middleware inside our app

app.use(express.static(path.join(__dirname, "./client/build")))

const PORT = process.env.PORT || 4000;


// Any request that is defined by us as routes will be redirected to the specific controllers assigned for the route
app.use("/auth", authRouter);
app.use("/dashboard", verifyToken, dashboardRouter)


/* localhost:5000/home 
Any route that has not been defined above , his request will be  assigned to the "*" route 

- For deployment on Heroku we want to send the "index.html" file from our build folder to the user
  whenever he is trying to access any route that is not defined by us as backend-route.
*/

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,"./client", "build", "index.html"));
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
  
    app.listen(PORT, () => {
      console.log("Backend running at port :", PORT);
    }),
  )
  .catch((err) => console.log(err));
