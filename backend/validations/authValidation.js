import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid").min(1, "Email wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export const registerSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter").max(20, "Username maksimal 20 karakter").optional().nullable(),
  email: z.string().email("Format email tidak valid").min(1, "Email wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role_id: z.number().int().positive().optional()
});
