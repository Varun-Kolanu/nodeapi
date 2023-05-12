import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";
import jwt from "jsonwebtoken";
import sendTrue from "../utils/sendTrueJson.js";

export const addTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const task = await Task.create({ title, description, user: req.user });
        sendTrue(res, "Task created successfully");
    } catch (error) {
        next(error);
    }
};

export const showTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user });
        res.json({
            success: true,
            tasks
        });
    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return next(new ErrorHandler("Task not found", 404))
        task.isCompleted = !task.isCompleted;
        console.log(task);
        await task.save();
        res.status(200).json({
            success: true,
            message: "Task updated successfully"
        });
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return next(new Error(`Task not found`))
        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}




