const cors = require("cors");

module.exports = cors({
  origin: "https://utilidades-seven.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});
