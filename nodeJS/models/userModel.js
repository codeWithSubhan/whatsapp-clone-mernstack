const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Please tell us your name!"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Please provide your email!"],
      validate: [validator.isEmail, "Please provide us a valid email!"],
      unique: true,
    },
    photo: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png",
    },

    password: {
      type: String,
      minLength: 4,
      required: [true, "Please provide a password!"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password!"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
  },
  {
    strict: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

//mongoDB saved doc in DB like when we use :- save(), create(), etc.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (password, dbPassword) {
  return await bcrypt.compare(password, dbPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
