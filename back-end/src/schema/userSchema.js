const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "image",
    },
  ],
});

module.exports = new mongoose.model("user", userSchema, "user");
