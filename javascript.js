alert(`SIMULADOR DE INICIO DE SESIÓN Y COMPRA DE CURSOS CON IVA`)

let nombreUsuario = prompt ("Escribe tu nombre de usuario.")
if (nombreUsuario.toLowerCase() == ""){
    alert ("No ingresaste el nombre de usuario.")
}else{
    alert ("Nombre de usuario ingresado " + nombreUsuario)
}

let conIVA = 1.21;
let soloIVA = 0.21;
let Friends = 20;
let Succession = 30;
let From = 40;
let BreakingBad = 50;
let ComoConociAVuestraMadre = 35;
let BetterCallSaul = 55;

do{
    let producto = parseInt(prompt(`Escribe el curso que quiera de la lista:
    1. Friends.
    2. Succession.
    3. From.
    4. Breaking Bad.
    5. Cómo conocí a vuestra madre.
    6. Better Call Saul.`)
    );
    console.log (producto);

    while(producto > 6 || producto < 1 || producto == NaN) {
        alert (`Has seleccionado una opción incorrecta`);
        producto = parseInt(prompt(`Escribe el curso que quiera de la lista:
        1. Friends.
        2. Succession.
        3. From.
        4. Breaking Bad.
        5. Cómo conocí a vuestra madre.
        6. Better Call Saul.`)
        );
    }

    if(producto == 1) {
        alert (`El curso seleccionado es Friends`);
        alert (`Total de la compra:
        Curso: Friends
        Precio del curso: ${Friends}
        Impuestos sobre el curso: ${Friends * soloIVA}
        Total: ${Friends * conIVA}`);
    }else if(producto == 2) {
        alert (`El curso seleccionado es Succession`);
        alert (`Total de la compra:
        Curso: Succession
        Precio del curso: ${Succession}
        Impuestos sobre el curso: ${Succession * soloIVA}
        Total: ${Succession * conIVA}`);
    }else if(producto == 3) {
        alert (`El curso seleccionado es From`);
        alert (`Total de la compra:
        Curso: From
        Precio del curso: ${From}
        Impuestos sobre el curso: ${From * soloIVA}
        Total: ${From * conIVA}`);
    }else if(producto == 4) {
        alert (`El curso seleccionado es Breaking Bad`);
        alert (`Total de la compra:
        Curso: Breaking Bad
        Precio del curso: ${BreakingBad}
        Impuestos sobre el curso: ${BreakingBad * soloIVA}
        Total: ${BreakingBad * conIVA}`);
    }else if(producto == 5) {
        alert (`El curso seleccionado es Cómo conocí a vuestra madre`);
        alert (`Total de la compra:
        Curso: Cómo conocí a vuestra madre
        Precio del curso: ${ComoConociAVuestraMadre}
        Impuestos sobre el curso: ${ComoConociAVuestraMadre * soloIVA}
        Total: ${ComoConociAVuestraMadre * conIVA}`);
    }else if(producto == 6) {
        alert (`El curso seleccionado es Better Call Saul`);
        alert (`Total de la compra:
        Curso: Better Call Saul
        Precio del curso: ${BetterCallSaul}
        Impuestos sobre el curso: ${BetterCallSaul * soloIVA}
        Total: ${BetterCallSaul * conIVA}`);
    }
}while(confirm(`¿Quiere comprar otro curso?`));
alert (`Gracias por utilizar mi simulador de compra`)