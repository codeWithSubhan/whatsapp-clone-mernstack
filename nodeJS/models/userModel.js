const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  aud: {
    type: String,
    required: true,
  },
  azp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  email_verified: {
    type: Boolean,
    required: true,
  },
  exp: {
    type: Number,
    required: true,
  },
  given_name: {
    type: String,
    required: true,
  },
  iat: {
    type: Number,
    required: true,
  },
  iss: {
    type: String,
    required: true,
  },
  jti: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nbf: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  sub: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
