import { getCompanyByIdDb } from "../models/company.model.js";
import * as voucherModel from "../models/voucher.model.js";

export const postVoucherService = async (companyId, userId, actionType, payload) => {
    const company = await getCompanyByIdDb(companyId);
    if (!company || company.user_id !== userId) {
        throw new Error("Unauthorized workspace context.");
    }

    if (!payload.partyId || !payload.accountLedgerId || !payload.items || payload.items.length === 0) {
        throw new Error("Missing structural payload items or account parameters.");
    }

    return await voucherModel.saveVoucherWithStockUpdate(companyId, userId, actionType, payload);
};