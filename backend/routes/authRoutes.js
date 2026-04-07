import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { updateProfile, getMe } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", protect, updateProfile);
router.get("/me", protect, getMe);

export default router;