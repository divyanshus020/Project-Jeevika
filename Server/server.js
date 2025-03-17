const app = require("./app");
const connectDB = require("./config/database");
const http = require("http");
const { Server } = require("socket.io");

// ✅ Create HTTP server and attach Express app
const server = http.createServer(app);

// ✅ Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", // Allow frontend to connect
    methods: ["GET", "POST"],
  },
});

// ✅ Handle WebSocket connections
io.on("connection", (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`);

  // ✅ Listen for enquiry event from Company Dashboard
  socket.on("enquiry", (data) => {
    console.log("📩 Enquiry received:", data);

    // ✅ Broadcast to all connected admins
    io.emit("newEnquiry", data);
  });

  // ✅ Handle client disconnection
  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// ✅ Connect to MongoDB before starting the server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit process if DB connection fails
  });

  