import { login, logout, myInfo, register } from "../controllers/user.js";
import express from "express";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();
router.post("/new", register);
router.post("/login", login);
router.get("/me",isAuthenticated, myInfo);  
router.get("/logout", logout);
// router.get("/all", allUsers);
// router.get("/userId/special", special);
// router.get("/userids", user);
// router.get("/userId/:id", userInfo);                   

// router.route("/x").get(a).post(b).put(c).delrte(d) <=> 
// router.get("/x",a)
// router.post("/x",b)
// router.put("/x",c)
// router.delete("/x",d)

export default router;