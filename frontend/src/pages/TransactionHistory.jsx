import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { getTransactions } from "../services/transactionService";
import { formatRupiah } from "../utils/format";

export default function TransactionHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getTransactions();
      setHistory(data);
    } catch (err) {
      setError("Gagal memuat riwayat transaksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-black mb-6 bg-purple-300 inline-block p-2 brutal-sm uppercase border-4 border-black">
          {isAdmin ? "Semua Riwayat Transaksi" : "Riwayat Transaksi Saya"}
        </h2>

        {error && <div className="bg-red-400 p-3 mb-4 brutal-sm font-bold text-black border-4 border-black">{error}</div>}

        {loading ? (
          <div className="font-bold text-xl">Memuat data...</div>
        ) : history.length === 0 ? (
          <div className="bg-white p-6 brutal font-bold text-center border-4 border-black">
            Belum ada riwayat transaksi.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {history.map((trx) => (
              <div key={trx.id} className="bg-white p-5 brutal border-4 border-black flex flex-col h-full hover:bg-yellow-50 transition-colors">
                
                {/* Header Kartu */}
                <div className="border-b-4 border-black pb-3 mb-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-black text-white px-2 py-1 text-sm font-black brutal-sm">TRX-{trx.id}</span>
                    <span className="font-bold text-sm bg-gray-200 px-2 py-1 border-2 border-black">
                      {new Date(trx.created_at).toLocaleDateString("id-ID", {
                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                  {isAdmin && (
                    <div className="text-sm font-bold mt-2">
                      Kasir: <span className="bg-pink-200 px-1 border-2 border-black">{trx.user?.username || trx.user?.email || "Unknown"}</span>
                    </div>
                  )}
                </div>

                {/* Body Kartu (Daftar Item) */}
                <div className="flex-grow flex flex-col gap-2 mb-4">
                  {trx.transaction_items?.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm font-bold border-l-4 border-black pl-2">
                      <span>{item.qty}x {item.product?.name || "Produk Dihapus"}</span>
                      <span>{formatRupiah(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Kartu */}
                <div className="mt-auto bg-green-300 p-2 border-4 border-black flex justify-between items-center brutal-sm">
                  <span className="font-black uppercase text-sm">Total Belanja</span>
                  <span className="font-black text-xl">{formatRupiah(trx.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
