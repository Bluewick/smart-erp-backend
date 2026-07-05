// smart-erp-backend
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import companyRoutes from "./routes/company.routes.js";
import ledgerRoutes from "./routes/ledger.routes.js";
import stockItemRoutes from "./routes/stockItem.routes.js";
import unitRoutes from "./routes/unit.routes.js";
import voucherRoutes from "./routes/voucher.routes.js";
import financialRoutes from "./routes/financial.routes.js";

console.log("Starting Server...");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", companyRoutes);
app.use("/api", ledgerRoutes);
app.use("/api", stockItemRoutes);
app.use("/api", unitRoutes);
app.use("/api", voucherRoutes);
app.use("/api", financialRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("SmartERP Backend is running 🚀");
});

const PORT = process.env.PORT || 5210;

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
