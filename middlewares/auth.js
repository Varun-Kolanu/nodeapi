import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req,res,next) => {
    const {token} = req.cookies;
    if(!token) {
        return res.json({
            status: false,
            message: "Please Login first"
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded);
    next();
}

export default isAuthenticated;