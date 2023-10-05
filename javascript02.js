//dictionaryOffline
let vocabulario = [];
let indiceActual = 0;

const dicOffline = [
    {
        id: 1,
        name: 'Tree', 
        translation: "árbol",
        type: "noun",
        phonetics: "/tri:/",
        definition: "A tall plant that has a wooden trunk and branches that grow from its upper part.",
        example: "We sat under a tree for shade."
    },

    {
        id: 2,
        name: 'House',
        translation: "casa",
        type: "noun",
        phonetics: "/haʊs/",
        definition: "A building that people, usually one family, live in.",
        example: "She lives in a little house in Cross Street."
    },

    {
        id: 3,
        name:'Pen',
        translation: "bolígrafo",
        type: "noun",
        phonetics: "/pen/",
        definition: "A long, thin object used for writing or drawing with ink.",
        example: "My pen seems to be running out of ink - I need a refill."
    },

    {
        id: 4,
        name:'Happy',
        translation: "feliz",
        type: "adjective",
        phonetics: "/'hæp.i/",
        definition: "Feeling, showing, or causing pleasure or satisfaction.",
        example: "She looks so happy."
    },

    {
        id: 5,
        name: 'Speak',
        translation: "hablar",
        type: "verb",
        phonetics: "/spi:k/",
        definition: "To say words, to use the voice, or to have a conversation with someone.",
        example: "Would you mind speaking more slowly, please?"
    }
];

//dictionaryOnline
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url} ${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0]. definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't find the word</h3>`;
        });
});

//tools
function iniciarPractica() {
    const entrada = document.getElementById('vocabulario').value;
    vocabulario = entrada.split('\n').map(item => {
        const [palabra, traduccion] = item.split(' - ').map(elemento => elemento.trim());
        return {palabra, traduccion};
    });

    indiceActual = 0;
    mostrarSiguientePalabra();
}

function mostrarSiguientePalabra() {
    if (indiceActual >= vocabulario.length) {
        alert('¡Práctica terminada!');
        return;
    }

    document.getElementById('practica').style.display = 'block';
    document.getElementById('palabraActual').innerText = vocabulario[indiceActual].palabra;
}

function verificarTraduccion() {
    const traduccionIngresada = document.getElementById('traduccionInput').value.trim();
    const boton = document.querySelector('button[onclick="verificarTraduccion()"]');

    if (traduccionIngresada === vocabulario[indiceActual].traduccion) {
        boton.classList.add('acierto');
        setTimeout(() => {
            boton.classList.remove('acierto');
            indiceActual++;
            mostrarSiguientePalabra();
        }, 1000);  // Espera 1 segundo antes de pasar a la siguiente palabra
    } else {
        boton.classList.remove('acierto');
        document.getElementById('feedback').innerText = `Incorrecto. La respuesta correcta es: ${vocabulario[indiceActual].traduccion}`;
        setTimeout(() => {
            document.getElementById('feedback').innerText = '';
            mostrarSiguientePalabra();
        }, 3000);  // 3 segundos para mostrar la respuesta correcta
    }
}

document.getElementById('traduccionInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        verificarTraduccion();
    }
});

    //CURSOS
//Array de los cursos
const conIVA = 1.21;
const soloIVA = 0.21;

class course{
    constructor(id, titulo, idioma, precio, imagen){
        this.id = id,
        this.titulo = titulo,
        this.idioma = idioma,
        this.precio = precio,
        this.imagen = imagen
    }
    mostrarInfoCourse(){
        console.log(`El curso se llama ${this.titulo}, el idioma es ${this.idioma} y su precio es ${this.precio}`)
    }
    exponerEnCatalogo(){
        console.log(this.id, this.titulo, this.precio)
    }
}

//Objetos
const course1 = new course(1, "Friends", "Inglés", 20, "friends.jpg")

const course2 = new course(2, "Succession", "Inglés", 30, "succession.jpg")

const course3 = new course(3, "From", "Inglés", 40, "from.jpg")

const course4 = new course(4, "Breaking Bad", "Inglés", 50, "breakingbad.jpg")

const course5 = new course(5, "Cómo conocí a vuestra madre", "Inglés", 35, "comoconociavuestramadre.jpg")

const course6 = new course(6, "Better Call Saul", "Inglés", 55, "bettercallsaul.jpg")

//array de objetos:
let estanteria = [course1,course2,course3,course4,course5,course6]

//CAPTURA DOM
let containerCourses = document.getElementById("index-courses-content")
let selectOrder = document.getElementById("selectOrder")
let searcher = document.getElementById("searcher")
let resultsDiv = document.getElementById("results")
let botonOrdenarMayorMenor = document.getElementById("botonOrdenarMayorMenor");
let botonOrdenarMenorMayor = document.getElementById("botonOrdenarMenorMayor");
let botonOrdenarAlfTitulo = document.getElementById("botonOrdenarAlfTitulo");

//Funciones
function mostrarCatalogoDOM(array){
    containerCourses.innerHTML = ""
    for(let course of array){
        let courseNewdiv = document.createElement("div")
        courseNewdiv.innerHTML = `<img src="./img/${course.imagen}" alt="${course.titulo}">
        <p>${course.titulo}</p>
        <p>${course.idioma}</p>
        <p>Precio: ${course.precio}</p>
        <button id="" class="btn btn.outline.success">Agregar al carrito</button>`
        containerCourses.append(courseNewdiv);
    }
}
mostrarCatalogoDOM(estanteria);

function buscarInfo(buscado, array) {
    let results = array.filter((course) => {
        return course.idioma.toLowerCase().includes(buscado.toLowerCase()) || course.titulo.toLowerCase().includes(buscado.toLowerCase());
    });

    if (results.length > 0) {
        mostrarCatalogoDOM(results);
        resultsDiv.innerHTML = "";
    } else {
        mostrarCatalogoDOM(estanteria);
        resultsDiv.innerHTML = `<h3>No se encontraron resultados.</h3>`;
    }
}

// Función ordenar cursos de mayor a menor precio
function ordenarMayorMenor(array) {
    let arrayMayorMenor = array.concat();
    arrayMayorMenor.sort((par1, par2) => par2.precio - par1.precio);
    mostrarCatalogoDOM(arrayMayorMenor);
}

// Función ordenar cursos de menor a mayor precio
function ordenarMenorMayor(array) {
    let arrMenor = array.concat();
    arrMenor.sort((a, b) => a.precio - b.precio);
    mostrarCatalogoDOM(arrMenor);
}

// Función ordenar cursos alfabéticamente por título
function ordenarAlfabeticamenteTitulo(array) {
    let ordenadoAlf = array.concat();
    ordenadoAlf.sort((a, b) => {
        if (a.titulo > b.titulo) {
            return 1;
        }
        if (a.titulo < b.titulo) {
            return -1;
        }
        return 0;
    });
    mostrarCatalogoDOM(ordenadoAlf);
}

//EVENTOS
searcher.addEventListener("input", () => {
    buscarInfo(searcher.value, estanteria);
});
selectOrder.addEventListener("change", () => {
    console.log(selectOrder.value)
    switch(selectOrder.value){
        case "1":
            ordenarMayorMenor(estanteria)
        break
        case "2":
            ordenarMenorMayor(estanteria)
        break
        case "3":
            ordenarAlfabeticamenteTitulo(estanteria)
        break
        default:
            mostrarCatalogoDOM(estanteria)
        break
    }
})

//Otro Proyecto
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
