import pool from "../config/db.js";

export const createLedgerDb = async (
    companyId,
    userId,
    name,
    alias,
    under,
    maintainBalancesBillByBill,
    defaultCreditPeriod,
    checkCreditDays,
    mailingName,
    mailingAddress,
    state,
    country,
    pincode,
    provideBankDetails,
    panItNo,
    registrationType,
    gstinUin,
    setAlterGstDetails,
    openingBalance
) => {
    const query = `
        INSERT INTO ledgers (
            company_id, user_id, ledger_name, alias, under_group, maintain_bill_by_bill,
            default_credit_period, check_credit_days, mailing_name, mailing_address,
            state, country, pincode, provide_bank_details, pan_it_no, registration_type,
            gstin_uin, set_alter_gst, opening_balance
        )
        VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
        )
        RETURNING id, ledger_name, under_group, opening_balance, created_at;
    `;

    const values = [
        companyId,
        userId,
        name,
        alias,
        under,
        maintainBalancesBillByBill,
        defaultCreditPeriod,
        checkCreditDays,
        mailingName,
        mailingAddress,
        state,
        country,
        pincode,
        provideBankDetails,
        panItNo,
        registrationType,
        gstinUin,
        setAlterGstDetails,
        openingBalance
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};

export const editLedgerDb = async (
    companyId,
    ledgerId,
    name,
    alias,
    under,
    maintainBalancesBillByBill,
    defaultCreditPeriod,
    checkCreditDays,
    mailingName,
    mailingAddress,
    state,
    country,
    pincode,
    provideBankDetails,
    panItNo,
    registrationType,
    gstinUin,
    setAlterGstDetails,
    openingBalance
) => {
    const query = `
        UPDATE ledgers
        SET
            ledger_name = $3,
            alias = $4,
            under_group = $5,
            maintain_bill_by_bill = $6,
            default_credit_period = $7,
            check_credit_days = $8,
            mailing_name = $9,
            mailing_address = $10,
            state = $11,
            country = $12,
            pincode = $13,
            provide_bank_details = $14,
            pan_it_no = $15,
            registration_type = $16,
            gstin_uin = $17,
            set_alter_gst = $18,
            opening_balance = $19,
            updated_at = NOW()
        WHERE id = $1 AND company_id = $2
        RETURNING id, ledger_name, under_group, opening_balance, updated_at;
    `;

    const values = [
        ledgerId,
        companyId,
        name,
        alias,
        under,
        maintainBalancesBillByBill,
        defaultCreditPeriod,
        checkCreditDays,
        mailingName,
        mailingAddress,
        state,
        country,
        pincode,
        provideBankDetails,
        panItNo,
        registrationType,
        gstinUin,
        setAlterGstDetails,
        openingBalance
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
};

export const removeLedgerDb = async (companyId, ledgerId) => {
    const query = `
        DELETE FROM ledgers 
        WHERE id = $1 AND company_id = $2
        RETURNING id, ledger_name, under_group;
    `; 

    const values = [
        ledgerId, // $1
        companyId // $2
    ];

    const result = await pool.query(query, values);
    return result.rows[0]; 
};

export const getAllLedgersDb = async (companyId) => {
    // Sorting alphabetically by ledger_name makes it clean for selection panels
    const query = `
        SELECT 
            id, 
            ledger_name, 
            under_group, 
            opening_balance, 
            created_at 
        FROM ledgers 
        WHERE company_id = $1
        ORDER BY ledger_name ASC;
    `; 

    const values = [companyId];

    const result = await pool.query(query, values);
    return result.rows; 
};

export const getSingleLedgerDb = async (companyId, ledgerId) => {
    const query = `
        SELECT * FROM ledgers 
        WHERE id = $1 AND company_id = $2;
    `; 

    const values = [ledgerId, companyId];
    const result = await pool.query(query, values);
    return result.rows[0]; 
};