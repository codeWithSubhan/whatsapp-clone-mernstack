const mongoose = require("mongoose");
const grid = require("gridfs-stream");

const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");

const BASE_URL = process.env.BASE_URL;

let gfs, gridPhotosBucket;
const conn = mongoose.connection;

conn.once("open", () => {
  gridPhotosBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

exports.newMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    await newMessage.save();
    await Conversation.findByIdAndUpdate(req.body.conversationId, {
      message: req.body.text,
    });

    res.status(200).json("Message has been sent successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getMessage = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.uploadPhoto = (req, res) => {
  if (!req.file) return res.status(404).json("File not found");

  const imageUrl = `${BASE_URL}/api/message/file/${req.file.filename}`;

  res.status(200).json(imageUrl);
};

exports.getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridPhotosBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
