import * as unitService from "../services/unit.service.js";

export const createUnit = async (req, res) => {
    try {
        const { companyId } = req.params;
        const result = await unitService.createUnitService(companyId, req.user.id, req.body);
        return res.status(201).json({ success: true, message: "Unit created successfully", data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const editUnit = async (req, res) => {
    try {
        const { companyId, unitId } = req.params;
        const result = await unitService.editUnitService(companyId, unitId, req.user.id, req.body);
        return res.status(200).json({ success: true, message: "Unit updated successfully", data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const getAllUnits = async (req, res) => {
    try {
        const { companyId } = req.params;
        const result = await unitService.getAllUnitsService(companyId, req.user.id);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const getSingleUnit = async (req, res) => {
    try {
        const { companyId, unitId } = req.params;
        const result = await unitService.getSingleUnitService(companyId, unitId, req.user.id);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
};

export const removeUnit = async (req, res) => {
    try {
        const { companyId, unitId } = req.params;
        const result = await unitService.removeUnitService(companyId, unitId, req.user.id);
        return res.status(200).json({ success: true, message: "Unit deleted successfully", data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};