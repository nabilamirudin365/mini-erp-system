import { useEffect, useState } from "react";
import Layout from "./Layout";
import Navbar from "./Navbar";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/productService";
import { formatRupiah } from "../utils/format";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "", stock: "", category_id: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Gagal memuat data produk");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editId) {
        await updateProduct(editId, formData);
        setEditId(null);
      } else {
        await createProduct(formData);
      }
      setFormData({ name: "", price: "", stock: "", category_id: "" });
      fetchData(); // Refresh data
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan produk");
    }
  };

  const handleEdit = (product) => {
    setFormData({ 
      name: product.name, 
      price: product.price, 
      stock: product.stock, 
      category_id: product.category_id || "" 
    });
    setEditId(product.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        await deleteProduct(id);
        fetchData();
      } catch (err) {
        setError(err.response?.data?.message || "Gagal menghapus produk");
      }
    }
  };

  if (!isAdmin) {
    return (
      <Layout>
        <Navbar />
        <div className="p-6">
          <div className="bg-red-400 p-4 brutal-sm font-bold border-4 border-black">Akses Ditolak. Halaman ini khusus Admin.</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-black mb-6 bg-pink-300 inline-block p-2 brutal-sm uppercase">Manajemen Produk</h2>

        {error && <div className="bg-red-400 p-3 mb-4 brutal-sm font-bold text-black border-4 border-black">{error}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FORM */}
          <div className="bg-white p-6 brutal lg:col-span-1 h-fit">
            <h3 className="font-black text-xl mb-4">{editId ? "Edit Produk" : "Tambah Produk"}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-bold mb-1">Nama Produk</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border-4 border-black outline-none focus:bg-pink-100"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full p-2 border-4 border-black outline-none focus:bg-pink-100"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Stok Awal</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full p-2 border-4 border-black outline-none focus:bg-pink-100"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">ID Kategori (Opsional)</label>
                <input
                  type="number"
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full p-2 border-4 border-black outline-none focus:bg-pink-100"
                />
              </div>

              <div className="flex gap-2 mt-2">
                <button type="submit" className="flex-1 bg-green-400 text-black font-black py-2 brutal-btn hover:bg-green-300">
                  {editId ? "SIMPAN" : "TAMBAH"}
                </button>
                {editId && (
                  <button type="button" onClick={() => { setEditId(null); setFormData({ name: "", price: "", stock: "", category_id: "" }) }} className="bg-gray-300 font-black py-2 px-4 brutal-btn hover:bg-gray-200">
                    BATAL
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* TABEL */}
          <div className="lg:col-span-2 overflow-x-auto">
            <div className="bg-white brutal min-w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-200 border-b-4 border-black">
                    <th className="p-3 font-black border-r-4 border-black w-12 text-center">ID</th>
                    <th className="p-3 font-black border-r-4 border-black">Nama Produk</th>
                    <th className="p-3 font-black border-r-4 border-black text-right">Harga</th>
                    <th className="p-3 font-black border-r-4 border-black text-center">Stok</th>
                    <th className="p-3 font-black text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b-4 border-black last:border-b-0 hover:bg-yellow-100 transition-colors">
                      <td className="p-3 border-r-4 border-black font-bold text-center">{product.id}</td>
                      <td className="p-3 border-r-4 border-black font-bold">{product.name}</td>
                      <td className="p-3 border-r-4 border-black font-bold text-right">{formatRupiah(product.price)}</td>
                      <td className="p-3 border-r-4 border-black font-bold text-center">
                        <span className={`px-2 py-1 brutal-sm text-sm border-2 border-black ${product.stock <= 5 ? 'bg-red-400 text-white' : 'bg-green-400 text-black'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-3 flex justify-center gap-2">
                        <button onClick={() => handleEdit(product)} className="bg-yellow-300 font-black px-3 py-1 brutal-sm hover:bg-yellow-200">Edit</button>
                        <button onClick={() => handleDelete(product.id)} className="bg-red-400 text-white font-black px-3 py-1 brutal-sm hover:bg-red-500">Hapus</button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-4 text-center font-bold">Belum ada data produk.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
