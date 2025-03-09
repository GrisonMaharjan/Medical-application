import dbConnect from "@/utils/dbConnect";
import Appointment from "@/models/Appointment";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { patientId } = req.query;
      console.log("Received request for patientId:", patientId);

      if (!patientId) {
        return res.status(400).json({ error: "Missing patientId" });
      }

      const appointments = await Appointment.find({ patientId }).sort({ date: 1 }).limit(1);
      console.log("Fetched Appointments:", appointments);

      if (!appointments.length) {
        return res.status(404).json({ error: "No appointments found" });
      }

      return res.status(200).json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return res.status(500).json({ error: "Failed to fetch appointments" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
