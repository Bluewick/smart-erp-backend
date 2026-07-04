import pool from "../config/db.js";


export const createStockDb = async (companyId, userId, data) => {
    const query = `
        INSERT INTO stock_items (
            company_id, user_id, item_name, alias, under_group, units, gst_applicability,
            hsn_sac_details, hsn_sac, description, gst_rate_details, taxability_type,
            gst_rate, type_of_supply, rate_of_duty, opening_qty, opening_rate, opening_value
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        RETURNING id, item_name, opening_qty, opening_value;
    `;
    const values = [
        companyId, userId, data.name, data.alias, data.under, data.units, data.gstApplicability,
        data.hsnSacDetails, data.hsnSac, data.description, data.gstRateDetails, data.taxabilityType,
        parseFloat(data.gstRate || 0), data.typeOfSupply, data.rateOfDuty,
        parseFloat(data.openingQuantity || 0), parseFloat(data.openingRate || 0), parseFloat(data.openingValue || 0)
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const editStockDb = async (companyId, itemId, data) => {
    const query = `
        UPDATE stock_items SET
            item_name = $3, alias = $4, under_group = $5, units = $6, gst_applicability = $7,
            hsn_sac_details = $8, hsn_sac = $9, description = $10, gst_rate_details = $11,
            taxability_type = $12, gst_rate = $13, type_of_supply = $14, rate_of_duty = $15,
            opening_qty = $16, opening_rate = $17, opening_value = $18, updated_at = NOW()
        WHERE id = $1 AND company_id = $2
        RETURNING id, item_name, opening_qty, opening_value;
    `;
    const values = [
        itemId, companyId, data.name, data.alias, data.under, data.units, data.gstApplicability,
        data.hsnSacDetails, data.hsnSac, data.description, data.gstRateDetails, data.taxabilityType,
        parseFloat(data.gstRate || 0), data.typeOfSupply, data.rateOfDuty,
        parseFloat(data.openingQuantity || 0), parseFloat(data.openingRate || 0), parseFloat(data.openingValue || 0)
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const getAllStockDb = async (companyId) => {
    const query = `SELECT * FROM stock_items WHERE company_id = $1 ORDER BY item_name ASC;`;
    const result = await pool.query(query, [companyId]);
    return result.rows;
};

export const getSingleStockDb = async (companyId, itemId) => {
    const query = `SELECT * FROM stock_items WHERE id = $1 AND company_id = $2;`;
    const result = await pool.query(query, [itemId, companyId]);
    return result.rows[0];
};

export const removeStockDb = async (companyId, itemId) => {
    const query = `DELETE FROM stock_items WHERE id = $1 AND company_id = $2 RETURNING id, item_name;`;
    const result = await pool.query(query, [itemId, companyId]);
    return result.rows[0];
};

export const getStockItemTransactionsDb = async (companyId, itemId) => {
    const query = `
        SELECT vi.quantity, vi.rate, vi.amount, v.voucher_type, v.voucher_date, v.id as voucher_id
        FROM voucher_items vi
        JOIN vouchers v ON vi.voucher_id = v.id
        WHERE vi.stock_item_id = $1 AND v.company_id = $2
        ORDER BY v.voucher_date ASC, v.id ASC;
    `;
    const result = await pool.query(query, [itemId, companyId]);
    return result.rows;
};