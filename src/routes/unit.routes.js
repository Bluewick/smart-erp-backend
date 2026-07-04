import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
    createUnit,
    editUnit,
    getAllUnits,
    getSingleUnit,
    removeUnit
} from "../controllers/unit.controller.js";

const router = Router();

router.post("/:companyId/units", authenticateUser, createUnit);
router.put("/:companyId/units/:unitId", authenticateUser, editUnit);
router.get("/:companyId/units", authenticateUser, getAllUnits);
router.get("/:companyId/units/:unitId", authenticateUser, getSingleUnit);
router.delete("/:companyId/units/:unitId", authenticateUser, removeUnit);

export default router;