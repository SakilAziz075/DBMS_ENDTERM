const express = require('express');
const router= express.Router();
const db = require('../db');

router.post('/' , async(req,res)=>{
    const {doctorID , patientName , appointmentDate , appointmentTime } = req.body;
    
    try{
        const result = await db.query
        (
            'INSERT INTO appointments (doctor_id, patient_name , appointmentDate , appointmentTime) VALUES(?,?,?,?)',
            [doctorID, patientName , appointmentDate , appointmentTime]);
            res.status(201).json({message:'appointment Booked sucessfully'});
    }

    catch(error)
    {
        console.error(error);
        res.status(500).json({message: 'Error booking appointment'});
    }
});

// Fetch all appointments for a specific doctor
// Fetch all appointments for a specific doctor
router.get('/doctor/:doctorID', async (req, res) => {
    const { doctorID } = req.params;

    try {
        const [rows] = await db.query(
            'SELECT patient_name AS patientName, appointmentDate AS date, appointmentTime AS time, "Confirmed" AS status FROM appointments WHERE doctor_id = ? ORDER BY appointmentDate, appointmentTime',
            [doctorID]
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching appointments' });
    }
});


module.exports = router;
