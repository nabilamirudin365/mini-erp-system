import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../services/userService";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [nama, setNama] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleSubmit = async () => {
    if (!nama) return;

    if (editId) {
      await updateUser(editId, nama);

      const updated = users.map((u) =>
        u.id === editId ? { ...u, name: nama } : u
      );

      setUsers(updated);
      setEditId(null);
    } else {
      const newUser = await createUser(nama);
      setUsers([...users, newUser]);
    }

    setNama("");
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleEdit = (user) => {
    setNama(user.name);
    setEditId(user.id);
  };

  return (
    <div>
      <h2>CRUD User</h2>

      <input
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Masukkan nama"
      />

      <button onClick={handleSubmit}>
        {editId ? "Update" : "Tambah"}
      </button>

      <hr />

      {users.map((user) => (
        <div key={user.id}>
          {user.name}

          <button onClick={() => handleEdit(user)}>
            Edit
          </button>

          <button  confirm="Are you sure?" onClick={() => handleDelete(user.id)}>
            Hapus
          </button>
        </div>
      ))}
    </div>
  );
}