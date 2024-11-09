// Add Doctor Form Submission
document.getElementById('add-doctor-form').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent the default form submission

    const doctorName = document.getElementById('doctor-name').value;
    const department = document.getElementById('department').value;
    const specialization = document.getElementById('specialization').value;

    // Sending a POST request to add a doctor
    const response = await fetch('/api/admin/add-doctor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            doctor_name: doctorName,
            department: department,
            specialization: specialization
        })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Doctor added successfully');
        document.getElementById('add-doctor-form').reset();  // Reset form after success
    } else {
        alert(`Error: ${data.message}`);
    }
});

// Delete Doctor Form Submission
document.getElementById('delete-doctor-form').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent the default form submission

    const doctorId = document.getElementById('doctor-id').value;

    // Sending a DELETE request to delete a doctor
    const response = await fetch('/api/admin/delete-doctor', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            doctor_id: doctorId
        })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Doctor deleted successfully');
        document.getElementById('delete-doctor-form').reset();  // Reset form after success
    } else {
        alert(`Error: ${data.message}`);
    }
});
