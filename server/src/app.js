require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("./router/auth.js"));
require("./conn");
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Listening to ", port);
});
