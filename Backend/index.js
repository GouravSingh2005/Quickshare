const express = require("express");
const cors = require("cors");
const fileRoutes = require("./routes/fileRoutes");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/upload", fileRoutes);

// Static folder to serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
