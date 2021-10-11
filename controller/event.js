const jwt = require("jsonwebtoken"),
  bCrypt = require("bcrypt"),
  eventModel = require("../models/event"),
  Organiser = require("../models/organisers"),
  Comment = require("../models/comment");
const User = require("../models/user");

exports.getAllEvent = async (req, res, next) => {
  try {
    let events = await eventModel
      .find({ is_deleted: false })
      .select(
        "-sponsors -tickets -is_deleted -pricings._id -images.public_id -images._id"
      )
      .populate("organiser", "name", Organiser)
      .populate("comments", Comment);

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
exports.getOneEvent = async (req, res, next) => {
  try {
    let events = await eventModel
      .findOne({ is_deleted: false })
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

exports.createComments = async (req, res, next) => {
  let { user_id, event_id, comment, date } = req.body;
  console.log(req.body);

  try {
    let event = await eventModel.findOne({ _id: user_id, is_deleted: false });
    if (!event) {
      return res.status(409).json({
        success: false,
        message: "Event does not exist",
        error: {
          statusCode: 409,
          description: "Event requested can not be reached at the moment"
        }
      });
    }

    let comments = new Comment({
      user: user_id,
      event: event_id,
      comment,
      date
    });
    await comments.save();

    event.comments.push(comments._id);
    await event.save();

    let event = await eventModel
      .findOne({ _id: event._id })
      .populate("organiser", "name", Organiser)
      .populate("comments", Comment);

    return res.status(201).json({
      success: true,
      message: "User registration successfull",
      comments: events
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
