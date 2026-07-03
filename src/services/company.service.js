import { createCompanyDb, editCompanyDb, removeCompanyDb } from "../models/company.model.js"


export const createCompanyService = async ({
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
  }, userId) => {

    const company = await createCompanyDb(userId, companyName,
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
    booksBeginningFrom)

    if (!company) {
        throw new Error("Internal Server Error.");
    }

    return {
        id: company.id,
        company_name : company.company_name,
        created_at : company.created_at
    }
  }

  export const editCompanyService = async (
  companyId, 
  {
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
  }, 
  userId
) => {
    const company = await editCompanyDb(
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
        booksBeginningFrom
    );

    if (!company) {
        throw new Error("Company not found or unauthorized to update.");
    }

    return {
        id: company.id,
        company_name: company.company_name,
        updated_at: company.updated_at
    };
};

export const removeCompanyService = async (companyId, userId) => {
    const company = await removeCompanyDb(companyId, userId);

    if (!company) {
        throw new Error("Company not found or unauthorized to delete.");
    }

    return {
        id: company.id,
        company_name: company.company_name
    };
};