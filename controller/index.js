const eventModel = require("../models/event");
const Organiser = require("../models/organisers");

exports.getAdvert = async (req, res, next) => {
  try {
    let events = await eventModel
      .find({ is_deleted: false, advert: true })
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
