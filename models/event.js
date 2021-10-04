const mongoose = require("mongoose");

const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  12
);

const eventSchema = new mongoose.Schema(
  {
    slug: { type: String, default: () => nanoid(), unique: true },

    name: {
      type: String,
      required: true
    },
    organiser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "organiser"
    },

    description: {
      type: String,
      required: true
    },
    slots: {
      type: String,
      default: "unlimited"
    },

    sponsors: [
      {
        type: String
      }
    ],
    done: { type: Boolean, default: false },
    advert: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    images: [
      {
        url: String,
        public_id: String
      }
    ],
    pricings: [
      {
        priceName: String,
        priceAmount: String
      }
    ],
    category: {
      type: String,
      enum: ["parties", "forms", "comedy", "tours", "music"],
      default: "parties"
    },

    date: Date,

    street: String,

    city: String,

    town: String,

    country: String,

    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "tickets" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("event", eventSchema);
