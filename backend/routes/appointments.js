// import express from "express";
// import Appointment from "../models/Appointment.js";

// const router = express.Router();

// // Book Appointment
// router.post("/book", async (req, res) => {
//   try {
//     const { patientId, doctorId, date, time, reason } = req.body;
//     const newAppointment = new Appointment({ patientId, doctorId, date, time, reason });

//     await newAppointment.save();
//     res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// export default router;

//-----------------------------//
// import express from "express";
// import Appointment from "../models/Appointment.js";
// import User from "../models/User.js"; // Assuming you store users (doctors & patients)

// const router = express.Router();

// router.post("/book", async (req, res) => {
//   try {
//     const { patientId, doctorName, date } = req.body;

//     // Find doctor by name
//     const doctor = await User.findOne({ fullName: doctorName, role: "doctor" });
//     if (!doctor) {
//       return res.status(404).json({ error: "Doctor not found" });
//     }

//     // Create appointment
//     const newAppointment = new Appointment({
//       patientId,
//       doctorId: doctor._id,
//       doctorName: doctor.fullName,
//       date,
//     });

//     await newAppointment.save();
//     res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
//   } catch (error) {
//     console.error("Error booking appointment:", error);
//     res.status(500).json({ error: "Failed to book appointment" });
//   }
// });

// export default router;

//--------------------------------------------//
// backend/routes/appointment.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");

// Book an appointment
router.post("/book-appointment", async (req, res) => {
  try {
    const { patientId, doctorId, appointmentType, date, time } = req.body;

    // Validate required fields
    if (!patientId || !doctorId || !appointmentType || !date || !time) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      patientId,
      doctorId,
      appointmentType,
      date,
      time,
    });

    // Save the appointment (this will trigger the pre("save") middleware)
    await newAppointment.save();

    res.status(201).json({ message: "Appointment booked successfully", newAppointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

module.exports = router;