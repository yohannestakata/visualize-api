const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

module.exports = app;
