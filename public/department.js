async function fetchDoctors(department) {
    try {
        const response = await fetch(`http://localhost:3000/api/doctors?department=${department}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const doctors = await response.json();
        const doctorsContainer = document.getElementById("doctors");
        doctorsContainer.innerHTML = "";

        if (doctors.length > 0) {
            doctors.forEach((doctor) => {
                const doctorCard = document.createElement("div");
                doctorCard.classList.add("doctor-card");
                doctorCard.innerHTML = `
                    <h3>${doctor.name}</h3>
                    <p>Department: ${doctor.department}</p>
                    <p>Experience: ${doctor.experience || 0} years</p>
                    <button type="button" onclick="openAppointmentForm('${doctor.id}', '${doctor.name}', '${encodeURIComponent(JSON.stringify(doctor.availableSlots))}')">Book Appointment</button>
                `;
                doctorsContainer.appendChild(doctorCard);
            });
        } else {
            doctorsContainer.innerHTML = "<p>No doctors found for this department.</p>";
        }
    } catch (error) {
        console.error("Error fetching doctors:", error);
        document.getElementById("doctors").innerHTML = "<p>Error fetching doctors.</p>";
    }
}

function openAppointmentForm(doctorID, doctorName, slotsJSON) {
    document.getElementById('appointmentForm').style.display = 'block';
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('selectedDoctor').textContent = doctorName;
    document.getElementById('doctorID').value = doctorID;

    const availableSlots = JSON.parse(decodeURIComponent(slotsJSON));
    populateTimeSlots(availableSlots);
}

function populateTimeSlots(availableSlots) {
    const timeSlotsContainer = document.getElementById('timeSlots');
    timeSlotsContainer.innerHTML = '';
    if (availableSlots.length === 0) {
        timeSlotsContainer.innerHTML = '<p>No available slots.</p>';
        return;
    }

    availableSlots.forEach(slot => {
        const slotButton = document.createElement('button');
        slotButton.type = 'button';
        slotButton.textContent = slot;
        slotButton.className = 'time-slot-btn';
        slotButton.onclick = () => selectTimeSlot(slot);
        timeSlotsContainer.appendChild(slotButton);
    });
}

function selectTimeSlot(slot) {
    const selectedSlotInput = document.getElementById('appointmentTime');
    selectedSlotInput.value = slot;

    document.querySelectorAll('.time-slot-btn').forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
}

function closeAppointmentForm() {
    document.getElementById('appointmentForm').style.display = 'none';
    document.getElementById('modalOverlay').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const department = params.get("department");
    document.getElementById("departmentName").textContent = department;
    fetchDoctors(department);
});

// Handle form submission via JavaScript
document.getElementById("appointmentFormSubmit").addEventListener("submit", async function (e) {
    e.preventDefault();  // Prevent default form submission

    const formData = new FormData(this);  // Collect form data
    const data = Object.fromEntries(formData.entries());  // Convert FormData to plain object

    try {
        const response = await fetch("http://localhost:3000/api/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // Ensure sending JSON data
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log(result);  // Log success message from the server
        alert(result.message);  // Notify user of success
        closeAppointmentForm();  // Close the modal form
    } catch (error) {
        console.error("Error submitting appointment:", error);
        alert("Error submitting appointment.");
    }
});
