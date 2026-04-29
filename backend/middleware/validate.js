import { errorResponse } from "../utils/response.js";

export const validate = (schema) => (req, res, next) => {
  try {
    // Validasi data (Zod melempar error jika gagal)
    schema.parse(req.body);
    next();
  } catch (err) {
    // Kumpulkan semua pesan error dari Zod
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message
    }));
    
    return errorResponse(res, 400, "Validasi input gagal", formattedErrors);
  }
};
