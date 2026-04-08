import express from "express";
import {
  addTransaction,
  getTransactions,
  deleteTransaction,
  getSummary,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/add", addTransaction);
router.get("/", getTransactions);
router.delete("/:id", deleteTransaction);
router.get("/summary", getSummary);

export default router;