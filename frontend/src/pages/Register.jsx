import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("2");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", {
        email,
        password,
        role_id: parseInt(roleId)
      });

      setMessage("✅ " + res.data.message);
      setIsSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setIsSuccess(false);
      if (err.response && err.response.data && err.response.data.message) {
        setMessage("❌ " + err.response.data.message);
      } else {
        setMessage("❌ " + err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-green-300 flex items-center justify-center p-4">
      <div className="bg-white p-8 w-full max-w-md brutal">
        <h2 className="text-3xl font-black mb-6 text-center uppercase tracking-wider bg-yellow-300 p-2 brutal-sm">Buat Akun</h2>

        {message && (
          <div className={`p-3 mb-4 brutal-sm font-bold text-black ${isSuccess ? 'bg-green-400' : 'bg-red-400'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="block font-bold mb-1">Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-4 border-black outline-none focus:bg-pink-100 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Password</label>
            <input
              type="password"
              placeholder="Masukkan password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-4 border-black outline-none focus:bg-pink-100 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Role (Peran)</label>
            <select
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              className="w-full p-3 border-4 border-black outline-none focus:bg-pink-100 transition-colors appearance-none bg-white cursor-pointer"
            >
              <option value="2">User Biasa</option>
              <option value="1">Admin</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-black text-white font-black text-lg py-3 mt-4 brutal-btn"
          >
            DAFTAR SEKARANG
          </button>
        </form>

        <p className="mt-6 text-center font-bold">
          Sudah punya akun? <Link to="/" className="text-blue-600 underline hover:bg-yellow-200 px-1">Login di sini</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;