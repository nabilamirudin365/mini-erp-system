import { prisma } from "../config/db.js";

export const createNewTransaction = async (userId, items) => {
  // Gunakan Prisma $transaction untuk memastikan proses bersifat atomic
  // Jika di tengah jalan stok kurang, proses akan batal otomatis (rollback)
  const result = await prisma.$transaction(async (tx) => {
    // 1. Buat transaksi awal (total 0)
    const trx = await tx.transactions.create({
      data: {
        user_id: userId,
        total: 0,
      }
    });

    let total = 0;
    const transactionItems = [];

    // 2. Loop setiap item
    for (let item of items) {
      // Ambil produk dan validasi stock menggunakan select
      const product = await tx.products.findUnique({
        where: { id: item.product_id },
        select: { price: true, stock: true }
      });

      if (!product || product.stock < item.qty) {
        throw new Error(`Stok produk tidak mencukupi untuk item ID ${item.product_id}`);
      }

      const price = product.price;

      // Persiapkan data item untuk batch insert
      transactionItems.push({
        transaction_id: trx.id,
        product_id: item.product_id,
        qty: item.qty,
        price: price,
      });

      // Update stok produk
      await tx.products.update({
        where: { id: item.product_id },
        data: {
          stock: {
            decrement: item.qty
          }
        }
      });

      total += price * item.qty;
    }

    // 3. Batch insert semua transaction items sekaligus menggunakan createMany
    // Ini menghemat request ke database daripada di-insert satu-satu di dalam loop (menghindari N+1)
    await tx.transaction_items.createMany({
      data: transactionItems
    });

    // 4. Update total pada transaksi utama
    await tx.transactions.update({
      where: { id: trx.id },
      data: { total: total }
    });

    return { total, id: trx.id };
  });

  return result;
};

export const getAllTransactions = async (userId = null) => {
  // Jika userId ada, filter hanya milik user tersebut. Jika null, ambil semua.
  const whereClause = userId ? { user_id: userId } : {};

  return await prisma.transactions.findMany({
    where: whereClause,
    orderBy: {
      created_at: 'desc' // Urutkan dari yang terbaru
    },
    include: {
      user: {
        select: { email: true, username: true } // Ambil email dan username
      },
      transaction_items: {
        include: {
          product: {
            select: { name: true } // Ambil nama produk dari tabel produk
          }
        }
      }
    }
  });
};
