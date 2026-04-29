import * as transactionService from "../services/transactionService.js";
import { successResponse } from "../utils/response.js";
import { AppError } from "../middleware/errorHandler.js";

export const createTransaction = async (req, res, next) => {
  try {
    const { items } = req.body; 

    if (!items || !Array.isArray(items) || items.length === 0) {
      return next(new AppError("Keranjang belanja kosong", 400));
    }

    const result = await transactionService.createNewTransaction(req.user.id, items);

    return successResponse(res, 201, "Transaksi berhasil", { total: result.total });

  } catch (err) {
    if (err.message.includes("Stok produk tidak mencukupi")) {
      return next(new AppError(err.message, 400));
    }
    return next(new AppError("Gagal transaksi: " + err.message, 500));
  }
};

export const getTransactionHistory = async (req, res, next) => {
  try {
    const userRole = req.user?.role;
    const userId = req.user?.id;

    const targetUserId = userRole === 'admin' ? null : userId;

    const history = await transactionService.getAllTransactions(targetUserId);
    return successResponse(res, 200, "Berhasil mengambil riwayat transaksi", history);
  } catch (error) {
    return next(new AppError("Gagal mengambil riwayat transaksi", 500));
  }
};