alert(`SIMULADOR DE INICIO DE SESIÓN Y COMPRA DE CURSOS CON IVA`);

let nombreUsuario = prompt("Escribe tu nombre de usuario.");
if (nombreUsuario.toLowerCase() == "") {
    alert("No ingresaste el nombre de usuario.");
} else {
    alert("Nombre de usuario ingresado " + nombreUsuario);
}

const conIVA = 1.21;
const soloIVA = 0.21;
const Friends = 20;
const Succession = 30;
const From = 40;
const BreakingBad = 50;
const ComoConociAVuestraMadre = 35;
const BetterCallSaul = 55;

// Función para calcular el total con IVA
function calcularTotalConIVA(precio) {
    return precio * conIVA;
}

// Función para mostrar los detalles de la compra
function mostrarDetallesCompra(curso, precio) {
    alert(`El curso seleccionado es ${curso}`);
    alert(`Total de la compra:
    Curso: ${curso}
    Precio del curso: ${precio}
    Impuestos sobre el curso: ${precio * soloIVA}
    Total: ${calcularTotalConIVA(precio)}`);
}

do {
    let producto = parseInt(
        prompt(`Escribe el curso que quiera de la lista:
    1. Friends.
    2. Succession.
    3. From.
    4. Breaking Bad.
    5. Cómo conocí a vuestra madre.
    6. Better Call Saul.`)
    );

    while (producto > 6 || producto < 1 || isNaN(producto)) {
        alert(`Has seleccionado una opción incorrecta`);
        producto = parseInt(
            prompt(`Escribe el curso que quiera de la lista:
        1. Friends.
        2. Succession.
        3. From.
        4. Breaking Bad.
        5. Cómo conocí a vuestra madre.
        6. Better Call Saul.`)
        );
    }

    switch (producto) {
        case 1:
            mostrarDetallesCompra("Friends", Friends);
            break;
        case 2:
            mostrarDetallesCompra("Succession", Succession);
            break;
        case 3:
            mostrarDetallesCompra("From", From);
            break;
        case 4:
            mostrarDetallesCompra("Breaking Bad", BreakingBad);
            break;
        case 5:
            mostrarDetallesCompra("Cómo conocí a vuestra madre", ComoConociAVuestraMadre);
            break;
        case 6:
            mostrarDetallesCompra("Better Call Saul", BetterCallSaul);
            break;
    }
} while (confirm(`¿Quiere comprar otro curso?`));
alert(`Gracias por utilizar mi simulador de compra`);