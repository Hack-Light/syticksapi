const { Date } = require("mongoose");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts"
    },

    text: {
      type: String,
      required: true
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    date: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentSchema);
