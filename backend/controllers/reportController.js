import * as reportService from "../services/reportService.js";
import { successResponse } from "../utils/response.js";
import { AppError } from "../middleware/errorHandler.js";

export const getSalesTrend = async (req, res, next) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const data = await reportService.getSalesTrend(days);
    return successResponse(res, 200, "Berhasil mengambil data tren penjualan", data);
  } catch (error) {
    return next(new AppError("Gagal mengambil data tren penjualan", 500));
  }
};

export const getTopProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const data = await reportService.getTopProducts(limit);
    return successResponse(res, 200, "Berhasil mengambil data produk terlaris", data);
  } catch (error) {
    return next(new AppError("Gagal mengambil data produk terlaris", 500));
  }
};
