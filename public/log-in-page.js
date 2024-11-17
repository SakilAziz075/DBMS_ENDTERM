document.querySelector('.submit').addEventListener('click', function(event) {
    const idInput = document.getElementById('id');
    const passwordInput = document.getElementById('password');
    let formIsValid = true;

    // Check if fields are empty
    if (!idInput.value) {
        formIsValid = false;
        showError(idInput, 'Please enter your ID');
    } else {
        removeError(idInput);
    }

    if (!passwordInput.value) {
        formIsValid = false;
        showError(passwordInput, 'Please enter your password');
    } else {
        removeError(passwordInput);
    }

    // If form is valid, proceed with redirect
    if (formIsValid) {
        // Get the selected role (Patient or Doctor)
        const selectedRole = document.querySelector('.tab.active').id;

        if (selectedRole === 'patient-tab') {
            window.location.href = 'patient-dashboard.html'; // Redirect to patient dashboard
        }else if (selectedRole === 'doctor-tab') {
            // Simulate storing doctorID (replace with actual ID from the server response)
            const doctorID = idInput.value;
            localStorage.setItem('doctorID', doctorID);
            window.location.href = 'doctor-dashboard.html'; // Redirect to doctor dashboard
        }
        
    }

    // Prevent form submission if validation fails
    if (!formIsValid) {
        event.preventDefault(); // Prevent form submission
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
            idLabel.textContent = 'Patient ID';
            avatarImg.src = '../assests/user.png'; // Correct path to the patient avatar image
            break;
        case 'Doctor':
            idLabel.textContent = 'Doctor ID';
            avatarImg.src = './assests/doctor.png'; // Path to the doctor avatar image
            break;
  
        default:
            idLabel.textContent = 'Patient ID';
            avatarImg.src = './assests/user.png'; // Fallback to patient avatar
            break;
    }
  }
  