import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token; // BACA DARI COOKIE BUKAN HEADER

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Validasi apakah sesi ini masih yang aktif di database
    const user = await prisma.users.findUnique({
      where: { id: decoded.id },
      select: { session_token: true },
    });

    // Jika session_token di DB tidak cocok dengan yang ada di JWT,
    // berarti akun ini sudah login di perangkat lain (sesi baru menimpa yang lama)
    if (!user || user.session_token !== decoded.sessionToken) {
      return res.status(401).json({
        message: "Sesi Anda telah berakhir karena akun ini login di perangkat lain.",
        code: "SESSION_REPLACED",
      });
    }

    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};