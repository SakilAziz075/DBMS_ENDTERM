// Sample data for appointments (This would typically be fetched from a server)
const appointmentsData = [
  {
    patientName: 'John Doe',
    date: '2024-11-20',
    time: '10:00 AM',
    status: 'Confirmed'
  },
  {
    patientName: 'Alice Smith',
    date: '2024-11-22',
    time: '2:00 PM',
    status: 'Pending'
  },
  {
    patientName: 'Bob Johnson',
    date: '2024-11-23',
    time: '11:30 AM',
    status: 'Confirmed'
  }
];

// Function to populate the appointments table
function loadAppointments() {
  const tbody = document.querySelector('.appointments-table tbody');
  tbody.innerHTML = ''; // Clear any previous data

  appointmentsData.forEach(appointment => {
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

// Call the function to load appointments on page load
loadAppointments();

// Handle logout functionality
document.getElementById('logout-btn').addEventListener('click', function(event) {
  event.preventDefault();
  // You can add logout logic here (e.g., clearing sessionStorage or localStorage)
  alert('You have logged out successfully!');
  // Redirect to login page after logout
  window.location.href = 'log-in-page.html';
});
