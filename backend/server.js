import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

// 🔹 Connect Database
connectDB();

const app = express();

// 🔹 Middleware
app.use(express.json()); // parse JSON
app.use(cors()); // allow frontend requests

// 🔹 Routes
app.use("/api/auth", userRoutes);
app.use("/api/notes", noteRoutes);

// 🔹 Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔹 Error Handling (optional but pro)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Server Error" });
});

// 🔹 Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});