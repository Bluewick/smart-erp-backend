import * as financialService from "../services/financial.service.js";

export const getProfitAndLossSummary = async (req, res) => {
    try {
        const { companyId } = req.params;
        const data = await financialService.calculateProfitAndLoss(companyId, req.user.id);
        
        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message || "Internal server error fetching financial reporting data." 
        });
    }
};