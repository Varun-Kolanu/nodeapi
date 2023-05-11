import express from "express";
import { addTask, deleteTask, showTasks, updateTask } from "../controllers/task.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, addTask);
router.get("/myTasks",isAuthenticated, showTasks)
router.route("/:id").put(updateTask).delete(deleteTask);

export default router;