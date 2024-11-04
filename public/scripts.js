
const doctorsByDepartment = {
    cardiology: ["Dr. Smith", "Dr. Brown"],
    neurology: ["Dr. Green", "Dr. Black"],
    pediatrics: ["Dr. White", "Dr. Blue"],
    orthopedics: ["Dr. Red", "Dr. Yellow"],
    dermatology: ["Dr. Gray", "Dr. Pink"]
};

//this is dummy data , the data will come from the DB once 
//we make the server side backend
// i was feeling lazy so i used colors instead of names 
//thank you for watch this far.....


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
