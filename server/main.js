require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./db.js");
const Router = require("./routes.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use(Router); 

app.get("/", (req, res) => {
  res.send("📚 Library Management API is running...");
});

// Start Server
const startServer = async () => {
  await connectDB();
  await sequelize.sync(); // Ensure tables are created
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();
