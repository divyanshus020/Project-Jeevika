const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/messages", messageController.createMessage);
router.get("/messages", messageController.getMessages);
router.get("/messages/:id", messageController.getMessageById);
router.delete("/messages/:id", messageController.deleteMessage);

module.exports = router;
