import { getCompanyByIdDb } from "../models/company.model.js"; 
import * as unitModel from "../models/unit.model.js";

const verifyCompanyOwnership = async (companyId, userId) => {
    const company = await getCompanyByIdDb(companyId);
    if (!company || company.user_id !== userId) {
        throw new Error("Unauthorized access: You do not own this company workspace.");
    }
};

export const createUnitService = async (companyId, userId, camelCasePayload) => {
    if (!camelCasePayload.symbol || !camelCasePayload.formalName) {
        throw new Error("Symbol and Formal Name are required variables.");
    }
    await verifyCompanyOwnership(companyId, userId);
    return await unitModel.createUnitDb(companyId, userId, camelCasePayload);
};

export const editUnitService = async (companyId, unitId, userId, camelCasePayload) => {
    if (!camelCasePayload.symbol || !camelCasePayload.formalName) {
        throw new Error("Symbol and Formal Name are required variables.");
    }
    await verifyCompanyOwnership(companyId, userId);
    const unit = await unitModel.editUnitDb(companyId, unitId, camelCasePayload);
    if (!unit) throw new Error("Unit configuration not found under this workspace.");
    return unit;
};

export const getAllUnitsService = async (companyId, userId) => {
    await verifyCompanyOwnership(companyId, userId);
    return await unitModel.getAllUnitsDb(companyId);
};

export const getSingleUnitService = async (companyId, unitId, userId) => {
    await verifyCompanyOwnership(companyId, userId);
    const unit = await unitModel.getSingleUnitDb(companyId, unitId);
    if (!unit) throw new Error("Unit profile record not found.");
    return unit;
};

export const removeUnitService = async (companyId, unitId, userId) => {
    await verifyCompanyOwnership(companyId, userId);
    const unit = await unitModel.removeUnitDb(companyId, unitId);
    if (!unit) throw new Error("Unit profile not found or already deleted.");
    return unit;
};