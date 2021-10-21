const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event"
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
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reply",
        required: true
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentSchema);
