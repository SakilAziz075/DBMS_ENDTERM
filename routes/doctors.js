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
                hours = hours % 12; // Convert to 12-hour format
                hours = hours ? hours : 12; // 12:00 is 12 not 0
                return `${hours}:${minutes} ${ampm}`;
            }

            // Add 10-minute intervals
            while (start < end) {
                availableSlots.push(formatTime(start));

                // Increment by 10 minutes
                start.setMinutes(start.getMinutes() + 10);
            }

            return { ...doctor, availableSlots };
        });

        res.json(doctorsWithSlots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching doctors' });
    }
});


module.exports = router;
