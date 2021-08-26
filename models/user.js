const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // slug: { type: String, default: () => nanoid() },

    username: {
      type: String
    },
    email: {
      type: String
    },
    provider: String,

    providerID: String,

    phone: {
      type: String
    },

    password: {
      type: String
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    api_token: String,

    day: String,

    month: String,

    year: String,

    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
