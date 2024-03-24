const express = require("express");
const { signup, getSignedUser } = require("../controllers/authController");

const router = new express.Router();

router.route("/signup").post(signup);

router.route("/signed-user").get(getSignedUser);

module.exports = router;
