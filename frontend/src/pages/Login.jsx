import { useState } from "react";
 import api from "../utils/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

const handleLogin = async () => {
  try {
    const res = await api.post("/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    window.location.href = "/dashboard";
  } catch (err) {
    setMessage("Login gagal");
  }
};

  return (
    <div>
      <h2>Login</h2>

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

      <button onClick={handleLogin}>Login</button>

      <p>{message}</p>
    </div>
  );
}

export default Login;