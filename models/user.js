import mongoose from "mongoose";

const mySchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
})

export const User = mongoose.model("User", mySchema);