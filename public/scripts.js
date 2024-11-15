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

// function selectTab(role) {
//   const idLabel = document.getElementById('id-label');
//   const tabs = document.querySelectorAll('.tab');
  
//   tabs.forEach(tab => {
//     tab.classList.remove('active');
//   });
  
//   document.getElementById(role.toLowerCase() + '-tab').classList.add('active');
  
//   if (role === 'patient') {
//     idLabel.textContent = 'Patient ID';
//   } else if (role === 'Doctor') {
//     idLabel.textContent = 'Doctor ID';
//   } else if (role === 'Admin') {
//     idLabel.textContent = 'Admin ID';
//   }
// }

function selectTab(role) {
  const idLabel = document.getElementById('id-label');
  const tabs = document.querySelectorAll('.tab');
  const avatarImg = document.getElementById('avatar-img');

  // Remove 'active' class from all tabs and add to the selected one
  tabs.forEach(tab => {
      tab.classList.remove('active');
  });
  document.getElementById(role.toLowerCase() + '-tab').classList.add('active');
  
  // Update ID label and avatar image based on selected role
  switch (role) {
      case 'Patient':
          idLabel.textContent = 'Patient ID';
          avatarImg.src = '../assests/user.png'; // Correct path to the patient avatar image
          break;
      case 'Doctor':
          idLabel.textContent = 'Doctor ID';
          avatarImg.src = './assests/doctor.png'; // Path to the doctor avatar image
          break;
      case 'Admin':
          idLabel.textContent = 'Admin ID';
          avatarImg.src = './assests/software-engineer.png'; // Path to the admin avatar image
          break;
      default:
          idLabel.textContent = 'Patient ID';
          avatarImg.src = './assests/user.png'; // Fallback to patient avatar
          break;
  }
}

  
  

  