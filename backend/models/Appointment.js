const mongoose = require("mongoose");
const User = require("./User"); // Import the User model

const AppointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorName: { type: String, required: false},
  appointmentType: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, default: "pending" }, // pending, confirmed, completed
  createdAt: { type: Date, default: Date.now }
});

// Middleware to fetch and set doctorName before saving
AppointmentSchema.pre("save", async function (next) {
  try {
    if (this.isNew || this.isModified("doctorId")) {
      const doctor = await User.findById(this.doctorId); // Fetch the doctor's details
      if (doctor) {
        this.doctorName = `${doctor.firstName} ${doctor.lastName}`; // Set the doctorName
      }
    }
    next();
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
