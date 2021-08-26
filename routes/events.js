const express = require("express"),
  { getAllEvent } = require("../controller/event");

let router = express.Router();

router.get("/events", getAllEvent);

module.exports = router;
