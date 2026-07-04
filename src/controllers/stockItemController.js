import * as stockService from "../services/stockItem.service.js";

export const createStockItem = async (req, res) => {
    try {
        const { companyId } = req.params;
        const result = await stockService.createStockService(companyId, req.user.id, req.body);
        return res.status(201).json({ success: true, message: "Stock item created", data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const editStockItem = async (req, res) => {
    try {
        const { companyId, itemId } = req.params;
        const result = await stockService.editStockService(companyId, itemId, req.user.id, req.body);
        return res.status(200).json({ success: true, message: "Stock item updated", data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const getAllStockItems = async (req, res) => {
    try {
        const { companyId } = req.params;
        const result = await stockService.getAllStockService(companyId, req.user.id);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const getSingleStockItem = async (req, res) => {
    try {
        const { companyId, itemId } = req.params;
        const result = await stockService.getSingleStockService(companyId, itemId, req.user.id);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
};

export const removeStockItem = async (req, res) => {
    try {
        const { companyId, itemId } = req.params;
        const result = await stockService.removeStockService(companyId, itemId, req.user.id);
        return res.status(200).json({ success: true, message: "Stock item deleted", data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const getStockItemMonthlySummary = async (req, res) => {
    try {
        const { companyId, itemId } = req.params;
        const result = await stockService.getStockItemMonthlySummaryService(companyId, itemId, req.user.id);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};