require("dotenv").config();
const express = require("express");
const path=require('path');
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("./router/auth"));
// app.use(express.static(path.join(__dirname, "../../client/out")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../client/out/index.html"));
// });
require("./conn");
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Listening to ", port);
});
