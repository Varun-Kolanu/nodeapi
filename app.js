import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js"

export const app = express();
config({
    path: "./data/config.env"
});

//Using middlewares
app.use(express.json());
app.use("/users", userRouter );

app.get('/', (req, res) => {
    res.send('Hello World!');
});
