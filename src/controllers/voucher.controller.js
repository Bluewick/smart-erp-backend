import * as voucherService from "../services/voucher.service.js";

export const createPurchaseVoucher = async (req, res) => {
    try {
        const { companyId } = req.params;
        const result = await voucherService.postPurchaseVoucher(companyId, req.user.id, req.body);
        
        return res.status(201).json({
            success: true,
            message: "Purchase Voucher recorded and stock updated successfully.",
            data: result
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const createSalesVoucher = async (req, res) => {
    try {
        const { companyId } = req.params;
        const result = await voucherService.postVoucherService(companyId, req.user.id, "SALES", req.body);
        return res.status(201).json({ success: true, message: "Sales Voucher recorded successfully.", data: result });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};