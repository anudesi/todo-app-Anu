import express from "express"
const router = express.Router()
import {signinController, signupController, authorizeController} from "../controllers/authController.js"
import { verifyToken } from "../middlewares/verifyToken.js"

router.post("/signin", signinController)
router.post("/signup", signupController)

// Have created this route because
/* 
-If the user was already having a token inside his localstorage
-App.js will send a request at this route to verify the token
 */
router.get("/authorization", verifyToken, authorizeController)

export default router