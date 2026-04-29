import { errorResponse } from "../utils/response.js";

// Global error handler middleware
export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error caught by Global Handler:");
  console.error(err);

  // Jika error adalah string kustom kita
  if (err.message && err.statusCode) {
    return errorResponse(res, err.statusCode, err.message);
  }

  // Jika error spesifik dari JWT
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return errorResponse(res, 401, "Akses ditolak: Token tidak valid atau kadaluarsa");
  }

  // Default server error
  return errorResponse(res, 500, "Terjadi kesalahan pada server", process.env.NODE_ENV === 'development' ? err.message : null);
};

// Custom Error Class agar bisa melempar error dengan status code
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
