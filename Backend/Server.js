import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());              // ✅ important
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/transactions", transactionRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});