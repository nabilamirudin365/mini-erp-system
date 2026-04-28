import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isAdmin = localStorage.getItem("role") === "admin";

  return (
    <div className="bg-white p-4 mb-4 brutal flex justify-between items-center">
      <div className="flex gap-6 items-center">
        <h1 className="font-bold text-xl bg-yellow-300 px-2 py-1 brutal-sm border-2 border-black mr-4">ERP</h1>
        <Link to="/dashboard" className="font-bold hover:underline">Dashboard</Link>
        <Link to="/transaction" className="font-bold hover:underline">Transaksi</Link>
        {isAdmin && (
          <>
            <Link to="/products" className="font-bold hover:underline bg-pink-300 text-black px-2 py-1 brutal-sm border-2 border-black">Product Management</Link>
            <Link to="/users" className="font-bold hover:underline bg-black text-white px-2 py-1 brutal-sm border-2 border-black">User Management</Link>
          </>
        )}
      </div>

      <button onClick={handleLogout} className="bg-red-400 px-4 py-2 brutal-btn font-bold">
        Logout
      </button>
    </div>
  );
}

export default Navbar;