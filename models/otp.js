const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    otp_code: {
            type: String,
            required: true
    },
    user_ref_code: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    activated_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("otp", otpSchema);