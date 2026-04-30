import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import api from "../utils/api";
import toast from "react-hot-toast";
import { formatRupiah } from "../utils/format";

function Transaction() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 ambil data produk
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        // Karena API kita mereturn { success: true, data: { items: [...] } }
        setProducts(res.data.data.items);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  // 🔥 tambah ke keranjang
  const addToCart = (product) => {
    const exist = cart.find((item) => item.product_id === product.id);

    if (exist) {
      // validasi stok
      if (product.stock === 0) {
        toast.error("Stok habis");
        return;
      }

      setCart(
        cart.map((item) =>
          item.product_id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          product_id: product.id,
          name: product.name,
          price: product.price,
          stock: product.stock,
          qty: 1,
        },
      ]);
    }
  };

  // 🔥 increment qty
  const incrementQty = (index) => {
    const newCart = [...cart];

    if (newCart[index].qty >= newCart[index].stock) {
      alert("Stok tidak cukup");
      return;
    }

    newCart[index].qty += 1;
    setCart(newCart);
  };

  // 🔥 decrement qty
  const decrementQty = (index) => {
    const newCart = [...cart];

    if (newCart[index].qty === 1) {
      newCart.splice(index, 1);
    } else {
      newCart[index].qty -= 1;
    }

    setCart(newCart);
  };

  // 🔥 hapus item
  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // 🔥 hitung total
  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  // 🔥 checkout
  const handleCheckout = async () => {
    try {
      setLoading(true);

      await api.post("/transactions", {
        items: cart.map((item) => ({
          product_id: item.product_id,
          qty: item.qty,
        })),
      });

      toast.success("Transaksi berhasil");
      setCart([]);
    } catch (err) {
      toast.error("Gagal transaksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Navbar />

      <div className="grid grid-cols-2 gap-6">
        {/* ================== LIST PRODUK ================== */}
        <div>
          <h2 className="mb-2 font-bold text-lg border-b-4 border-black inline-block">
            Produk
          </h2>

          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => p.stock > 0 && addToCart(p)}
              className={`p-3 mb-2 brutal ${
                p.stock === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white cursor-pointer hover:bg-gray-100"
              }`}
            >
              <p className="font-bold">{p.name}</p>
              <p>{formatRupiah(p.price)}</p>
              <p>Stock: {p.stock}</p>
            </div>
          ))}
        </div>

        {/* ================== KERANJANG ================== */}
        <div>
          <h2 className="mb-2 font-bold text-lg">Keranjang</h2>

          {cart.length === 0 && (
            <div className="bg-white p-4 brutal text-center">
              <p className="font-bold">Keranjang kosong</p>
              <p className="text-sm">Klik produk untuk menambahkan</p>
            </div>
          )}

          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white p-3 mb-2 brutal flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{item.name}</p>
                <p>Rp {item.price}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decrementQty(index)}
                    className="px-2 bg-red-400 brutal-sm"
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() => incrementQty(index)}
                    className="px-2 bg-green-400 brutal-sm hover:scale-110 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(index)}
                className="bg-black text-white px-2 brutal-sm"
              >
                X
              </button>
            </div>
          ))}

          {/* TOTAL */}
          <div className="mt-4 p-3 bg-white brutal">
            <p className="font-bold text-lg">Total: {formatRupiah(total)}</p>
          </div>

          {/* CHECKOUT */}
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0 || loading}
            className="mt-4 w-full bg-black text-white py-2 brutal-btn disabled:opacity-50"
          >
            {loading ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Transaction;
