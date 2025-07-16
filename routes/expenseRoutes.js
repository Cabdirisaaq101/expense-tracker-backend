import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

// Routes
router.post("/", protect, createExpense); // Create Expense
router.get("/", protect, getExpenses); // Get All Expenses
router.put("/:id", protect, updateExpense); // Update Expense
router.delete("/:id", protect, deleteExpense); // Delete Expense

export default router;
