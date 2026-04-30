import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();
const isProd = process.env.NODE_ENV === "production";

app.use(cors({
  credentials: true,
  origin: isProd ? process.env.FRONTEND_URL : "http://localhost:5173"
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Default route
app.get("/", (req, res) => {
  res.send("API Server ERP berjalan dengan baik! 🚀");
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/transactions", transactionRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/users", userRoutes);
app.use("/reports", reportRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => {
    console.log("Server jalan di http://localhost:5000");
  });
}

export default app;