import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/sendCookie.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/error.js";
import sendTrue from "../utils/sendJson.js";

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User already exists", 400));
        const hashedPwd = await bcrypt.hash(password, 10);
        user = await User.create({ username, email, password: hashedPwd });
        sendCookie(user, res, "You have registered successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("User does not exists", 404));
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new ErrorHandler("Invalid email or password"));
        sendCookie(user, res, `Welcome back ${user.username}`, 200);
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now())
        })
        sendTrue(res, "Logged out successfully");
    } catch (error) {
        next(error);
    }
}

export const myInfo = async (req, res) => {
    try {
        res.status(200)
            .json({
                success: true,
                user: req.user
            })
    } catch (error) {
        next(error);
    }
}

// export const allUsers = async (req, res) => {
//     const users = await User.find({});
//     console.log(req.query);
//     res.json({
//         success: true,
//         users
//     })
// };

// export const special = (req, res) => {
//     res.json({
//         success: true,
//         message: "Just kidding"
//     })
// };

// export const userInfo = async (req, res) => {
//     const user = await User.findById(req.params.id);
//     console.log(req.params);
//     res.json({
//         success: true,
//         user
//     })
// };

// export const user = async (req, res) => {
//     const user = await User.findById(req.query.id);
//     res.json({
//         success: true,
//         user
//     });
// };