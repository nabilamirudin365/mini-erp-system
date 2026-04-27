import { useEffect, useState } from "react";
import Layout from "./Layout";
import Navbar from "./Navbar";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ email: "", password: "", role_id: 2 });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat data user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editId) {
        await updateUser(editId, formData);
        setEditId(null);
      } else {
        await createUser(formData);
      }
      setFormData({ email: "", password: "", role_id: 2 });
      fetchData(); // Refresh data
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan user");
    }
  };

  const handleEdit = (user) => {
    setFormData({ email: user.email, password: "", role_id: user.role_id });
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        await deleteUser(id);
        fetchData();
      } catch (err) {
        setError(err.response?.data?.message || "Gagal menghapus user");
      }
    }
  };

  if (!isAdmin) {
    return (
      <Layout>
        <Navbar />
        <div className="p-6">
          <div className="bg-red-400 p-4 brutal-sm font-bold">Akses Ditolak. Anda bukan Admin.</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-black mb-6 bg-yellow-300 inline-block p-2 brutal-sm uppercase">Manajemen User</h2>

        {error && <div className="bg-red-400 p-3 mb-4 brutal-sm font-bold text-black">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FORM */}
          <div className="bg-white p-6 brutal">
            <h3 className="font-black text-xl mb-4">{editId ? "Edit User" : "Tambah User"}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-bold mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 border-4 border-black outline-none focus:bg-blue-100"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Password {editId && "(Kosongkan jika tidak diubah)"}</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-2 border-4 border-black outline-none focus:bg-blue-100"
                  required={!editId}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Role</label>
                <select
                  value={formData.role_id}
                  onChange={(e) => setFormData({ ...formData, role_id: parseInt(e.target.value) })}
                  className="w-full p-2 border-4 border-black outline-none focus:bg-blue-100"
                >
                  <option value={1}>Admin</option>
                  <option value={2}>User</option>
                </select>
              </div>

              <div className="flex gap-2 mt-2">
                <button type="submit" className="flex-1 bg-blue-500 text-white font-black py-2 brutal-btn">
                  {editId ? "SIMPAN" : "TAMBAH"}
                </button>
                {editId && (
                  <button type="button" onClick={() => { setEditId(null); setFormData({ email: "", password: "", role_id: 2 }) }} className="bg-gray-300 font-black py-2 px-4 brutal-btn">
                    BATAL
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* TABEL */}
          <div className="md:col-span-2 overflow-x-auto">
            <div className="bg-white brutal min-w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-200 border-b-4 border-black">
                    <th className="p-3 font-black border-r-4 border-black">ID</th>
                    <th className="p-3 font-black border-r-4 border-black">Email</th>
                    <th className="p-3 font-black border-r-4 border-black">Role</th>
                    <th className="p-3 font-black">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b-4 border-black last:border-b-0 hover:bg-yellow-100 transition-colors">
                      <td className="p-3 border-r-4 border-black font-bold">{user.id}</td>
                      <td className="p-3 border-r-4 border-black font-bold">{user.email}</td>
                      <td className="p-3 border-r-4 border-black font-bold">
                        <span className={`px-2 py-1 brutal-sm text-sm ${user.role_id === 1 ? 'bg-red-400 text-white' : 'bg-green-400'}`}>
                          {user.role?.name || "Unknown"}
                        </span>
                      </td>
                      <td className="p-3 flex gap-2">
                        <button onClick={() => handleEdit(user)} className="bg-yellow-300 font-black px-3 py-1 brutal-sm">Edit</button>
                        <button onClick={() => handleDelete(user.id)} className="bg-red-400 text-white font-black px-3 py-1 brutal-sm">Hapus</button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-4 text-center font-bold">Belum ada data user.</td>
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