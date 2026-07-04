import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { getProfitAndLossSummary } from "../controllers/financial.controller.js";

const router = Router();

router.get("/:companyId/profit-loss", authenticateUser, getProfitAndLossSummary);

export default router;