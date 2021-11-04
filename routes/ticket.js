const express = require("express"),
  {
    checkTicket,
    buyTicket
    /*  getAllEvent,
    createComments,
    getEventComment,
    createReply, */
    // getReplyComment,
    // deleteComments
  } = require("../controller/tickets");

let router = express.Router();

router.post("/ticket/enquire", checkTicket);

router.post("/ticket/create", buyTicket);

module.exports = router;
