const express = require("express"),
  {
    getAllEvent,
    createComments,
    getEventComment,
    createReply,
    getReplyComment,
    deleteComments
  } = require("../controller/event");

let router = express.Router();

router.post("/tickrtand ", getAllEvent);

// router.post("/event/comment", getEventComment);

// router.post("/event/comment/create", createComments);

// router.post("/event/reply/create", createReply);

// router.post("/event/reply", getReplyComment);

// router.post("/event/comment/delete", deleteComments);

module.exports = router;
