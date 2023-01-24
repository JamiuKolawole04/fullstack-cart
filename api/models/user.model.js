const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 120,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 1024,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

exports.User = User;
