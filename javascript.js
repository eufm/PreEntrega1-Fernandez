alert(`SIMULADOR DE INICIO DE SESIÓN Y COMPRA DE CURSOS CON IVA`)

let nombreUsuario = prompt ("Escribe tu nombre de usuario.")
if (nombreUsuario.toLowerCase() == ""){
    alert ("No ingresaste el nombre de usuario.")
} else {
    alert ("Nombre de usuario ingresado " + nombreUsuario)
}

//let producto2 = "hi-fi rush"
//let producto1 = "friends season 1"

let producto1 = parseInt(prompt("Escribe el curso."))
if (producto1.toLowerCase() == "friends season 1"){
    console.log(`El curso que has seleccionado es Friends Season 1`)
}else{
    console.log(`El producto que has seleccionado no es correcto, sino que es ${producto1}`)
}

//let precio = 12
//let precio2 = 6

let precio = parseInt(prompt("Escriba el precio."))
if(precio >= 10) {
    console.log('El curso tiene un 10% de descuento.')
}else if(precio >=8){
    alert("El curso tiene un 5% de descuento.")
}else{
    console.log(`El curso no tiene descuento porque su precio es menor a 10 euros.`)
}

let descuento10 = precio >=10
console.log(descuento10)
if(descuento10){
    console.log (`El descuento se aplica.`)
}else{
    console.log(`El descuento no se aplica.`)
}
