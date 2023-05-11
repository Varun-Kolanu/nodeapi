import { User } from "../models/user.js";
import bcrypt from"bcrypt";
import { sendCookie } from "../utils/sendCookie.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const {username,email,password} = req.body;
    let user = await User.findOne({email});
    if(user) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        }); 
    }
    const hashedPwd = await bcrypt.hash(password,10);
    user = await User.create({username, email, password: hashedPwd});
    sendCookie(user,res,"You have registered successfully", 201);
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email}).select("+password");
    if(!user) {
        return res.status(400).json({
            success: false,
            message: "User does not exist"
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid email or password"
        });
    }
    sendCookie(user,res,`Welcome back ${user.username}`,200);
}

export const logout = async (req, res) => {
    res.cookie("token",null, {
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Logged out Successfully"
    });
}

export const myInfo = async (req, res) => {
    res.status(200)
    .json({
        success: true,
        user: req.user
    })
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