import { useState } from "react";
import api from "../utils/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await api.post("/register", {
        email,
        password,
      });

      // Axios otomatis menangkap response 2xx tanpa perlu res.ok
      setMessage("✅ " + res.data.message);

      // redirect ke login
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch (err) {
      // Menangkap error dari Axios (seperti 400 Bad Request)
      if (err.response && err.response.data && err.response.data.message) {
        setMessage("❌ " + err.response.data.message);
      } else {
        setMessage("❌ " + err.message);
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleRegister}>Register</button>

      <p>{message}</p>
    </div>
  );
}

export default Register;