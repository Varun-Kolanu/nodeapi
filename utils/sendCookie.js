import jwt from "jsonwebtoken";

export const sendCookie = (user,res,message,statusCode = 200) => {
    const value = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    res
    .status(statusCode)
    .cookie("token", value, {
        httpOnly: true, maxAge: 15*60*1000
    })
    .json({
        success: true,
        message
    })
}