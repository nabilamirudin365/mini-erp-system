import { pool } from "../config/db.js";

export const createTransaction = async (req, res) => {
  const client = await pool.connect();

  try {
    const { items } = req.body; 
    // items: [{ product_id, qty }]

    await client.query("BEGIN");

    // 1. buat transaksi
    const trx = await client.query(
      "INSERT INTO transactions (user_id, total) VALUES ($1, 0) RETURNING id",
      [req.user.id]
    );

    const transactionId = trx.rows[0].id;

    let total = 0;

    // 2. loop item
    for (let item of items) {
      const product = await client.query(
        "SELECT * FROM products WHERE id=$1",
        [item.product_id]
      );

      const price = product.rows[0].price;

      // insert item
      await client.query(
        "INSERT INTO transaction_items (transaction_id, product_id, qty, price) VALUES ($1,$2,$3,$4)",
        [transactionId, item.product_id, item.qty, price]
      );

      // update stock
      await client.query(
        "UPDATE products SET stock = stock - $1 WHERE id=$2",
        [item.qty, item.product_id]
      );

      total += price * item.qty;
    }

    // 3. update total transaksi
    await client.query(
      "UPDATE transactions SET total=$1 WHERE id=$2",
      [total, transactionId]
    );

    await client.query("COMMIT");

    res.json({ message: "Transaksi berhasil", total });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ message: "Gagal transaksi" });
  } finally {
    client.release();
  }
};