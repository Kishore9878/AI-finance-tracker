import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getAIInsights } from "../controllers/aiController.js";
import upload from "../middleware/upload.js";
import { scanReceipt } from "../controllers/aiController.js";

const router = express.Router();

router.get("/", protect, getAIInsights);
router.post("/scan", protect, upload.single("image"), scanReceipt);

export default router;