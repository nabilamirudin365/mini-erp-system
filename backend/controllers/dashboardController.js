import { pool } from "../config/db.js";

export const getDashboardStats = async (req, res) => {
  try {
    const productsResult = await pool.query("SELECT COUNT(*) FROM products");
    const transactionsResult = await pool.query("SELECT COUNT(*) FROM transactions");
    const revenueResult = await pool.query("SELECT SUM(total) FROM transactions");

    res.json({
      totalProducts: parseInt(productsResult.rows[0].count) || 0,
      totalTransactions: parseInt(transactionsResult.rows[0].count) || 0,
      revenue: parseInt(revenueResult.rows[0].sum) || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
