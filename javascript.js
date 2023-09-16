alert(`SIMULADOR DE INICIO DE SESIÓN Y COMPRA DE CURSOS CON IVA`);

const conIVA = 1.21;
const soloIVA = 0.21;

//Array de los cursos
const cursos = [
    { id: 1, nombre: "Friends", idioma: "Inglés", precio: 20 },
    { id: 2, nombre: "Succession", idioma: "Inglés", precio: 30 },
    { id: 3, nombre: "From", idioma: "Inglés", precio: 40 },
    { id: 4, nombre: "Breaking Bad", idioma: "Inglés", precio: 50 },
    { id: 5, nombre: "Cómo conocí a vuestra madre", idioma: "Inglés", precio: 35 },
    { id: 6, nombre: "Better Call Saul", idioma: "Inglés", precio: 55 }
];

//Funciones
function calcularTotalConIVA(precio) {
    return precio * conIVA;
}

function mostrarDetallesCompra(curso) {
    alert(`El curso seleccionado es ${curso.nombre} (Idioma: ${curso.idioma})`);
    alert(`Total de la compra:
    Curso: ${curso.nombre}
    Precio del curso: ${curso.precio}
    Impuestos sobre el curso: ${curso.precio * soloIVA}
    Total: ${calcularTotalConIVA(curso.precio)}`);
}

function buscarCursos(nombre) {
    return cursos.filter(curso => curso.nombre.toLowerCase().includes(nombre.toLowerCase()));
}

//Introducir usuario
let nombreUsuario = prompt("Escribe tu nombre de usuario.");
if (nombreUsuario.toLowerCase() === "") {
    alert("No ingresaste el nombre de usuario.");
} else {
    alert("Nombre de usuario ingresado " + nombreUsuario);
}

//Primera elección: añadir o seleccionar
let continuar = true;

while (continuar) {
    let eleccion = prompt(`¿Qué deseas hacer?
    1. Añadir un nuevo curso.
    2. Seleccionar un curso existente.`);
//añadir
    if (eleccion == "1") {
        let nuevoCurso = {};
        nuevoCurso.nombre = prompt("Introduce el nombre del nuevo curso:");
        nuevoCurso.idioma = prompt("Introduce el idioma del curso:");
        nuevoCurso.precio = parseFloat(prompt("Introduce el precio del curso:"));
        nuevoCurso.id = cursos.length + 1;  // Asignamos un nuevo ID al curso
        cursos.push(nuevoCurso);
        alert("Curso añadido con éxito!");
//seleccionar
//Segunda elección: elegir o buscar
    } else if (eleccion == "2") {
        let accion = prompt(`¿Cómo deseas seleccionar tu curso?
        1. Elegir de la lista.
        2. Buscar por nombre.`);
//elegir
        if (accion == "1") {
            let producto = parseInt(
                prompt(`Escribe el número del curso que quieras de la lista:
            ${cursos.map(curso => curso.id + ". " + curso.nombre).join("\n")}`)
            );

            while (!producto || producto > cursos.length || producto < 1) {
                alert(`Has seleccionado una opción incorrecta`);
                producto = parseInt(
                    prompt(`Escribe el número del curso que quieras de la lista:
                ${cursos.map(curso => curso.id + ". " + curso.nombre).join("\n")}`)
                );
            }

            const cursoSeleccionado = cursos.find(curso => curso.id === producto);
            mostrarDetallesCompra(cursoSeleccionado);
//buscar
        } else if (accion == "2") {
            const nombreBusqueda = prompt("Introduce el nombre del curso para buscar:");
            const cursosEncontrados = buscarCursos(nombreBusqueda);

            if (cursosEncontrados.length) {
                let cursoElegido = cursosEncontrados[0];
                if (cursosEncontrados.length > 1) {
                    let indice = parseInt(
                        prompt(`Se encontraron varios cursos. Elige uno:
                    ${cursosEncontrados.map((curso, index) => (index + 1) + ". " + curso.nombre).join("\n")}`)
                    );
                    cursoElegido = cursosEncontrados[indice - 1];
                }
                mostrarDetallesCompra(cursoElegido);
            } else {
                alert(`No se encontraron cursos con el nombre "${nombreBusqueda}"`);
            }
        }
    }

    continuar = confirm(`¿Deseas hacer otra acción?`);
}

alert(`Gracias por utilizar mi simulador de compra`);
