import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { getSalesTrend, getTopProducts } from "../services/reportService";
import { formatRupiah } from "../utils/format";

export default function Report() {
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [error, setError] = useState("");

  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    if (isAdmin) {
      fetchReports();
    }
  }, [isAdmin]);

  const fetchReports = async () => {
    try {
      const [trendRes, topRes] = await Promise.all([
        getSalesTrend(7),
        getTopProducts(5)
      ]);
      setSalesData(trendRes);
      setTopProducts(topRes);
    } catch (err) {
      setError("Gagal memuat data laporan");
    }
  };

  if (!isAdmin) {
    return (
      <Layout>
        <Navbar />
        <div className="p-6">
          <div className="bg-red-400 p-4 brutal-sm font-bold border-4 border-black">
            Akses Ditolak. Halaman ini khusus Admin.
          </div>
        </div>
      </Layout>
    );
  }

  // Kalkulasi max value untuk Chart
  const maxSale = salesData.length > 0 ? Math.max(...salesData.map(d => d.total)) : 100;

  return (
    <Layout>
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-black mb-6 bg-green-300 inline-block p-2 brutal-sm uppercase border-4 border-black">Report & Analytics</h2>

        {error && <div className="bg-red-400 p-3 mb-4 brutal-sm font-bold text-black border-4 border-black">{error}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CUSTOM BAR CHART */}
          <div className="bg-white p-6 brutal border-4 border-black">
            <h3 className="font-black text-2xl mb-6 uppercase border-b-4 border-black pb-2">Tren Penjualan 7 Hari</h3>
            <div className="flex items-end justify-between h-64 gap-2 pt-4">
              {salesData.map((item, index) => {
                const heightPercentage = maxSale > 0 ? (item.total / maxSale) * 100 : 0;
                // Format tanggal pendek (MM-DD)
                const dateSplit = item.date.split("-");
                const shortDate = `${dateSplit[1]}-${dateSplit[2]}`;
                
                return (
                  <div key={index} className="flex flex-col items-center flex-1 group">
                    <div className="text-xs font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-1 py-0.5 whitespace-nowrap">
                      {formatRupiah(item.total)}
                    </div>
                    <div 
                      className="w-full bg-blue-500 border-4 border-black transition-all duration-500 brutal-sm hover:bg-blue-400 cursor-pointer"
                      style={{ height: `${Math.max(heightPercentage, 2)}%` }} // Minimal tinggi 2% agar border terlihat
                    ></div>
                    <div className="text-xs font-black mt-4 md:mt-2 transform -rotate-45 md:rotate-0">
                      {shortDate}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* LEADERBOARD TOP PRODUCTS */}
          <div className="bg-white p-6 brutal border-4 border-black">
            <h3 className="font-black text-2xl mb-6 uppercase border-b-4 border-black pb-2 text-pink-600">Produk Terlaris</h3>
            <div className="flex flex-col gap-4">
              {topProducts.map((product, index) => (
                <div key={product.product_id} className="flex items-center justify-between border-4 border-black p-3 hover:bg-yellow-100 transition-colors brutal-sm">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 flex items-center justify-center font-black text-xl border-4 border-black ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-300' : index === 2 ? 'bg-orange-300' : 'bg-white'}`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-black text-lg leading-tight">{product.name}</h4>
                      <p className="text-sm font-bold text-gray-600">Sisa Stok: {product.current_stock}</p>
                    </div>
                  </div>
                  <div className="bg-green-400 px-3 py-1 border-4 border-black font-black text-lg">
                    {product.qty} x
                  </div>
                </div>
              ))}
              {topProducts.length === 0 && (
                <div className="text-center font-bold p-4">Belum ada data penjualan.</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
