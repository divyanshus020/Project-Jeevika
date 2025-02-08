const app = require("./app"); // ✅ Import the Express app correctly
const connectDB = require("./config/database");

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
