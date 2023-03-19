const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
patientEmail:{
    type: String,
    require:true,
},
filename: {
    type: String,
    require:true,
},
 filedata: {
    data: Buffer,
    contentType: String,
  },
 
});
const Report = new mongoose.model("Report", UserSchema);
module.exports = Report;