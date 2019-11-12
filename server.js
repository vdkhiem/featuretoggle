const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

// Init middleware
app.use(express.json({ extended: false })); // "extended: false" allow to log req.body

// Health check api
app.get("/", (req, res) => res.send("API is healthy!"));

// Define routes
app.use("/api/projects", require("./routes/api/projects"));
app.use("/api/features", require("./routes/api/features"));

// Add port
const PORT = process.env.PORT || 5481;
// Listen to server
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
