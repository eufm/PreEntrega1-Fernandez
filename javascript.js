        //DICTIONARY
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");
    //dictionaryOffline
let vocabulario = [];
let indiceActual = 0;

function saveToLocalStorage() {
    const jsonDic = JSON.stringify(dicOffline);
    localStorage.setItem('dicOffline', jsonDic);
}

function loadFromLocalStorage() {
    const jsonDic = localStorage.getItem('dicOffline');
    if (jsonDic) {
        dicOffline = JSON.parse(jsonDic);
    }
}

class word{
    constructor(id, name, type, translation, phonetics, definition, example){
        this.id = id,
        this.name = name,
        this.type = type,
        this.translation = translation,
        this.phonetics = phonetics,
        this.definition = definition,
        this.example = example
    }
}

//Objetos
const word1 = new word(1, "Tree", "noun","árbol", "/tri:/", "A tall plant that has a wooden trunk and branches that grow from its upper part.","We sat under a tree for shade.")

const word2 = new word(2, "House", "noun", "casa", "/haʊs/", "A building that people, usually one family, live in.","She lives in a little house in Cross Street.")

const word3 = new word(3, "Pen", "noun", "bolígrafo", "/pen/", "A long, thin object used for writing or drawing with ink.","My pen seems to be running out of ink - I need a refill.")

const word4 = new word(4, "Happy", "adjective", "feliz", "/'hæp.i/", "Feeling, showing, or causing pleasure or satisfaction.","She looks so happy.")

const word5 = new word(5, "Speak", "verb", "hablar", "/spi:k/", "To say words, to use the voice, or to have a conversation with someone.","Would you mind speaking more slowly, please?")

//array de objetos:
let dicOffline = [word1,word2,word3,word4,word5]

function saveWord(){
    let name = document.getElementById ("wordInput").value;
    let type = document.getElementById ("typeInput").value;
    let translation = document.getElementById ("spanishInput").value;
    let phonetics = document.getElementById ("phoneticsInput").value;
    let definition = document.getElementById ("definitionInput").value;
    let example = document.getElementById ("exampleInput").value;

    // Verificar campos:
    if(!name || !type || !translation || !phonetics || !definition || !example) {
        // Si incompleto:
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Por favor, completa todos los campos antes de guardar.'
        });
        return; 
    }

    //instanciarlo en un objeto:
    const newWord = new word(dicOffline.length+1,name, type, translation, phonetics, definition, example);
    dicOffline.push(newWord);

    // Guardar en LocalStorage
    saveToLocalStorage();

    //Éxito
    Swal.fire({
        icon: 'success',
        title: '¡Hecho!',
        text: 'Palabra añadida con éxito al diccionario de Learning Reference.'
    });

    // Limpiar los campos del formulario
    document.getElementById("wordInput").value = "";
    document.getElementById("typeInput").value = "";
    document.getElementById("spanishInput").value = "";
    document.getElementById("phoneticsInput").value = "";
    document.getElementById("definitionInput").value = "";
    document.getElementById("exampleInput").value = "";
}

let saveWordBtn = document.getElementById("saveWordBtn")
saveWordBtn.addEventListener ("click", () =>{saveWord(dicOffline)})

//búsqueda
function searchOfflineDictionary(inpWord) {
    let foundWord = dicOffline.find(word => word.name.toLowerCase() === inpWord.toLowerCase());

    if (foundWord) {
        return `
            <div class="word">
                <h3>${foundWord.name}</h3>
            </div>
            <div class="details">
                <p>${foundWord.type}</p>
                <p>${foundWord.phonetics}</p>
            </div>
            <p class="word-meaning">
                ${foundWord.definition}
            </p>
            <p class="word-example">
                ${foundWord.example || ""}
            </p>
            <p>Definition given by LearningReference</p>
            `;
    }
    return "";
}

const inpWordElement = document.getElementById("inp-word");

function performSearch() {
    let inpWord = inpWordElement.value;

    let offlineResult = searchOfflineDictionary(inpWord);
    
    result.innerHTML = offlineResult;

    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            let onlineResult = `
                <div class="word">
                        <h3>${inpWord}</h3>
                    </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>${data[0].phonetic}</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>
                <p>Definition given by an online free dictionary</p>`;

            result.innerHTML += onlineResult;
        })
        .catch(() => {
            result.innerHTML += `<h3 class="error">Couldn't find the word</h3>`;
        });
}

inpWordElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

btn.addEventListener("click", performSearch);

//TOOLS
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
}

//Objetos
let estanteria = [
    new course(1, "Friends", "Inglés", 20, "friends.jpg"),

    new course(2, "Succession", "Inglés", 30, "succession.jpg"),

    new course(3, "From", "Inglés", 40, "from.jpg"),

    new course(4, "Breaking Bad", "Inglés", 50, "breakingbad.jpg"),

    new course(5, "Cómo conocí a vuestra madre", "Inglés", 35, "comoconociavuestramadre.jpg"),

    new course(6, "Better Call Saul", "Inglés", 55, "bettercallsaul.jpg")
];

//CAPTURA DOM
let containerCourses = document.getElementById("index-courses-content");
let selectOrder = document.getElementById("selectOrder");
let searcher = document.getElementById("searcher");
let modalCompraBody = document.getElementById("modalCompraBody");
let precioTotal = document.getElementById("precioTotal");

function mostrarCatalogoDOM(array) {
    containerCourses.innerHTML = "";
    for (let course of array) {
        let courseNewdiv = document.createElement("div");
        courseNewdiv.innerHTML = `
            <img src="./img/${course.imagen}" alt="${course.titulo}">
            <p>${course.titulo}</p>
            <p>${course.idioma}</p>
            <p>Precio: ${course.precio}</p>
            <button class="btn btn-outline-success pagar-curso" data-id="${course.id}">Comprar curso</button>
        `;
        containerCourses.appendChild(courseNewdiv);
    }

    let botonesPagar = document.querySelectorAll(".pagar-curso");
    botonesPagar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            const cursoSeleccionado = estanteria.find(course => course.id === id);
    
            mostrarDetallesCompra(cursoSeleccionado);

        });
    });    
}

function mostrarDetallesCompra(curso) {
    let detallesHTML = `
        <p>Curso: ${curso.titulo}</p>
        <p>Idioma: ${curso.idioma}</p>
        <p>Precio sin IVA: $${curso.precio}</p>
        <p>IVA (21%): $${curso.precio * soloIVA}</p>
        <p>Total: $${calcularTotalConIVA(curso.precio)}</p>
    `;

    modalCompraBody.innerHTML = detallesHTML;

    document.getElementById('btnPagarDesdeModal').setAttribute('data-id', curso.id);


    //Modal
    let modalCompra = new bootstrap.Modal(document.getElementById('modalCompra'));
    modalCompra.show();
}

function calcularTotalConIVA(precio) {
    return precio * conIVA;
}

function pagar() {
    const id = parseInt(document.getElementById('btnPagarDesdeModal').getAttribute("data-id"));
    const cursoSeleccionado = estanteria.find(course => course.id === id);

    Swal.fire({
        icon: 'success',
        title: '¡Pago realizado con éxito!',
        text: 'Felicitaciones. Ya tienes tu curso disponible en tu perfil'
    });

    // Cerrar el modal:
    let modalCompra = bootstrap.Modal.getInstance(document.getElementById('modalCompra'));
    modalCompra.hide();
}

document.getElementById('btnPagarDesdeModal').addEventListener('click', pagar);

//Filtro y ordenado
function buscarInfo(buscado) {
    let results = estanteria.filter(course => course.titulo.toLowerCase().includes(buscado.toLowerCase()) || course.idioma.toLowerCase().includes(buscado.toLowerCase()));
    mostrarCatalogoDOM(results);
}

function ordenarMayorMenor() {
    return [...estanteria].sort((a, b) => b.precio - a.precio);
}

function ordenarMenorMayor() {
    return [...estanteria].sort((a, b) => a.precio - b.precio);
}

function ordenarAlfabeticamenteTitulo() {
    return [...estanteria].sort((a, b) => a.titulo.localeCompare(b.titulo));
}

searcher.addEventListener("input", () => {
    buscarInfo(searcher.value);
});

selectOrder.addEventListener("change", () => {
    switch (selectOrder.value) {
        case "1":
            mostrarCatalogoDOM(ordenarMayorMenor());
            break;
        case "2":
            mostrarCatalogoDOM(ordenarMenorMayor());
            break;
        case "3":
            mostrarCatalogoDOM(ordenarAlfabeticamenteTitulo());
            break;
        default:
            mostrarCatalogoDOM(estanteria);
            break;
    }
});
mostrarCatalogoDOM(estanteria);