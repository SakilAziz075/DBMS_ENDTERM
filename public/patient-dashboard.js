document.addEventListener("DOMContentLoaded", async () => {
  const patientName = localStorage.getItem("patientName");

  if (!patientName) {
      alert("Patient name not found. Please log in again.");
      window.location.href = "log-in-page.html";
      return;
  }

  try {
      // Fetch appointments for the patient
      const appointmentsResponse = await fetch(
          `http://localhost:3000/api/appointments/patient/${encodeURIComponent(patientName)}`
      );
      const appointments = await appointmentsResponse.json();

      // Fetch all doctors
      const doctorsResponse = await fetch("http://localhost:3000/api/appointments/doctors");
      const doctors = await doctorsResponse.json();

      // Map doctor IDs to names
      const doctorIdToName = {};
      doctors.forEach(doctor => {
          doctorIdToName[doctor.id] = doctor.name;
      });

      // Populate the dashboard
      populateAppointments(appointments, doctorIdToName);
  } catch (error) {
      console.error("Error fetching patient appointments or doctors:", error);
      alert("Unable to load appointments. Please try again later.");
  }
});

// Function to populate appointments in the dashboard
function populateAppointments(appointments, doctorIdToName) {
  const statsContainer = document.querySelector(".stats");

  // Clear previous content
  statsContainer.innerHTML = "";

  if (appointments.length === 0) {
      statsContainer.innerHTML = `
          <div class="stat">
              <h3>Upcoming Appointments</h3>
              <p>No upcoming appointments.</p>
          </div>
      `;
      return;
  }

  // Populate upcoming appointments
  const appointmentsList = appointments
      .map(app => {
          const doctorName = doctorIdToName[app.doctorID] || `Dr. ${app.doctorID}`;
          return `
              <div class="stat">
                  <h3>Appointment with ${doctorName}</h3>
                  <p>Date: ${app.appointmentDate}</p>
                  <p>Time: ${app.appointmentTime}</p>
                  <p>Guardian: ${app.guardianName || "N/A"}</p>
              </div>
          `;
      })
      .join("");

  statsContainer.innerHTML = `
      <div class="stat">
          <h3>Upcoming Appointments</h3>
          ${appointmentsList}
      </div>
  `;
}


// Logout logic
document.getElementById('logout-btn').addEventListener('click', function (event) {
  event.preventDefault();
  localStorage.removeItem('patientName'); // Clear patientName from storage
  alert('You have logged out successfully!');
  window.location.href = 'log-in-page.html'; // Redirect to login page
});
