import * as authService from "../services/authService.js";
import { successResponse } from "../utils/response.js";
import { AppError } from "../middleware/errorHandler.js";

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

    /* === INI DIPAKAI KETIKA DEVELOPMENT === */
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false, // Karena localhost biasanya HTTP
      sameSite: "lax", // Mengizinkan cookie untuk localhost
      maxAge: 60 * 60 * 1000
    });

    /* === INI DIPAKAI KETIKA PRODUCTION === */
    // res.cookie("token", result.token, {
    //   httpOnly: true,
    //   secure: true, // Wajib true untuk HTTPS (Vercel/Render)
    //   sameSite: "none", // Wajib "none" agar bisa beda domain (Cross-Site)
    //   maxAge: 60 * 60 * 1000
    // });

    return successResponse(res, 200, "Login berhasil", { role: result.user.role?.name || 'user' });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return successResponse(res, 200, "Berhasil logout");
};