const express = require("express");
const router = express.Router();
const db = require("../db");

// Function to convert 12-hour time format to 24-hour format
function convertTo24HourFormat(timeStr) {
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours < 12) {
    hours += 12; // Convert PM times
  } else if (period === "AM" && hours === 12) {
    hours = 0; // Convert 12 AM to 00:xx
  }

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;
}

router.post("/", async (req, res) => {
  const { doctorID, patientName, age, guardianName, gender, appointmentTime } = req.body;

  if (!doctorID || !patientName || !age || !gender || !appointmentTime) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    // Convert the appointment time to 24-hour format
    const appointmentTime24Hour = convertTo24HourFormat(appointmentTime);

    await db.query(
      `INSERT INTO appointments (doctor_id, patient_name, age, guardian_name, gender, appointment_time) VALUES (?, ?, ?, ?, ?, ?)`,
      [doctorID, patientName, age, guardianName || null, gender, appointmentTime24Hour]
    );
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error("Error saving appointment:", error);
    res.status(500).json({ error: "Database error occurred!" });
  }
});

module.exports = router;
