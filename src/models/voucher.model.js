import pool from "../config/db.js";

export const saveVoucherWithStockUpdate = async (companyId, userId, actionType, data) => {
    const client = await pool.connect();
    
    try {
        await client.query("BEGIN");

        // 1. Insert Voucher Header with dynamic actionType ('PURCHASE' or 'SALES')
        const voucherQuery = `
            INSERT INTO vouchers (
                company_id, user_id, voucher_type, supplier_invoice_no, 
                voucher_date, party_ledger_id, account_ledger_id, narration, total_amount
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id;
        `;
        const voucherValues = [
            companyId, userId, actionType, data.supplierInvoiceNo, data.date,
            data.partyId, data.accountLedgerId, data.narration, parseFloat(data.totalAmount || 0)
        ];
        const voucherResult = await client.query(voucherQuery, voucherValues);
        const voucherId = voucherResult.rows[0].id;

        // 2. Process Line Items
        for (const item of data.items) {
            const itemQuery = `
                INSERT INTO voucher_items (voucher_id, stock_item_id, quantity, rate, amount)
                VALUES ($1, $2, $3, $4, $5);
            `;
            const itemValues = [
                voucherId, item.stockItemId, parseFloat(item.quantity), 
                parseFloat(item.rate), parseFloat(item.amount)
            ];
            await client.query(itemQuery, itemValues);

            // 3. Dynamic Stock Update Calculation (Weighted Average Cost Method)
            let updateStockQuery;
            let queryParams;

            if (actionType === "PURCHASE") {
                updateStockQuery = `
                    UPDATE stock_items 
                    SET opening_qty = opening_qty + $1,
                        opening_value = opening_value + $2,
                        opening_rate = CASE 
                            WHEN (opening_qty + $1) <> 0 THEN (opening_value + $2) / (opening_qty + $1)
                            ELSE 0 
                        END,
                        updated_at = NOW()
                    WHERE id = $3 AND company_id = $4;
                `;
                queryParams = [parseFloat(item.quantity), parseFloat(item.amount), item.stockItemId, companyId];
            } else {
                // SALES - decreases quantity and value based on average cost rate, keeps rate unchanged
                updateStockQuery = `
                    UPDATE stock_items 
                    SET opening_qty = opening_qty - $1,
                        opening_value = CASE 
                            WHEN (opening_qty - $1) > 0 THEN (opening_qty - $1) * opening_rate
                            ELSE 0 
                        END,
                        updated_at = NOW()
                    WHERE id = $2 AND company_id = $3;
                `;
                queryParams = [parseFloat(item.quantity), item.stockItemId, companyId];
            }
            await client.query(updateStockQuery, queryParams);
        }

        await client.query("COMMIT");
        return { voucherId };

    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Voucher batch transaction aborted: ", error);
        throw error;
    } finally {
        client.release();
    }
};