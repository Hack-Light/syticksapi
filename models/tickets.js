const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user"
    },
    paid: { type: Boolean.apply, default: false },

    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "event"
    },
    maxCount: {
      type: Number
    },
    paid: {
      type: Boolean,
      default: false
    },
    details: [
      {
        priceName: String,
        priceAmount: Number,
        tickCount: Number,
        ticketAmount: Number
      }
    ],
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "transaction"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("ticket", ticketSchema);
