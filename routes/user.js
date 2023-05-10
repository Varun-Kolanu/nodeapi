import { allUsers, register, special, user, userInfo } from "../controllers/user.js";
import express from "express";

const router = express.Router();
router.post("/new", register);
router.get("/all", allUsers);
router.get("/userId/special", special);
router.get("/userId/:id", userInfo);                            
router.get("/userids", user);

// router.route("/x").get(a).post(b).put(c).delrte(d) <=> 
// router.get("/x",a)
// router.post("/x",b)
// router.put("/x",c)
// router.delete("/x",d)

export default router;