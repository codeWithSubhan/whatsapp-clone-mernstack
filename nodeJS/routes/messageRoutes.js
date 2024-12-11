const express = require("express");

const messageController = require("../controllers/messageController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/:chatId", authController.protect, messageController.getMessages);
router.post("/", authController.protect, messageController.sendMessage);

module.exports = router;
