import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ✅ 1. Import CORS
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ 2. Enable CORS for your frontend
app.use(cors({
  origin: 'http://localhost:5173', // React app's URL
  credentials: true
}));

// ✅ 3. Serve static files (profile images)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Debugging logs
console.log("✅ Server is starting...");
console.log("✅ Loading auth & expense routes...");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
