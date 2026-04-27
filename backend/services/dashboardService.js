import { prisma } from "../config/db.js";

export const getStats = async () => {
  // Promise.all memungkinkan ketiga query ini berjalan secara paralel,
  // sehingga jauh lebih cepat daripada menjalankannya satu persatu (await beruntun)
  const [totalProducts, totalTransactions, revenueResult] = await Promise.all([
    prisma.products.count(),
    prisma.transactions.count(),
    prisma.transactions.aggregate({
      _sum: {
        total: true
      }
    })
  ]);

  return {
    totalProducts,
    totalTransactions,
    revenue: revenueResult._sum.total || 0,
  };
};
