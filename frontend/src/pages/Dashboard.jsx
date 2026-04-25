import { useEffect, useState } from "react";
import { jwtDecode} from "jwt-decode";
import api from "../utils/api"

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await api.get("/profile");
        console.log(res.data);
        // Menyimpan data user dari backend ke state React
        setUser(res.data.user);
      } catch (err) {
        console.error("Gagal mengambil data profile");
      }
    };

    getProfile();
  }, []);

  const handleLogout = () => {
    // Menghapus data di local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("respon");
    window.location.href = "/";
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {user && (
        <p>
          Login sebagai: <b>{user.email}</b>
        </p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;