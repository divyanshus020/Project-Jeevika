const app = require("../Server/app");
const connectDB = require("./config/database");

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
