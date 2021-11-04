const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    ticket_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ticket"
    },
    tx_ref: String,
    flw_ref: String,
    paymentId: String,
    paymentType: String,
    IP: String,
    modalauditid: String,
    device_fingerprint: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("transaction", transactionSchema);
