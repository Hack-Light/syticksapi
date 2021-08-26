const jwt = require("jsonwebtoken"),
  bCrypt = require("bcrypt"),
  eventModel = require("../models/event"),
  Organiser = require("../models/organisers");

exports.getAllEvent = async (req, res, next) => {
  try {
    let events = await eventModel
      .find({ is_deleted: false })
      .select(
        "-sponsors -tickets -is_deleted -pricings._id -images.public_id -images._id"
      )
      .populate("organiser", "name", Organiser);

    res.status(200).json({
      success: true,
      events
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      error: {
        statusCode: 500,
        description: err.message
      }
    });
  }
};
