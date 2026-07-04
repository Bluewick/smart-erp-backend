import * as stockDb from "../models/stockItem.model.js";
import { getCompanyByIdDb } from "../models/company.model.js";

const verifyCompanyOwnership = async (companyId, userId) => {
    const company = await getCompanyByIdDb(companyId);
    if (!company || company.user_id !== userId) {
        throw new Error("Unauthorized access: You do not own this company workspace.");
    }
};

export const createStockService = async (companyId, userId, payload) => {
    if (!payload.name) throw new Error("Stock Item Name is required.");
    await verifyCompanyOwnership(companyId, userId);
    return await stockDb.createStockDb(companyId, userId, payload);
};

export const editStockService = async (companyId, itemId, userId, payload) => {
    if (!payload.name) throw new Error("Stock Item Name is required.");
    await verifyCompanyOwnership(companyId, userId);
    const item = await stockDb.editStockDb(companyId, itemId, payload);
    if (!item) throw new Error("Stock item not found under this workspace.");
    return item;
};

export const getAllStockService = async (companyId, userId) => {
    await verifyCompanyOwnership(companyId, userId);
    return await stockDb.getAllStockDb(companyId);
};

export const getSingleStockService = async (companyId, itemId, userId) => {
    await verifyCompanyOwnership(companyId, userId);
    const item = await stockDb.getSingleStockDb(companyId, itemId);
    if (!item) throw new Error("Stock item not found.");
    return item;
};

export const removeStockService = async (companyId, itemId, userId) => {
    await verifyCompanyOwnership(companyId, userId);
    const item = await stockDb.removeStockDb(companyId, itemId);
    if (!item) throw new Error("Stock item not found or already deleted.");
    return item;
};

export const getStockItemMonthlySummaryService = async (companyId, itemId, userId) => {
    await verifyCompanyOwnership(companyId, userId);
    
    const item = await stockDb.getSingleStockDb(companyId, itemId);
    if (!item) throw new Error("Stock item not found.");

    const transactions = await stockDb.getStockItemTransactionsDb(companyId, itemId);

    // 1. Trace backwards to reconstruct the initial opening balance
    let curQty = parseFloat(item.opening_qty) || 0;
    let curVal = parseFloat(item.opening_value) || 0;
    let curRate = parseFloat(item.opening_rate) || 0;

    const txsDesc = [...transactions].reverse();
    for (const tx of txsDesc) {
        const txQty = parseFloat(tx.quantity);
        const txAmt = parseFloat(tx.amount);
        if (tx.voucher_type === "SALES") {
            curQty = curQty + txQty;
            curVal = curQty * curRate;
        } else {
            // PURCHASE
            curQty = curQty - txQty;
            curVal = curVal - txAmt;
            curRate = curQty > 0 ? curVal / curQty : 0;
        }
    }

    const initialQty = curQty;
    const initialVal = curVal;
    const initialRate = curRate;

    // 2. Trace forwards to calculate monthly figures (Indian Financial Year: Apr-Mar)
    const monthsList = [
        { name: "April", num: 3 },
        { name: "May", num: 4 },
        { name: "June", num: 5 },
        { name: "July", num: 6 },
        { name: "August", num: 7 },
        { name: "September", num: 8 },
        { name: "October", num: 9 },
        { name: "November", num: 10 },
        { name: "December", num: 11 },
        { name: "January", num: 0 },
        { name: "February", num: 1 },
        { name: "March", num: 2 }
    ];

    let runningQty = initialQty;
    let runningVal = initialVal;
    let runningRate = initialRate;

    const monthlySummary = [];

    for (const month of monthsList) {
        let inwardsQty = 0;
        let inwardsVal = 0;
        let outwardsQty = 0;
        let outwardsVal = 0;

        const monthTxs = transactions.filter(tx => {
            const d = new Date(tx.voucher_date);
            return d.getMonth() === month.num;
        });

        for (const tx of monthTxs) {
            const txQty = parseFloat(tx.quantity);
            const txAmt = parseFloat(tx.amount);

            if (tx.voucher_type === "PURCHASE") {
                inwardsQty += txQty;
                inwardsVal += txAmt;
                runningQty += txQty;
                runningVal += txAmt;
                runningRate = runningQty > 0 ? runningVal / runningQty : 0;
            } else {
                // SALES
                outwardsQty += txQty;
                outwardsVal += txAmt;
                runningQty -= txQty;
                runningVal = runningQty > 0 ? runningQty * runningRate : 0;
            }
        }

        monthlySummary.push({
            month: month.name,
            inwards_qty: inwardsQty,
            inwards_value: inwardsVal,
            outwards_qty: outwardsQty,
            outwards_value: outwardsVal,
            closing_qty: runningQty,
            closing_value: runningVal,
            closing_rate: runningRate
        });
    }

    return {
        item_name: item.item_name,
        units: item.units,
        initial_qty: initialQty,
        initial_val: initialVal,
        initial_rate: initialRate,
        monthly_summary: monthlySummary
    };
};