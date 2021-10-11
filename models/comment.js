const { Date } = require("mongoose");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events"
    },

    comment: {
      type: String,
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    date: String,
    replies: [{}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentSchema);
