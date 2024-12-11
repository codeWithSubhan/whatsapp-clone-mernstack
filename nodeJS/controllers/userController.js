const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getUsers = catchAsync(async (req, res) => {
  const user = await User.find({ _id: { $ne: req.user.id } });
  res.status(200).json(user);
});
