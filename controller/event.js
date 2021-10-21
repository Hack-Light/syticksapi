const jwt = require("jsonwebtoken"),
  bCrypt = require("bcrypt"),
  eventModel = require("../models/event"),
  Organiser = require("../models/organisers"),
  Comment = require("../models/comment");
const User = require("../models/user");
const Reply = require("../models/reply");

exports.getAllEvent = async (req, res, next) => {
  try {
    let events = await eventModel
      .find({ is_deleted: false })
      .select(
        "-sponsors -tickets -is_deleted -pricings._id -images.public_id -images._id"
      )
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
      });

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
exports.getEventComment = async (req, res, next) => {
  let { event_id } = req.body;
  try {
    let event = await eventModel.findOne({ is_deleted: false, _id: event_id });

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

    event = await eventModel
      .findOne({ _id: event_id, is_deleted: false })
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
      });

    res.status(200).json({
      success: true,
      comments: event.comments
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

exports.getReplyComment = async (req, res, next) => {
  let { _id } = req.body;
  try {
    let comment = await Comment.findOne({ _id }).populate({
      path: "replies",
      model: Reply,
      populate: {
        path: "user",
        model: User,
        select: "username"
      }
    });

    res.status(200).json({
      success: true,
      comments: comment.replies
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
    let event = await eventModel.findOne({ _id: event_id, is_deleted: false });
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
      event_id,
      comment,
      date
    });
    await comments.save();

    event.comments.push(comments._id);
    await event.save();

    event = await eventModel.findOne({ _id: event._id }).populate({
      path: "comments",
      model: Comment,
      populate: {
        path: "user",
        model: User,
        select: "username"
      }
    });

    return res.status(201).json({
      success: true,
      message: "User registration successfull",
      comments: event.comments
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

exports.createReply = async (req, res, next) => {
  let { user_id, event_id, comment_id, comment, date } = req.body;

  try {
    let event = await eventModel.findOne({ _id: event_id, is_deleted: false });
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

    let newreply = new Reply({
      user: user_id,
      event_id,
      comment,
      date,
      comment_id
    });
    newreply = await newreply.save();

    let comment1 = await Comment.findOne({ _id: comment_id });
    comment1.replies.push(newreply._id);
    await comment1.save();

    let comment2 = await Comment.findOne({ _id: comment_id }).populate({
      path: "replies",
      model: Reply,
      populate: {
        path: "user",
        model: User,
        select: "username"
      }
    });

    /*   let data = event.comments.filter(item => item._id == comment_id); */

    return res.status(201).json({
      success: true,
      message: " reply successfully created",
      comments: comment2.replies
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
