const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event"
    },

    reply: {
      type: String,
      required: true
    },

    comment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    date: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("reply", replySchema);
