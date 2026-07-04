import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { createPurchaseVoucher, createSalesVoucher } from "../controllers/voucher.controller.js";

const router = Router();

router.post("/:companyId/vouchers/purchase", authenticateUser, createPurchaseVoucher);
router.post("/:companyId/vouchers/sales", authenticateUser, createSalesVoucher); 

export default router;