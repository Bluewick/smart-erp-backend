import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
    createStockItem,
    editStockItem,
    getAllStockItems,
    getSingleStockItem,
    removeStockItem,
    getStockItemMonthlySummary
} from "../controllers/stockItemController.js";

const router = Router();

router.post("/:companyId/stock-items", authenticateUser, createStockItem);
router.put("/:companyId/stock-items/:itemId", authenticateUser, editStockItem);
router.get("/:companyId/stock-items", authenticateUser, getAllStockItems);
router.get("/:companyId/stock-items/:itemId", authenticateUser, getSingleStockItem);
router.delete("/:companyId/stock-items/:itemId", authenticateUser, removeStockItem);
router.get("/:companyId/stock-items/:itemId/monthly-summary", authenticateUser, getStockItemMonthlySummary);

export default router;