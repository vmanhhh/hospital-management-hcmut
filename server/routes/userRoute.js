import { Login, SignUp, updatePassword } from "../controllers/user.js";
import express from "express";

const router = express.Router();
router.post("/login", Login);
router.patch("/update/:id", updatePassword);
router.post("/signUp", SignUp);

export default router;

