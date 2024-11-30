const express = require("express");

const conversationController = require("../controller/conversationController");

const router = express.Router();

router
  .route("/")
  .get(conversationController.getConversation)
  .post(conversationController.newConversation);

module.exports = router;
