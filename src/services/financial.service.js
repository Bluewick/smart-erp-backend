import { getCompanyByIdDb } from "../models/company.model.js";
import * as financialModel from "../models/financial.model.js";

export const calculateProfitAndLoss = async (companyId, userId) => {
    // 1. Verify workspace authorization context
    const company = await getCompanyByIdDb(companyId);
    if (!company || company.user_id !== userId) {
        throw new Error("Unauthorized company workspace access.");
    }

    // 2. Fetch aggregated financial segments from DB calculations
    const purchaseTotal = await financialModel.getTotalVoucherAmountByType(companyId, 'PURCHASE');
    const salesTotal = await financialModel.getTotalVoucherAmountByType(companyId, 'SALES');
    
    // In basic setups, Tally calculates the total asset value directly out of the stock inventory pool
    const closingStockValue = await financialModel.getClosingStockValuation(companyId);

    return {
        openingStock: 0.00, // Hardcoded for initial version unless tracking from a previous financial year
        purchaseAccounts: parseFloat(purchaseTotal || 0),
        salesAccounts: parseFloat(salesTotal || 0),
        closingStock: parseFloat(closingStockValue || 0)
    };
};