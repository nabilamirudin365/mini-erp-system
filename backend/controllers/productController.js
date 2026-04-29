import * as productService from "../services/productService.js";
import { successResponse } from "../utils/response.js";
import { AppError } from "../middleware/errorHandler.js";

export const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const products = await productService.getAllProducts(page, limit);
    return successResponse(res, 200, "Berhasil mengambil produk", products);
  } catch (error) {
    return next(new AppError("Gagal mengambil data produk", 500));
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createNewProduct(req.body);
    return successResponse(res, 201, "Product dibuat", product);
  } catch (error) {
    return next(new AppError(error.message || "Gagal membuat produk", 400));
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.updateProduct(id, req.body);
    return successResponse(res, 200, "Produk berhasil diupdate", product);
  } catch (error) {
    if (error.code === 'P2025') {
       return next(new AppError("Produk tidak ditemukan", 404));
    }
    return next(new AppError(error.message || "Gagal mengupdate produk", 400));
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    return successResponse(res, 200, "Produk berhasil dihapus");
  } catch (error) {
    if (error.code === 'P2025') {
       return next(new AppError("Produk tidak ditemukan", 404));
    }
    if (error.code === 'P2003') {
       return next(new AppError("Produk tidak dapat dihapus karena sudah memiliki riwayat transaksi", 400));
    }
    return next(new AppError(error.message || "Gagal menghapus produk", 400));
  }
};