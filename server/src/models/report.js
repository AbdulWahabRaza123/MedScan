const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
patientEmail:{
    type: String,
    require:true,
},
radiologistEmail:{
  type: String,
  require:true,
},
 filedata: {
    data: Buffer,
    contentType: String,
  },
  report:{
    type: String,
    require:true,
  }
 
});
const Report = new mongoose.model("Report", UserSchema);
module.exports = Report;