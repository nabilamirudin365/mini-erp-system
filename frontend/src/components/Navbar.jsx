import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isAdmin = localStorage.getItem("role") === "admin";

  return (
    <div className="bg-white p-4 mb-4 brutal flex flex-col md:flex-row gap-4 justify-between items-center text-center">
      <div className="flex flex-wrap gap-3 items-center justify-center">
        <h1 className="font-bold text-xl bg-yellow-300 px-2 py-1 brutal-sm border-2 border-black">ERP</h1>
        <Link to="/dashboard" className="font-bold hover:underline whitespace-nowrap">Dashboard</Link>
        <Link to="/transaction" className="font-bold hover:underline whitespace-nowrap">Transaksi</Link>
        <Link to="/history" className="font-bold hover:underline bg-purple-300 text-black px-2 py-1 brutal-sm border-2 border-black whitespace-nowrap">Riwayat</Link>
        {isAdmin && (
          <>
            <Link to="/products" className="font-bold hover:underline bg-pink-300 text-black px-2 py-1 brutal-sm border-2 border-black whitespace-nowrap">Product Management</Link>
            <Link to="/reports" className="font-bold hover:underline bg-green-300 text-black px-2 py-1 brutal-sm border-2 border-black whitespace-nowrap">Analytics</Link>
            <Link to="/users" className="font-bold hover:underline bg-black text-white px-2 py-1 brutal-sm border-2 border-black whitespace-nowrap">User Management</Link>
          </>
        )}
      </div>

      <button onClick={handleLogout} className="bg-red-400 px-4 py-2 brutal-btn font-bold whitespace-nowrap w-full md:w-auto mt-2 md:mt-0">
        Logout
      </button>
    </div>
  );
}

export default Navbar;