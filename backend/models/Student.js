const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  registerNumber: String,
  department: String,
  phoneNumber: String,
  fatherName: String,
  motherName: String,
  contactNumber: String,
  address: String,
  tenthMark: Number,
  twelfthMark: Number,
  regulation: String,
  className: String,
  cgpa: Number,
  semester: Number,
});

module.exports = mongoose.model("Student", studentSchema);
