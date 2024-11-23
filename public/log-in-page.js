document.querySelector('.submit').addEventListener('click', async function (event) {
    event.preventDefault();

    const nameInput = document.getElementById('id').value.trim(); // Use 'id' input for the full name
    const passwordInput = document.getElementById('password').value.trim();
    const selectedRole = document.querySelector('.tab.active').id;

    if (!nameInput || !passwordInput) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        if (selectedRole === 'doctor-tab') {
            const response = await fetch('http://localhost:3000/api/doctors/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ full_name: nameInput, password: passwordInput }), // Send name for login
            });

            const data = await response.json();
            if (response.status === 200) {
                alert(data.message);
                localStorage.setItem('doctorID', data.doctor.id); // Save doctor ID
                localStorage.setItem('doctorName', data.doctor.name); // Optional: Save doctor name
                window.location.href = 'doctor-dashboard.html'; // Redirect to dashboard
            } else {
                alert(data.message); // Show error message
            }
        }
    } catch (error) {
        console.error('Error during doctor login:', error);
        alert('An error occurred during login.');
    }
});


// Function to show error message
function showError(input, message) {
    let errorMessage = input.nextElementSibling;
    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
        errorMessage = document.createElement('span');
        errorMessage.classList.add('error-message');
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
    }
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Function to remove error message
function removeError(input) {
    const errorMessage = input.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.style.display = 'none';
    }
}

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
            idLabel.textContent = 'Patient Name';
            avatarImg.src = '../assests/user.png'; // Correct path to the patient avatar image
            break;
        case 'Doctor':
            idLabel.textContent = 'Doctor Name';
            avatarImg.src = './assests/doctor.png'; // Path to the doctor avatar image
            break;
  
        default:
            idLabel.textContent = 'Patient Name';
            avatarImg.src = './assests/user.png'; // Fallback to patient avatar
            break;
    }
  }
  