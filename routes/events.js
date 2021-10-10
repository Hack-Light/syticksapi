const express = require("express"),
  { getAllEvent, createComments } = require("../controller/event");

let router = express.Router();

router.get("/events", getAllEvent);

router.post("/event/comment/create", createComments);

module.exports = router;
