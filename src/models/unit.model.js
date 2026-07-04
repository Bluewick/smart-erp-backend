import pool from "../config/db.js";

export const createUnitDb = async (companyId, userId, data) => {
    const query = `
        INSERT INTO units (
            company_id, user_id, unit_type, symbol, formal_name, uqc, decimal_places
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, unit_type, symbol, formal_name, uqc, decimal_places;
    `;
    const values = [
        companyId, 
        userId, 
        data.type || 'Simple', 
        data.symbol, 
        data.formalName, 
        data.uqc || 'NOT APPLICABLE', 
        parseInt(data.decimalPlaces || 0)
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const editUnitDb = async (companyId, unitId, data) => {
    const query = `
        UPDATE units SET
            unit_type = $3, symbol = $4, formal_name = $5, uqc = $6, decimal_places = $7, updated_at = NOW()
        WHERE id = $1 AND company_id = $2
        RETURNING id, unit_type, symbol, formal_name, uqc, decimal_places;
    `;
    const values = [
        unitId, 
        companyId, 
        data.type || 'Simple', 
        data.symbol, 
        data.formalName, 
        data.uqc || 'NOT APPLICABLE', 
        parseInt(data.decimalPlaces || 0)
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const getAllUnitsDb = async (companyId) => {
    const query = `SELECT * FROM units WHERE company_id = $1 ORDER BY symbol ASC;`;
    const result = await pool.query(query, [companyId]);
    return result.rows;
};

export const getSingleUnitDb = async (companyId, unitId) => {
    const query = `SELECT * FROM units WHERE id = $1 AND company_id = $2;`;
    const result = await pool.query(query, [unitId, companyId]);
    return result.rows[0];
};

export const removeUnitDb = async (companyId, unitId) => {
    const query = `DELETE FROM units WHERE id = $1 AND company_id = $2 RETURNING id, symbol;`;
    const result = await pool.query(query, [unitId, companyId]);
    return result.rows[0];
};