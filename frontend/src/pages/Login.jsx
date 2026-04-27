import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // Token otomatis ditanam ke HttpOnly Cookie oleh backend
      // Kita hanya perlu menyimpan role untuk urusan rendering menu UI
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen bg-pink-300 flex items-center justify-center p-4">
      <div className="bg-white p-8 w-full max-w-md brutal">
        <h2 className="text-3xl font-black mb-6 text-center uppercase tracking-wider bg-yellow-300 p-2 brutal-sm">Login ERP</h2>

        {message && (
          <div className="bg-red-400 p-3 mb-4 brutal-sm font-bold text-black">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block font-bold mb-1">Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-4 border-black outline-none focus:bg-blue-100 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Password</label>
            <input
              type="password"
              placeholder="Masukkan password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-4 border-black outline-none focus:bg-blue-100 transition-colors"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white font-black text-lg py-3 mt-4 brutal-btn"
          >
            MASUK
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;