var express = require('express');
var router = express.Router();
const registerController = require("../controller/registercontroller");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/createUser", registerController.createUser);

module.exports = router;
