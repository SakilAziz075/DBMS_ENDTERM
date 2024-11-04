
const doctorsByDepartment = {
    cardiology: ["Dr. Smith", "Dr. Brown"],
    neurology: ["Dr. Green", "Dr. Black"],
    pediatrics: ["Dr. White", "Dr. Blue"],
    orthopedics: ["Dr. Red", "Dr. Yellow"],
    dermatology: ["Dr. Gray", "Dr. Pink"]
};

const departmentSelect = document.getElementById("department");
const doctorSelect = document.getElementById("doctor-name");

departmentSelect.addEventListener("change", function() {
    const selectedDepartment = departmentSelect.value;
    const doctors = doctorsByDepartment[selectedDepartment];

    // Clear previous options
    doctorSelect.innerHTML = '<option value="" disabled selected>Select a doctor</option>';

    // Populate doctors based on the selected department
    doctors.forEach(doctor => {
        const option = document.createElement("option");
        option.value = doctor;
        option.textContent = doctor;
        doctorSelect.appendChild(option);
    });
});
