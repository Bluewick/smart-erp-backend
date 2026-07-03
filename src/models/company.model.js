import pool from "../config/db.js";


export const getCompanyByUserId = async (userId) => {
    const query = `
        SELECT *
        FROM companies
        WHERE user_id = $1;
    `;

    const values = [userId];

    const result = await pool.query(query, values);

    return result.rows;
}

export const getCompanyByIdDb = async (id) => {
  const query = `SELECT * FROM companies WHERE id = $1`;
  const values = [id];

  try {
    const result = await pool.query(query, values);
    

    return result.rows[0] || null; 
  } catch (error) {
    console.error(`Database error in getCompanyByIdDb for ID ${id}:`, error);
    throw error; 
  }
};

export const createCompanyDb = async ( userId,
  companyName,
  mailingName,
  addressLine1,
  addressLine2,
  state,
  country,
  pincode,
  telephone,
  mobile,
  fax,
  email,
  website,
  currencySymbol,
  currencyName,
  financialYearFrom,
  booksBeginningFrom,
) => {
  const query = `
    INSERT INTO companies (user_id, company_name, mailing_name, address_line_1, address_line_2, state, country, 
    pincode, telephone, mobile, fax, email, website, currency_symbol, currency_name, financial_year_from,
    books_beginning_from )

    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 ,$10, $11, $12, $13, $14, $15, $16, $17)
    RETURNING id, company_name, created_at
    `; 

  const values = [
    userId,
    companyName,
    mailingName,
    addressLine1,
    addressLine2,
    state,
    country,
    pincode,
    telephone,
    mobile,
    fax,
    email,
    website,
    currencySymbol,
    currencyName,
    financialYearFrom,
    booksBeginningFrom,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const editCompanyDb = async (
  companyId,
  userId,
  companyName,
  mailingName,
  addressLine1,
  addressLine2,
  state,
  country,
  pincode,
  telephone,
  mobile,
  fax,
  email,
  website,
  currencySymbol,
  currencyName,
  financialYearFrom,
  booksBeginningFrom,
) => {
  const query = `
    UPDATE companies 
    SET 
      company_name = $3, 
      mailing_name = $4, 
      address_line_1 = $5, 
      address_line_2 = $6, 
      state = $7, 
      country = $8, 
      pincode = $9, 
      telephone = $10, 
      mobile = $11, 
      fax = $12, 
      email = $13, 
      website = $14, 
      currency_symbol = $15, 
      currency_name = $16, 
      financial_year_from = $17,
      books_beginning_from = $18,
      updated_at = NOW()
    WHERE id = $1 AND user_id = $2
    RETURNING id, company_name, updated_at
  `; 

  const values = [
    companyId,
    userId,
    companyName,
    mailingName,
    addressLine1,
    addressLine2,
    state,
    country,
    pincode,
    telephone,
    mobile,
    fax,
    email,
    website,
    currencySymbol,
    currencyName,
    financialYearFrom,
    booksBeginningFrom,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const removeCompanyDb = async (companyId, userId) => {
  const query = `
    DELETE FROM companies 
    WHERE id = $1 AND user_id = $2
    RETURNING id, company_name
  `; 

  const values = [
    companyId,
    userId 
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};