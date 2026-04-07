import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getDashboardData,
  getCategoryBreakdown,
  getMonthlyData,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", protect, getDashboardData);
router.get("/categories", protect, getCategoryBreakdown); // 👈 THIS LINE
router.get("/monthly", protect, getMonthlyData);

export default router;