import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Karena token sekarang ada di HttpOnly Cookie (tidak bisa dibaca JS),
  // kita cukup mengecek ketersediaan 'role' sebagai indikator login untuk UI.
  // Keamanan sesungguhnya tetap dijaga oleh Backend & Axios Interceptor.
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;