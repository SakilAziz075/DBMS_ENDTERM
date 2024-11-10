const express = require('express');
const router = express.Router();
const db = require('../db');

// Admin Login Route
router.post('/login', async (req, res) => {
    const { user_id, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM admin WHERE user_id = ? AND password = ?', [user_id, password]);
        
        if (rows.length > 0) {
            res.status(200).json({ message: 'Login successful', admin: rows[0] });
        } else {
            res.status(401).json({ message: 'Invalid user ID or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
});


// Add Doctor
router.post('/add-doctor', async (req, res) => {
    const { doctor_name, department, specialization } = req.body;

    console.log('Received doctor details:', doctor_name, department, specialization);  // Log the input data

    const query = 'INSERT INTO doctors (name, department, specialization) VALUES (?, ?, ?)';

    try {
        await db.query(query, [doctor_name, department, specialization]);
        res.status(201).json({ message: 'Doctor added successfully' });
    } catch (error) {
        console.error('Error adding doctor:', error);
        res.status(500).json({ message: 'Error adding doctor', error: error.message });
    }
});


// Delete Doctor
router.delete('/delete-doctor', async (req, res) => {
    const { doctor_id } = req.body;

    const query = 'DELETE FROM doctors WHERE id = ?';

    try {
        const [result] = await db.query(query, [doctor_id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Doctor deleted successfully' });
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        console.error('Error deleting doctor:', error);  // Log the error message
        res.status(500).json({ message: 'Error deleting doctor', error: error.message });
    }
});

module.exports = router;
