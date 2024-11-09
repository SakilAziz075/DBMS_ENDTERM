const express = require('express');
const app = express();
const doctorsRoute = require('./routes/doctors');
const appointmentsRoute = require('./routes/appointments');
const adminRoute = require('./routes/admin'); // Import the admin route
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/doctors', doctorsRoute);
app.use('/api/appointments', appointmentsRoute);
app.use('/api/admin', adminRoute); // Use the admin routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
