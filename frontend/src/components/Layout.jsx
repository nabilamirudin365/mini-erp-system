import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-yellow-200">

      {/* Sidebar */}
      <div className="w-full md:w-60 bg-white p-4 brutal md:border-r-4 md:border-b-0 border-b-4 border-black shrink-0">
        <h2 className="text-xl font-bold mb-4">Mini ERP</h2>

        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
          <Link to="/dashboard" className="p-2 brutal-sm bg-blue-300 whitespace-nowrap">
            Dashboard
          </Link>

          <Link to="/transaction" className="p-2 brutal-sm bg-green-300 whitespace-nowrap">
            Transaksi
          </Link>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-6 w-full max-w-[100vw] overflow-x-hidden">
        {children}
      </div>

    </div>
  );
}

export default Layout;