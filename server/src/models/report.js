const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  radiologistEmail: {
    type: String,
    require: true,
  },
  radiologistName: {
    type: String,
    require: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  reports: [
    {
      patientEmail: {
        type: String,
        require: true,
      },
      patientName: {
        type: String,
        require: true,
      },
      filedata: {
        data: Buffer,
        contentType: String,
      },
      report: {
        type: String,
        require: true,
      },
    },
  ],
});
const Report = new mongoose.model("Report", UserSchema);
module.exports = Report;
