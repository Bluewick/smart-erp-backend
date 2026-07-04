import { createLedgerService, editLedgerService, getAllLedgersService, getSingleLedgerService, removeLedgerService } from "../services/ledger.service.js";

export const createLedger = async (req, res) => {
    try {
        const { companyId } = req.params;
        const userId = req?.user?.id;

        const result = await createLedgerService(companyId, userId, req.body);

        return res.status(201).json({
            success: true,
            message: 'Ledger created successfully',
            data: result
        });
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const editLedger = async (req, res) => {
    try {
        const { companyId, ledgerId } = req.params;
        const userId = req?.user?.id;

        const result = await editLedgerService(companyId, ledgerId, userId, req.body);

        return res.status(200).json({
            success: true,
            message: 'Ledger updated successfully',
            data: result
        });
        
    } catch (error) {
        const statusCode = error.message.includes("Unauthorized") ? 403 : 400;
        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export const removeLedger = async (req, res) => {
    try {
        const { companyId, ledgerId } = req.params;
        const userId = req?.user?.id;

        const result = await removeLedgerService(companyId, ledgerId, userId);

        return res.status(200).json({
            success: true,
            message: 'Ledger deleted successfully',
            data: result
        });
        
    } catch (error) {
        const statusCode = error.message.includes("Unauthorized") ? 403 : 404;
        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllLedgers = async (req, res) => {
    try {
        const { companyId } = req.params;
        const userId = req?.user?.id;

        const result = await getAllLedgersService(companyId, userId);

        return res.status(200).json({
            success: true,
            message: 'Ledgers list fetched successfully',
            data: result
        });
        
    } catch (error) {
        const statusCode = error.message.includes("Unauthorized") ? 403 : 400;
        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export const getSingleLedger = async (req, res) => {
    try {
        const { companyId, ledgerId } = req.params;
        const userId = req?.user?.id;

        const result = await getSingleLedgerService(companyId, ledgerId, userId);

        return res.status(200).json({
            success: true,
            message: 'Ledger details fetched successfully',
            data: result
        });
        
    } catch (error) {
        const statusCode = error.message.includes("Unauthorized") ? 403 : 404;
        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};