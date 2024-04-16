import express from "express";
import adminMiddleware from "../middleware/adminMiddleware";
import { postAdmin, getAdmin, getAdminById, updateAdmin } from "../controllers/admin";
const router = express.Router();

router.post("/", adminMiddleware, postAdmin);
router.get("/", adminMiddleware, getAdmin);
router.get("/:id", adminMiddleware, getAdminById);
router.patch("/:id", adminMiddleware, updateAdmin);

export default router;
