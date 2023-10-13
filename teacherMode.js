let btnToggle = document.getElementById("btnToggle");
let teacherSection = document.getElementById("teacherSection");
let studentSection = document.getElementById("studentSection");

// Inicialización del estado en localStorage si no existe
if (localStorage.getItem("teacherMode") === null) {
    localStorage.setItem("teacherMode", false);
}

// Configuración inicial basada en localStorage
if (JSON.parse(localStorage.getItem("teacherMode")) == true) {
    switchToTeacherMode();
} else {
    switchToStudentMode();
}

btnToggle.addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem("teacherMode")) == false) {
        switchToTeacherMode();
        localStorage.setItem("teacherMode", true);
    } else {
        switchToStudentMode();
        localStorage.setItem("teacherMode", false);
    }
});

function switchToTeacherMode() {
    teacherSection.style.display = "block";
    studentSection.style.display = "none";
    btnToggle.innerText = "Student";
}

function switchToStudentMode() {
    teacherSection.style.display = "none";
    studentSection.style.display = "block";
    btnToggle.innerText = "Teacher";
}
