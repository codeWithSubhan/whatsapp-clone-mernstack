const express = require("express");

const messageController = require("../controller/messageController");
const uploadController = require("../controller/uploadController");

const router = express.Router();

router.post("/text", messageController.newMessage);
router.get("/text/:id", messageController.getMessage);

router.post(
  "/file",
  uploadController.uploadMulterPhoto,
  messageController.uploadPhoto
);
router.get("/file/:filename", messageController.getImage);

module.exports = router;
