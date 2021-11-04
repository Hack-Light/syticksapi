const mongoose = require("mongoose"),
  geocoder = require("../util/geocoder");

const emergencySchema = new mongoose.Schema(
  {
    evidence: [
      {
        url: String,
        public_id: String
      }
    ],

    reported: {
      type: Boolean,
      default: false
    },

    repoter: {
      type: String
    },

    time: {
      type: Date,
      default: Date.now(),
      required: true
    },

    location: {
      type: {
        type: String,
        enum: ["Point"]
      },
      coordinates: {
        type: [Number],
        index: "2dspheres"
      },
      formattedAddress: String,
      countryCode: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("emergency", emergencySchema);
