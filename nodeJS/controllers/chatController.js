const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createChat = catchAsync(async (req, res, next) => {
  const { userId } = req.body;

  if (!userId)
    return next(new AppError("UserId param not sent with request", 400));

  let chat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users")
    .populate("latestMessage");

  chat = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "name photo email",
  });

  if (chat.length) return res.send(chat[0]);

  const createdChat = await Chat.create({
    users: [req.user._id, userId],
  });

  const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
    "users"
  );

  res.status(200).json(FullChat);
});
