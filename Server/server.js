  const app = require("./app");
  const connectDB = require("./config/database");
  const http = require("http");
  const { Server } = require("socket.io");
  const Connection = require('./models/connectionSchema');
  const Message = require('./models/messageModel');

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
      methods: ["GET", "POST", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 New client connected");
    
    socket.on("enquiry", async (data) => {
      try {
        const { companyName, employeeName, requestDate, companyNumber, employeeNumber } = data;
        console.log("📝 New enquiry received:");
        console.log(data);
        
        const newConnection = new Connection({
          companyName,
          companyNumber,
          employeeName,
          employeeNumber,
          requestDate
        });

        await newConnection.save();
        console.log(`✅ Enquiry saved to database with ID: ${newConnection._id}`);
        io.emit("newEnquiry", newConnection);
      } catch (error) {
        console.error("❌ Error saving enquiry:", error);
        socket.emit("error", "Failed to save connection");
      }
    });

    socket.on("companyMessage", async (data) => {
      try {
        const { companyName, companyEmail, companyNumber, message } = data;
        console.log("📩 New company message received:");
        console.log("- Company: ", companyName);
        console.log("- Email: ", companyEmail);
        console.log("- Number: ", companyNumber);
        console.log("- Message: ", message);
        console.log("- Time: ", new Date().toISOString());
        
        // Validate required fields
        if (!companyName || !companyEmail || !companyNumber || !message) {
          console.error("❌ Missing required fields for message");
          return socket.emit("error", "Missing required fields for message");
        }
        
        // Create and save the new message
        const newMessage = new Message({
          companyName,
          companyEmail,
          companyNumber,
          message,
          timestamp: new Date()
        });

        await newMessage.save();
        console.log(`✅ Message saved to database with ID: ${newMessage._id}`);
        
        // Broadcast the message to all connected clients
        io.emit("newCompanyMessage", newMessage);
        console.log("📢 Broadcasted new message to all clients");
        
        // Send confirmation to the sender
        socket.emit("messageSent", { success: true, messageId: newMessage._id });
        console.log("✅ Confirmation sent to sender");
      } catch (error) {
        console.error("❌ Message error:", error);
        socket.emit("error", "Failed to send message");
      }
    });

    socket.on("getCompanyMessages", async () => {
      try {
        console.log("📋 Fetching all company messages");
        const messages = await Message.find().sort({ timestamp: -1 });
        console.log(`Found ${messages.length} messages`);
        socket.emit("companyMessagesData", messages);
      } catch (error) {
        console.error("❌ Error fetching messages:", error);
        socket.emit("error", "Failed to fetch company messages");
      }
    });

    socket.on("deleteCompanyMessage", async (messageId) => {
      try {
        console.log(`🗑️ Deleting message with ID: ${messageId}`);
        await Message.findByIdAndDelete(messageId);
        console.log("Message deleted successfully");
        io.emit("companyMessageRemoved", messageId);
      } catch (error) {
        console.error("❌ Error deleting message:", error);
        socket.emit("error", "Failed to delete message");
      }
    });

    socket.on("getConnections", async () => {
      try {
        console.log("📋 Fetching all connections");
        const connections = await Connection.find().sort({ requestDate: -1 });
        console.log(`Found ${connections.length} connections`);
        socket.emit("connectionsData", connections);
      } catch (error) {
        console.error("❌ Error fetching connections:", error);
        socket.emit("error", "Failed to fetch connections");
      }
    });

    socket.on("markAsDone", async (connectionId) => {
      try {
        console.log(`✅ Marking connection as done: ${connectionId}`);
        await Connection.findByIdAndDelete(connectionId);
        console.log("Connection marked as done and removed");
        io.emit("requestRemoved", connectionId);
      } catch (error) { 
        console.error("❌ Error marking as done:", error);
        socket.emit("error", "Failed to mark request as done");
      }
    });

    socket.on("disconnect", () => {
      console.log("🔌 Client disconnected");
    });
  });

  connectDB()
    .then(() => {
      const PORT = process.env.PORT || 8080;
      server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    })
    .catch((error) => {
      console.error("❌ MongoDB Connection Failed:", error.message);
      process.exit(1);
    });
