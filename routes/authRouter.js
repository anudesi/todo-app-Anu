import express from "express"
const router = express.Router()
import {signinController, signupController, authorizeController} from "../controllers/authController.js"
import { verifyToken } from "../middlewares/verifyToken.js"

router.post("/signin", signinController)
router.post("/signup", signupController)
router.get("/authorization", verifyToken, authorizeController)

export default router