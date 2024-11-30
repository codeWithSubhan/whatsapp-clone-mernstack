const Conversation = require("../models/conversationModel");

exports.newConversation = async (req, res) => {
  let senderId = req.body.senderId;
  let receiverId = req.body.receiverId;

  const exist = await Conversation.findOne({
    members: { $all: [receiverId, senderId] },
  });

  if (exist) return res.json("conversation already exists");

  const newConversation = new Conversation({
    members: [senderId, receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.query.senderId, req.query.receiverId] },
    });

    console.log("conversation:", conversation);
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};
