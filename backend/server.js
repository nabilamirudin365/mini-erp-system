import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("API Server ERP berjalan dengan baik! 🚀");
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/transactions", transactionRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/users", userRoutes);

app.listen(5000, () => {
  console.log("Server jalan di http://localhost:5000");
});