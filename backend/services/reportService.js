import { prisma } from "../config/db.js";

export const getSalesTrend = async (days = 7) => {
  // Ambil transaksi dalam 'days' terakhir
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - days);

  const transactions = await prisma.transactions.findMany({
    where: {
      created_at: {
        gte: dateLimit,
      },
    },
    select: {
      total: true,
      created_at: true,
    },
    orderBy: {
      created_at: 'asc',
    }
  });

  // Grouping per hari di JS
  const trendData = {};
  
  // Siapkan array dengan tanggal kosong selama 'days' hari terakhir
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0]; // Format YYYY-MM-DD
    trendData[dateStr] = 0;
  }

  // Isi data yang ada
  transactions.forEach(t => {
    if (t.created_at) {
      const dateStr = t.created_at.toISOString().split('T')[0];
      if (trendData[dateStr] !== undefined) {
        trendData[dateStr] += t.total || 0;
      }
    }
  });

  // Ubah ke format array untuk frontend
  return Object.keys(trendData).map(date => ({
    date,
    total: trendData[date]
  }));
};

export const getTopProducts = async (limit = 5) => {
  const items = await prisma.transaction_items.groupBy({
    by: ['product_id'],
    _sum: {
      qty: true,
    },
    orderBy: {
      _sum: {
        qty: 'desc'
      }
    },
    take: limit,
  });

  // Ambil nama produk untuk setiap product_id
  const topProducts = await Promise.all(
    items.map(async (item) => {
      const product = await prisma.products.findUnique({
        where: { id: item.product_id },
        select: { name: true, stock: true }
      });
      return {
        product_id: item.product_id,
        name: product ? product.name : 'Produk Dihapus',
        qty: item._sum.qty || 0,
        current_stock: product ? product.stock : 0
      };
    })
  );

  return topProducts;
};
