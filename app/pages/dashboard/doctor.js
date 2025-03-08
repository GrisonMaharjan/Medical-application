import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const doctorId = "DOCTOR_ID_HERE";

  useEffect(() => {
    fetch(`/api/appointments/doctor/${doctorId}`)
      .then((res) => res.json())
      .then(setAppointments);

    socket.on(`notifyDoctor_${doctorId}`, (appointment) => {
      alert(`New appointment booked!`);
      setAppointments((prev) => [...prev, appointment]);
    });

    return () => {
      socket.off(`notifyDoctor_${doctorId}`);
    };
  }, []);

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>
            {appt.date} - {appt.time} (Patient: {appt.patientId.name})
          </li>
        ))}
      </ul>
    </div>
  );
}
