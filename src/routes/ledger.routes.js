import express from 'express';
import { authenticateUser } from '../middleware/auth.middleware.js';
import { createLedger, editLedger, getAllLedgers, getSingleLedger, removeLedger } from '../controllers/ledger.controller.js';

const router = express.Router();

router.post('/:companyId/ledgers', authenticateUser, createLedger);
router.put('/:companyId/ledgers/:ledgerId', authenticateUser, editLedger);
router.delete('/:companyId/ledgers/:ledgerId', authenticateUser, removeLedger);
router.get('/:companyId/ledgers', authenticateUser, getAllLedgers);
router.get('/:companyId/ledgers/:ledgerId', authenticateUser, getSingleLedger);

export default router; 