const eventModel = require("../models/event");
const Organiser = require("../models/organisers");
const Comment = require("../models/comment");
const User = require("../models/user");

exports.getAdvert = async (req, res, next) => {
  try {
    let events = await eventModel
      .find({ is_deleted: false, advert: true })
      .populate("organiser", "name", Organiser)
      .populate({
        path: "comments",
        model: Comment,
        populate: [
          {
            path: "user",
            model: User,
            select: "username"
          },
          {
            path: "replies",
            model: Reply,
            populate: {
              path: "user",
              model: User,
              select: "username"
            }
          }
        ]
      })

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
