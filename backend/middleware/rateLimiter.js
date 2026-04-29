import rateLimit from "express-rate-limit";
import { errorResponse } from "../utils/response.js";

export const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 menit
  max: 5, // limit 5 request per windowMs per IP
  handler: (req, res, next, options) => {
    return errorResponse(res, options.statusCode, "Terlalu banyak percobaan login. Silakan coba lagi setelah 1 menit.");
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});
