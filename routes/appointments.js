const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { doctorID, patientName, appointmentDate, appointmentTime } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO appointments (doctor_id, patient_name, appointmentDate, appointmentTime) VALUES (?, ?, ?, ?)',
            [doctorID, patientName, appointmentDate, appointmentTime]
        );
        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error booking appointment' });
    }
});

module.exports = router;
