const express = require("express"),
  registerController = require("../controller/register");

let router = express.Router();

router.post("/user/register", registerController.registerUser);

module.exports = router;
