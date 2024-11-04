const express = require('express');
const router = express.Router();
const db = require("../db");

//get doctors by department
router.get('/', async(req, res)=>{
    const department = req.query.department;

    try{
        const[rows]= await db.query('SELECT * FROM doctors WHERE department = ?' ,[department]);
        res.json(rows);
    }

    catch(error)
    {
        console.error(error);
        res.status(500).json({message:'Error Fetching Doctors'});
    }
});

module.exports = router;