document.addEventListener('DOMContentLoaded', async () => {
  const doctorID = localStorage.getItem('doctorID'); // Get the doctor ID from localStorage

  if (!doctorID) {
      alert('Doctor ID not found. Please log in again.');
      window.location.href = 'log-in.html'; // Redirect to login page
      return;
  }

  try {
      const response = await fetch(`http://localhost:3000/api/appointments/doctor/${doctorID}`);
      if (!response.ok) {
          throw new Error('Failed to fetch appointments');
      }

      const appointments = await response.json();
      populateAppointments(appointments);
  } catch (error) {
      console.error('Error fetching appointments:', error);
      alert('Unable to load appointments. Please try again later.');
  }
});

// Function to populate appointments in the UI
function populateAppointments(appointments) {
  const appointmentsContainer = document.querySelector('.appointments-table tbody');
  appointmentsContainer.innerHTML = ''; // Clear previous data

  if (appointments.length === 0) {
    appointmentsContainer.innerHTML = '<tr><td colspan="6">No appointments found.</td></tr>';
    return;
  }

  appointments.forEach((appointment) => {
    const row = document.createElement('tr');
    
    // Dynamically create table rows with the appointment details
    row.innerHTML = `
      <td>${appointment.patientName}</td>
      <td>${appointment.age}</td>
      <td>${appointment.guardianName || 'N/A'}</td>
      <td>${appointment.gender}</td>
      <td>${appointment.appointmentDate || 'TBD'}</td>
      <td>${appointment.appointmentTime}</td>
    `;
    
    appointmentsContainer.appendChild(row); // Add the row to the table body
  });
}



// Handle logout functionality
document.getElementById('logout-btn').addEventListener('click', function (event) {
  event.preventDefault();
  localStorage.removeItem('doctorID'); // Clear doctorID from storage
  alert('You have logged out successfully!');
  window.location.href = 'log-in-page.html'; // Redirect to login page
});
