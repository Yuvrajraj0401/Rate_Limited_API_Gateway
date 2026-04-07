require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Import middlewares
const authMiddleware = require("./middleware/auth");
const rateLimiter = require("./middleware/rateLimiter");
const logger = require("./middleware/logger");

// Import routes
const routes = require("./routes");

const app = express();

// 🔧 Global Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // basic logging

// 🧠 Custom Middleware Pipeline
app.use("/api", authMiddleware);
app.use("/api", rateLimiter);
app.use("/api", logger);            // 3. Custom logging

// 🚀 Routes
app.use("/api", routes);

// 🏥 Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Gateway running 🚀" });
});

// ❌ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// 🌍 Start Server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});