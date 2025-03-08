import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// Book Appointment
router.post("/book", async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;
    const newAppointment = new Appointment({ patientId, doctorId, date, time, reason });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;