const express = require("express");
const router = express.Router();
const registerController = require("../controller/registercontroller");
var cors = require("cors");

router.use(cors());

router.post("/createUser", registerController.createUser);

router.get("/test", (req, res) => {
  res.json({ message: "Register route working" });
});

module.exports = router;
