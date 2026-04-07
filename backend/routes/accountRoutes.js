import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getAccounts,
  createAccount,
  setDefaultAccount,
  deleteAccount,
} from "../controllers/accountController.js";

const router = express.Router();

router.get("/", protect, getAccounts);
router.post("/", protect, createAccount);
router.put("/default/:id", protect, setDefaultAccount);
router.delete("/:id", protect, deleteAccount);

export default router;