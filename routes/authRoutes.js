const express = require("express");
const { signup } = require("../controllers/authController");

const router = new express.Router();

router.route("/signup").post(signup);

module.exports = router;
