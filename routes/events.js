const express = require("express"),
  {
    getAllEvent,
    createComments,
    getEventComment,
    createReply,
    getReplyComment
  } = require("../controller/event");

let router = express.Router();

router.get("/events", getAllEvent);

router.post("/event/comment", getEventComment);

router.post("/event/comment/create", createComments);

router.post("/event/reply/create", createReply);

router.post("/event/reply", getReplyComment);

module.exports = router;
