const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const router = express.Router();
const { json } = express();
router.get("/hello", (req, res) => {
  res.send("Hello Server");
});
module.exports = router;
