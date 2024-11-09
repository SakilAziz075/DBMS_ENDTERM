document.getElementById("search-btn").addEventListener("click", async function() {
    const query = document.getElementById("search-query").value;

    if (query.trim()) {
        const response = await fetch(`/api/doctors?search=${query}`);
        const doctors = await response.json();
        
        const doctorList = document.getElementById("doctor-list");
        doctorList.innerHTML = ""; // Clear any previous results

        doctors.forEach(doctor => {
            const doctorItem = document.createElement("li");
            doctorItem.textContent = `${doctor.name} - ${doctor.department}`;
            doctorList.appendChild(doctorItem);
        });

        if (doctors.length === 0) {
            doctorList.innerHTML = "<li>No doctors found</li>";
        }
    }
});
