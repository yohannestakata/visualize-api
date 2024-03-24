const express = require("express");
const catchAsync = require("../utils/catchAsync");

const router = new express.Router();

router.route("/:id").get(
  catchAsync(async (req, res) => {
    console.log("hello");
  })
);

module.exports = router;
