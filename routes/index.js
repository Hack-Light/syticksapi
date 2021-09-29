let express = require("express");
let router = express.Router();
let { getAdvert } = require("../controller/index");

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.json({ message: "Syticks API" });
});

router.get("/slideshow", getAdvert);

module.exports = router;
