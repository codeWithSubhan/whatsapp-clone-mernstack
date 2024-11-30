const User = require("../models/userModel");

exports.addUser = async (req, res) => {
  try {
    let exist = await User.findOne({ sub: req.body.sub });

    if (exist) return res.json("User already exists");

    const newUser = new User(req.body);
    await newUser.save();

    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllUsers = async (_, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
