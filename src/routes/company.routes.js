import express from 'express';
import { authenticateUser } from '../middleware/auth.middleware.js';
import { createCompany, editCompany, getCompanies, getCompanyById, removeCompany } from '../controllers/company.controller.js';


const router = express.Router();

router.post('/companies', authenticateUser, createCompany);
router.get('/companies', authenticateUser, getCompanies);
router.get('/companies/:id', authenticateUser, getCompanyById);
router.put('/companies/:id', authenticateUser, editCompany);
router.delete('/companies/:id', authenticateUser, removeCompany);

export default router;