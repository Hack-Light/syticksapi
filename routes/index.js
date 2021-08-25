let express = require("express");
let router = express.Router();


/* GET home page. */
router.get("/", async (req, res, next) => {
 
  res.json( {message : "Syticks API"});
});

module.exports = router;
