const express = require('express');
const router = express.Router();
const db = require("../db");

// Get doctors by department and generate available time slots
router.get('/', async (req, res) => {
    const department = req.query.department;

    try {
        const [rows] = await db.query('SELECT * FROM doctors WHERE department = ?', [department]);

        // Convert available times to intervals and send with the doctor info
        const doctorsWithSlots = await Promise.all(rows.map(async (doctor) => {
            const availableSlots = [];
            const start = new Date(`1970-01-01T${doctor.available_from}Z`);
            const end = new Date(`1970-01-01T${doctor.available_to}Z`);
            const interval = 10; // 10 minutes interval

            for (let time = start; time < end; time.setMinutes(time.getMinutes() + interval)) {
                availableSlots.push(time.toISOString().substring(11, 16)); // Get time in HH:MM format
            }

            return { ...doctor, availableSlots };
        }));

        res.json(doctorsWithSlots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching doctors' });
    }
});

module.exports = router;
