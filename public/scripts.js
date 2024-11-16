const departmentSelect = document.getElementById("department");
const doctorSelect = document.getElementById("doctor-name");
const appointmentForm = document.getElementById("appointment-form");

// Fetch doctors when department changes
departmentSelect.addEventListener("change", async function () {
    
    const selectedDepartment = departmentSelect.value;
    const response = await fetch(`/api/doctors?department=${selectedDepartment}`);
    const doctors = await response.json();
    doctorSelect.innerHTML = '<option value="" disabled selected>Select a doctor</option>';
    
    doctors.forEach(doctor => {
        const option = document.createElement("option");
        option.value = doctor.id;
        option.textContent = doctor.name;
        doctorSelect.appendChild(option);
    });
});

// Handle form submission
appointmentForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const patientName = document.getElementById("patient-name").value;
    const doctorId = doctorSelect.value;
    const appointmentDate = document.getElementById("appointment-date").value;
    const appointmentTime = document.getElementById("appointment-time").value;

    const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorId, patientName, appointmentDate, appointmentTime }),
    });

    if (response.ok) {
        const result = await response.json();
        alert(result.message);
        appointmentForm.reset();
    } else {
        alert('Error booking appointment');
    }
});

  
  

  