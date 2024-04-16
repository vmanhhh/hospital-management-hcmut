import { Login, SignUp, updatePassword } from "../controllers/userController";
const router = require("express").Router();
router.post("/login", Login);
router.patch("/update/:id", updatePassword);
router.post("/signUp", SignUp);

export default router;

