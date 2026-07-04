import  pool  from "../config/db.js";

/**
 * Grabs the sum totals of all final accepted invoice entries 
 * filtered by voucher type classification ('PURCHASE' or 'SALES')
 */
export const getTotalVoucherAmountByType = async (companyId, voucherType) => {
    const query = `
        SELECT COALESCE(SUM(total_amount), 0) as total
        FROM vouchers
        WHERE company_id = $1 AND voucher_type = $2;
    `;
    const result = await pool.query(query, [companyId, voucherType]);
    return result.rows[0].total;
};

/**
 * Evaluates the current real-time financial balance value of all stock inventory line assets
 */
export const getClosingStockValuation = async (companyId) => {
    const query = `
        SELECT COALESCE(SUM(opening_value), 0) as inventory_value
        FROM stock_items
        WHERE company_id = $1;
    `;
    const result = await pool.query(query, [companyId]);
    return result.rows[0].inventory_value;
};