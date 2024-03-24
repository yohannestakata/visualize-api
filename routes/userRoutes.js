const express = require("express");
const catchAsync = require("../utils/catchAsync");
const { getUser } = require("../controllers/userController");

const router = new express.Router();

router.route("/:id").get(getUser);

module.exports = router;
