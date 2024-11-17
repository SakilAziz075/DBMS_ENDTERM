document.addEventListener('DOMContentLoaded', () => {
  const doctorID = localStorage.getItem('doctorID');
  if (!doctorID) {
      alert('Doctor not logged in! Redirecting to login page.');
      window.location.href = 'log-in-page.html';
      return;
  }

  fetchAppointments(doctorID);
});

async function fetchAppointments(doctorID) {
  try {
      const response = await fetch(`http://localhost:3000/api/appointments/doctor/${doctorID}`);
      if (!response.ok) {
          throw new Error('Failed to fetch appointments');
      }

      const appointmentsData = await response.json();
      populateAppointments(appointmentsData);
  } catch (error) {
      console.error('Error fetching appointments:', error);
      alert('Unable to load appointments. Please try again later.');
  }
}


function populateAppointments(appointments) {
  const tbody = document.querySelector('.appointments-table tbody');
  tbody.innerHTML = ''; // Clear previous data

  if (appointments.length === 0) {
      const noDataRow = document.createElement('tr');
      noDataRow.innerHTML = `<td colspan="4">No upcoming appointments.</td>`;
      tbody.appendChild(noDataRow);
      return;
  }

  appointments.forEach(appointment => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${appointment.patientName}</td>
          <td>${appointment.date}</td>
          <td>${appointment.time}</td>
          <td>${appointment.status}</td>
      `;
      tbody.appendChild(row);
  });
}

// Handle logout functionality
document.getElementById('logout-btn').addEventListener('click', function (event) {
  event.preventDefault();
  localStorage.removeItem('doctorID'); // Clear doctorID from storage
  alert('You have logged out successfully!');
  window.location.href = 'log-in-page.html'; // Redirect to login page
});
