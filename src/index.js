const express = require("express");
const app = express();
const db = require("./config/db");
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
    error: err.error || null,
  });
});

// Database Connection
db.connect()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database connection error:", err));
