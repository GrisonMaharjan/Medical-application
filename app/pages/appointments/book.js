import { useState } from "react";

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    patientId: "PATIENT_ID_HERE",
    doctorId: "DOCTOR_ID_HERE",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/appointments/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input type="date" name="date" onChange={handleChange} required />
      <input type="time" name="time" onChange={handleChange} required />
      <input type="text" name="reason" placeholder="Reason" onChange={handleChange} required />
      <button type="submit">Book Appointment</button>
    </form>
  );
}
