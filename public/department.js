async function fetchDoctors(department) {
    try {
        const response = await fetch(`http://localhost:3000/api/doctors?department=${department}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const doctors = await response.json();

        const doctorsContainer = document.getElementById('doctors');
        doctorsContainer.innerHTML = '';

        if (doctors.length > 0) {
            doctors.forEach(doctor => {
                const doctorCard = document.createElement('div');
                doctorCard.classList.add('doctor-card');
                doctorCard.innerHTML = `
                    <h3>${doctor.name}</h3>
                    <p>Department: ${doctor.department}</p>
                    <p>Experience: ${doctor.experience} years</p>
                    <button onclick="openAppointmentForm('${doctor.id}', '${doctor.name}', '${JSON.stringify(doctor.availableSlots)}')">Book Appointment</button>
                `;
                doctorsContainer.appendChild(doctorCard);
            });
        } else {
            doctorsContainer.innerHTML = '<p>No doctors found for this department.</p>';
        }
    } catch (error) {
        console.error('Error fetching doctors:', error);
        document.getElementById('doctors').innerHTML = '<p>Error fetching doctors.</p>';
    }
}

function openAppointmentForm(doctorID, doctorName, slotsJSON) {
    document.getElementById('appointmentForm').style.display = 'block';
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('selectedDoctor').textContent = doctorName;
    document.getElementById('doctorID').value = doctorID; // Populate hidden input for doctor ID

    const availableSlots = JSON.parse(slotsJSON);
    populateTimeSlots(availableSlots); // Pass available slots to populate function
}

function populateTimeSlots(availableSlots) {
    const timeSlotsContainer = document.getElementById('timeSlots');
    timeSlotsContainer.innerHTML = ''; // Clear any existing slots

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

    // Highlight the selected button
    document.querySelectorAll('.time-slot-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    event.target.classList.add('selected');
}
