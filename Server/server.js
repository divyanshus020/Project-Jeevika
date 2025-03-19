const app = require("./app");
const connectDB = require("./config/database");
const http = require("http");
const { Server } = require("socket.io");
const Connection = require('./models/connectionSchema');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  socket.on("enquiry", async (data) => {
    try {
      const { companyName, employeeName, requestDate, companyNumber, employeeNumber } = data;
      
      const newConnection = new Connection({
        companyName,
        companyNumber,
        employeeName,
        employeeNumber,
        requestDate
      });

      await newConnection.save();
      io.emit("newEnquiry", newConnection);
    } catch (error) {
      socket.emit("error", "Failed to save connection");
    }
  });

  socket.on("getConnections", async () => {
    try {
      const connections = await Connection.find().sort({ requestDate: -1 });
      socket.emit("connectionsData", connections);
    } catch (error) {
      socket.emit("error", "Failed to fetch connections");
    }
  });

  // New event handler for marking requests as done
  socket.on("markAsDone", async (connectionId) => {
    try {
      await Connection.findByIdAndDelete(connectionId);
      io.emit("requestRemoved", connectionId);
    } catch (error) {
      socket.emit("error", "Failed to mark request as done");
    }
  });

  socket.on("disconnect", () => {
    // Handle disconnect event if needed
  });
});

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  });
