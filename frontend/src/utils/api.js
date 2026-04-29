import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Izinkan pengiriman cookie lintas origin
api.defaults.withCredentials = true;

// Tangkap error 401/403 secara global (Auto Logout)
api.interceptors.response.use(
  (response) => {
    // Jika format backend kita adalah successResponse, bongkar payload data-nya otomatis
    if (response.data && response.data.status === "success" && response.data.data !== undefined) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
    // Jika backend membalas dengan status 401 (Unauthorized) atau 403 (Forbidden)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Hapus sesi pengguna dari penyimpanan peramban
      localStorage.clear(); 
      
      // Cegah infinite loop jika sudah berada di halaman login
      if (window.location.pathname !== "/") {
        localStorage.clear();
        alert("Sesi Anda telah berakhir. Silakan login kembali.");
         // Pastikan semua data sesi dihapus
        window.location.href = "/"; // Paksa pindah ke halaman login
      }
    }
    return Promise.reject(error);
  }
);

export default api;