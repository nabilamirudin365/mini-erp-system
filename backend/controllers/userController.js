import * as userService from "../services/userService.js";
import { successResponse } from "../utils/response.js";
import { AppError } from "../middleware/errorHandler.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return successResponse(res, 200, "Berhasil mengambil data users", users);
  } catch (error) {
    return next(new AppError("Gagal mengambil data users", 500));
  }
};

export const getUsersById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return successResponse(res, 200, "Berhasil mengambil data user", user);
  } catch (error) {
    if (error.message === "User tidak ditemukan") {
      return next(new AppError(error.message, 404));
    }
    if (error.message === "ID tidak valid") {
      return next(new AppError(error.message, 400));
    }
    return next(new AppError("Gagal mengambil data user", 500));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUser(id, req.body);
    return successResponse(res, 200, "Berhasil update user", user);
  } catch (error) {
    if (error.code === 'P2025') {
       return next(new AppError("User tidak ditemukan", 404));
    }
    return next(new AppError(error.message || "Gagal update user", 400));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    return successResponse(res, 200, "User berhasil dihapus");
  } catch (error) {
    if (error.code === 'P2025') {
       return next(new AppError("User tidak ditemukan", 404));
    }
    return next(new AppError(error.message || "Gagal menghapus user", 400));
  }
};