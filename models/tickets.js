const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user"
    },
    paid: {},

    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "event"
    },
    maxCount: {
      type: Date,
      default: Date.now(),
      required: true
    },
    paid: {
      type: Boolean,
      default: false
    },
    /*  tx_ref,
    flw_ref,
    paymentId,
    paymentType,
    IP,
    amount,
    modalauditid,
    device_fingerprint,
    status */

    dummyCount: {
      type: {
        type: Number,
        default: 0
      },
      ticketArrayList: [
        {
          priceName: String,
          priceAmount: Number,
          tickCount: Number,
          ticketAmount: Number
        }
      ]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ticket", ticketSchema);
