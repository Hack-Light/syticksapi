const mongoose = require("mongoose"),
  geocoder = require("../util/geocoder");

const crimeSchema = new mongoose.Schema(
  {
    crimeType: {
      type: String,
      required: true
    },

    text: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

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

    time: {
      type: Date,
      default: Date.now(),
      required: true
    },

    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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
      formattedAddress: String
    }
  },
  { timestamps: true }
);

crimeSchema.pre("save", async function (next) {
  let loc = await geocoder.geocode(this.address);

  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };
});

module.exports = mongoose.model("crime", crimeSchema);
