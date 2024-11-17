const express = require('express');
const router = express.Router();
const db = require('../db');

// Get doctors by department and generate available time slots
router.get('/', async (req, res) => {
    const department = req.query.department;

    try {
        const [rows] = await db.query('SELECT * FROM doctors WHERE department = ?', [department]);

        // Generate available time slots for each doctor
        const doctorsWithSlots = rows.map(doctor => {
            const availableSlots = [];

            // Parse the start and end time from the database into integers (hours and minutes)
            const [startHour, startMinute] = doctor.available_from.split(':').map(Number);
            const [endHour, endMinute] = doctor.available_to.split(':').map(Number);

            // Create Date objects just for manipulation of minutes, ignoring the date part
            let start = new Date(1970, 0, 1, startHour, startMinute);  // Jan 1, 1970 for simplicity
            let end = new Date(1970, 0, 1, endHour, endMinute);

            // Function to format time in 12-hour AM/PM format
            function formatTime(date) {
                let hours = date.getHours();
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12;  // The hour '0' should be '12'
                return `${hours}:${minutes} ${ampm}`;
            }

            // Create a list of available time slots
            while (start < end) {
                availableSlots.push(formatTime(start));
                start.setMinutes(start.getMinutes() + 30); // Add 30 minutes slot
            }

            return {
                ...doctor,
                availableSlots,
            };
        });

        res.json(doctorsWithSlots);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Failed to fetch doctors.' });
    }
});

module.exports = router;
