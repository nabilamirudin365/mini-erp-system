import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-yellow-200">

      {/* Sidebar */}
      <div className="w-60 bg-white p-4 brutal">
        <h2 className="text-xl font-bold mb-4">Mini ERP</h2>

        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className="p-2 brutal-sm bg-blue-300">
            Dashboard
          </Link>

          <Link to="/transaction" className="p-2 brutal-sm bg-green-300">
            Transaksi
          </Link>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {children}
      </div>

    </div>
  );
}

export default Layout;