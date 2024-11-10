require('dotenv').config();

const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const doctorsRoute = require('./routes/doctors');
const appointmentsRoute = require('./routes/appointments');
const path = require('path');
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/doctors', doctorsRoute);
app.use('/api/appointments',appointmentsRoute);

const PORT = process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
});
