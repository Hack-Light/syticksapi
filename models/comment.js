const mongoose = require("mongoose");

const repliesSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  date: String
});

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
      ref: "users",
      required: true
    },
    date: String,
    replies: [repliesSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentSchema);
