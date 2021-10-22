const express = require("express"),
  {
    buyTicket
    /*  getAllEvent,
    createComments,
    getEventComment,
    createReply, */
    // getReplyComment,
    // deleteComments
  } = require("../controller/ticket");

let router = express.Router();

router.post("/ticket/enquire", buyTicket);

// router.post("/event/comment", getEventComment);

// router.post("/event/comment/create", createComments);

// router.post("/event/reply/create", createReply);

// router.post("/event/reply", getReplyComment);

// router.post("/event/comment/delete", deleteComments);

module.exports = router;
