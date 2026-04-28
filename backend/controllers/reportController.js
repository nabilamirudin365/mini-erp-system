import * as reportService from "../services/reportService.js";

export const getSalesTrend = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const data = await reportService.getSalesTrend(days);
    res.json(data);
  } catch (error) {
    console.error("Sales Trend Error:", error);
    res.status(500).json({ message: "Gagal mengambil data tren penjualan" });
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const data = await reportService.getTopProducts(limit);
    res.json(data);
  } catch (error) {
    console.error("Top Products Error:", error);
    res.status(500).json({ message: "Gagal mengambil data produk terlaris" });
  }
};
