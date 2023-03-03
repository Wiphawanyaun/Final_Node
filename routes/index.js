var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send("Welcome To Lovely Phone Shop");
});

module.exports = router;
