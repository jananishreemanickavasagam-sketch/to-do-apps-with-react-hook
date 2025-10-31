// ====== Import Dependencies ======
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

// ====== Initialize App ======
dotenv.config();
const app = express();

// ====== Connect to MongoDB ======
connectDB();

// ====== Middleware ======
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// ====== Routes ======
app.use("/api/tasks", taskRoutes);

// ====== Default Route ======
app.get("/", (req, res) => {
  res.send("✅ To-Do App Backend is running...");
});

// ====== Server Listen ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
