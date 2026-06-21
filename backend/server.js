import express from "express";
import cors from "cors";
import connectionDB from "./Database/Connection.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";

const app = express();
const PORT = process.env.PORT || 6001;

app.use(express.json({ limit: "50mb" }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Aplod API is running" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "aplod-backend" });
});

app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Server error",
  });
});

connectionDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Server not started because database connection failed");
  });
