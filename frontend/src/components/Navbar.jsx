function Navbar() {
  return (
    <div className="bg-white p-4 mb-4 brutal flex justify-between">
      <h1 className="font-bold">Dashboard</h1>

      <button className="bg-red-400 px-3 py-1 brutal-btn">
        Logout
      </button>
    </div>
  );
}

export default Navbar;