import e from "express";
import { getCompanyByIdDb, getCompanyByUserId } from "../models/company.model.js";
import { createCompanyService, editCompanyService, removeCompanyService } from "../services/company.service.js";

export const createCompany = async (req, res) => {

    try {

        const result = await createCompanyService(req.body, req?.user?.id);

        return res.status(201).json({
            success: true,
            message: 'company created successfully',
            data: result
        });
        
    } catch (error) {

        return res.status(401).json({
            success: false,
            message: error.message
        });

    }

};

export const getCompanies = async (req,res) => {
    try {
        
        const result = await getCompanyByUserId(req?.user?.id);

        return res.status(200).json({
            success: true,
            message: 'Companies fetched successfully!',
            data: result
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
}


export const getCompanyById = async (req,res) => {
    try {
        
        const id = req.params?.id
        const result = await getCompanyByIdDb(id);

        return res.status(200).json({
            success: true,
            message: 'Company fetched successfully!',
            data: result
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
}


export const editCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const userId = req?.user?.id; 

        const result = await editCompanyService(companyId, req.body, userId);

        return res.status(200).json({
            success: true,
            message: 'Company updated successfully',
            data: result
        });
        
    } catch (error) {
       
        const statusCode = error.message.includes("not found") ? 404 : 400;
        
        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export const removeCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const userId = req?.user?.id; 

        const result = await removeCompanyService(companyId, userId);

        return res.status(200).json({
            success: true,
            message: 'Company deleted successfully',
            data: result
        });
        
    } catch (error) {
        const statusCode = error.message.includes("not found") ? 404 : 400;
        
        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};
