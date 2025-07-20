import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Dynamically set allowed origin
const allowedOrigins = [
  "http://localhost:5173", // Local dev
  "https://expence-tracker-frontend.vercel.app", // 🟢 Your deployed frontend URL
];

// ✅ Allow only listed origins
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ✅ Serve static files (e.g. profile pics)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Log for debug
console.log("✅ Server is starting...");
console.log("✅ Loading auth & expense routes...");

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
