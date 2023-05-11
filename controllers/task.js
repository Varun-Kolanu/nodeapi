import {Task} from "../models/task.js";
import jwt from "jsonwebtoken";

export const addTask = async (req, res) => {
    const {title, description} = req.body;
    const task = await Task.create({title,description, user: req.user});
    res.json({
        success: true,
        message: "Task created successfully"
    });
};

export const showTasks = async (req, res) => {
    const tasks = await Task.find({user: req.user});
    res.json({
        success: true,
        tasks
    });
}

export const updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }
    task.isCompleted = !task.isCompleted;
    console.log(task);
    await task.save();
    res.status(200).json({
        success: true,
        message: "Task updated successfully"
    });
}

export const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }
    await task.deleteOne();
    res.status(200).json({
        success: true,
        message: "Task deleted successfully"
    });
}

