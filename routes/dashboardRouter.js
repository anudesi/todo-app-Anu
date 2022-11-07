import express from "express"
const router = express.Router()
import {todoCreator, getTodoList} from "../controllers/dashboardController.js"

router.post("/create-todo", todoCreator)
router.get("/my-tasks", getTodoList)

export default router