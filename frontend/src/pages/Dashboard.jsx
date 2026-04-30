import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import api from "../utils/api";
import { formatRupiah } from "../utils/format";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalTransactions: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <Layout>
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card>
          <h2 className="font-bold text-lg mb-2">Total Produk</h2>
          <p className="text-3xl font-black">{stats.totalProducts}</p>
        </Card>

        <Card>
          <h2 className="font-bold text-lg mb-2">Total Transaksi</h2>
          <p className="text-3xl font-black">{stats.totalTransactions}</p>
        </Card>

        <Card>
          <h2 className="font-bold text-lg mb-2">Pendapatan</h2>
          <p className="text-3xl font-black">{formatRupiah(stats.revenue)}</p>
        </Card>

      </div>
    </Layout>
  );
}

export default Dashboard;