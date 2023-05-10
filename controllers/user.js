import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const {username,email,password} = req.body;
    const user = await User.create({username, email, password});
    const value = jwt.sign({_id: user._id}, "abhbvfbhv");
    res.status(201).cookie("loggedin", value).json({
        success: true,
        message: "User created successfully"
    })
};

export const allUsers = async (req, res) => {
    const users = await User.find({});
    console.log(req.query);
    res.json({
        success: true,
        users
    })
};

export const special = (req, res) => {
    res.json({
        success: true,
        message: "Just kidding"
    })
};

export const userInfo = async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(req.params);
    res.json({
        success: true,
        user
    })
};

export const user = async (req, res) => {
    const user = await User.findById(req.query.id);
    res.json({
        success: true,
        user
    });
};