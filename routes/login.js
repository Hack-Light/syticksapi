const express = require("express"),
  loginController = require("../controller/login");

let router = express.Router();

router.post("/user/login", loginController.loginUser);

module.exports = router;
