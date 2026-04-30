import * as authService from "../services/authService.js";
import { successResponse } from "../utils/response.js";
import { AppError } from "../middleware/errorHandler.js";
import jwt from "jsonwebtoken";

const isProd = process.env.NODE_ENV === "production";

export const register = async (req, res, next) => {
  try {
    const { username, email, password, role_id } = req.body;
    await authService.registerUser(username, email, password, role_id);
    return successResponse(res, 201, "Register berhasil");
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);

    // Otomatis menyesuaikan konfigurasi Cookie berdasarkan environment
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: isProd,                    // true di HTTPS (Prod), false di HTTP (Dev)
      sameSite: isProd ? "none" : "lax", // "none" untuk cross-domain (Prod), "lax" untuk localhost (Dev)
      maxAge: 60 * 60 * 1000
    });

    return successResponse(res, 200, "Login berhasil", { role: result.user.role?.name || 'user' });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const logout = async (req, res) => {
  try {
    // Ambil user ID dari cookie JWT untuk menghapus session_token di DB
    const token = req.cookies?.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      await authService.logoutUser(decoded.id);
    }
  } catch {
    // Jika token sudah expired atau tidak valid, tidak masalah, lanjutkan logout
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });
  return successResponse(res, 200, "Berhasil logout");
};