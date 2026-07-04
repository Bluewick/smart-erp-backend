import { getCompanyByIdDb } from "../models/company.model.js";
import { createLedgerDb, editLedgerDb, getAllLedgersDb, getSingleLedgerDb, removeLedgerDb } from "../models/ledger.model.js";

export const createLedgerService = async (
    companyId, 
    userId, 
    payload
) => {
    if (!payload.name || !payload.under) {
        throw new Error("Ledger Name and Group category selection are required parameters.");
    }

    
    const company = await getCompanyByIdDb(companyId);
    
    if (!company || company.user_id !== userId) {
        throw new Error("Unauthorized access: You do not own this company workspace.");
    }

    const parsedBalance = payload.openingBalance ? parseFloat(payload.openingBalance) : 0.00;

    const ledger = await createLedgerDb(
        companyId,
        userId,
        payload.name,
        payload.alias,
        payload.under,
        payload.maintainBalancesBillByBill,
        payload.defaultCreditPeriod,
        payload.checkCreditDays,
        payload.mailingName,
        payload.mailingAddress,
        payload.state,
        payload.country,
        payload.pincode,
        payload.provideBankDetails,
        payload.panItNo,
        payload.registrationType,
        payload.gstinUin,
        payload.setAlterGstDetails,
        parsedBalance
    );

    if (!ledger) {
        throw new Error("Internal Server Error while initializing ledger record.");
    }

    return ledger;
};


export const editLedgerService = async (
    companyId,
    ledgerId,
    userId,
    payload
) => {
    if (!payload.name || !payload.under) {
        throw new Error("Ledger Name and Group category selection are required parameters.");
    }

    const company = await getCompanyByIdDb(companyId);
    if (!company || company.user_id !== userId) {
        throw new Error("Unauthorized access: You do not own this company workspace.");
    }

    const parsedBalance = payload.openingBalance ? parseFloat(payload.openingBalance) : 0.00;

    const ledger = await editLedgerDb(
        companyId,
        ledgerId,
        payload.name,
        payload.alias,
        payload.under,
        payload.maintainBalancesBillByBill,
        payload.defaultCreditPeriod,
        payload.checkCreditDays,
        payload.mailingName,
        payload.mailingAddress,
        payload.state,
        payload.country,
        payload.pincode,
        payload.provideBankDetails,
        payload.panItNo,
        payload.registrationType,
        payload.gstinUin,
        payload.setAlterGstDetails,
        parsedBalance
    );

    if (!ledger) {
        throw new Error("Ledger not found or does not belong to this company.");
    }

    return ledger;
};

export const removeLedgerService = async (companyId, ledgerId, userId) => {
    const company = await getCompanyByIdDb(companyId);
    if (!company || company.user_id !== userId) {
        throw new Error("Unauthorized access: You do not own this company workspace.");
    }

    const ledger = await removeLedgerDb(companyId, ledgerId);

    if (!ledger) {
        throw new Error("Ledger not found or already deleted from this company workspace.");
    }

    return ledger;
};


export const getAllLedgersService = async (companyId, userId) => {
    // SECURITY CHECK: Verify user owns the company workspace
    const company = await getCompanyByIdDb(companyId);
    if (!company || company.user_id !== userId) {
        throw new Error("Unauthorized access: You do not own this company workspace.");
    }

    const ledgers = await getAllLedgersDb(companyId);
    return ledgers;
};

export const getSingleLedgerService = async (companyId, ledgerId, userId) => {
    // SECURITY CHECK: Verify the user owns the company workspace
    const company = await getCompanyByIdDb(companyId);
    if (!company || company.user_id !== userId) {
        throw new Error("Unauthorized access: You do not own this company workspace.");
    }

    const ledger = await getSingleLedgerDb(companyId, ledgerId);
    
    if (!ledger) {
        throw new Error("Ledger record not found.");
    }

    return ledger;
};