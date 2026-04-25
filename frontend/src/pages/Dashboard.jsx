import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

function Dashboard() {
  return (
    <Layout>
      <Navbar />

      <div className="grid grid-cols-3 gap-4">

        <Card>
          <h2 className="font-bold">Total Produk</h2>
          <p>100</p>
        </Card>

        <Card>
          <h2 className="font-bold">Total Transaksi</h2>
          <p>50</p>
        </Card>

        <Card>
          <h2 className="font-bold">Pendapatan</h2>
          <p>Rp 1.000.000</p>
        </Card>

      </div>
    </Layout>
  );
}

export default Dashboard;