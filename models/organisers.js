const mongoose = require("mongoose");

const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  6
);

const organiserSchema = new mongoose.Schema(
  {
    slug: { type: String, default: () => nanoid() },
    name: {
      type: String
    },
    password: { type: String, default: () => nanoid() },

    phone: {
      type: String,
      required: true
    },

    event: { type: mongoose.Schema.Types.ObjectId, ref: "event" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("organiser", organiserSchema);
