// smart-erp-backend
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"

console.log("Starting Server...");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("SmartERP Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL Connected");
    console.log(result.rows[0]);
} catch (err) {
    console.error("❌ Database Connection Failed");
    console.error(err.message);
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});