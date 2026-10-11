require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

// Restrict browser access to the configured frontend origin.
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/tasks", taskRoutes);

// Return JSON for unknown routes.
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

async function startServer() {
  if (!process.env.MONGO_URI) {
    console.error("Missing MONGO_URI. Create backend/.env from .env.example.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
    app.listen(PORT, () => {
      console.log(`API server running at http://localhost:${PORT}`);
      console.log(`Allowed frontend origin: ${FRONTEND_ORIGIN}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
