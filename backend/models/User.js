const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  knownAllergies: { type: String, required: false },
  currentMedication: { type: String, required: false },
  medicalConditions: { type: String, required: false },
  emergencyContactName: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  password: { type: String, required: true },
  // role: { type: String, required: true, enum: ["patient", "doctor", "admin"] }, // Ensure role is required
  agreeTos: { type: Boolean, required: true },  // Made optional
  agreePrivacy: { type: Boolean, required: true } // Made optional
});

const User = mongoose.model("User", UserSchema);

module.exports = User;