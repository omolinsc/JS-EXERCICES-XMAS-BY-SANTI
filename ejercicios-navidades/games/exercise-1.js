//* ##Memory game
// Dado el html ``exercise-1.html`` y el css`` exercise-1.css``, crea un archivo de javascript (recuerda que el
//  javascript que
//  proporcionamos nosotros es el que contiene la solución propuesta) para crear un juego de memoria con
// los datos proporcionados por el siguiente array:


let cardArray = [
    {
        id: 1,
        name: 'earth',
        img: 'public/exercise-1/earth.svg'
    },
    {
        id: 2,
        name: 'jupiter',
        img: 'public/exercise-1/jupiter.svg'
    },
    {
        id: 3,
        name: 'mars',
        img: 'public/exercise-1/mars.svg'
    },
    {
        id: 4,
        name: 'mercury',
        img: 'public/exercise-1/mercury.svg'
    },
    {
        id: 5,
        name: 'saturn',
        img: 'public/exercise-1/saturn.svg'
    },
    {
        id: 6,
        name: 'uranus',
        img: 'public/exercise-1/uranus.svg'
    },
    {
        id: 7,
        name: 'earth',
        img: 'public/exercise-1/earth.svg'
    },
    {
        id: 8,
        name: 'jupiter',
        img: 'public/exercise-1/jupiter.svg'
    },
    {
        id: 9,
        name: 'mars',
        img: 'public/exercise-1/mars.svg'
    },
    {
        id: 10,
        name: 'mercury',
        img: 'public/exercise-1/mercury.svg'
    },
    {
        id: 11,
        name: 'saturn',
        img: 'public/exercise-1/saturn.svg'
    },
    {
        id: 12,
        name: 'uranus',
        img: 'public/exercise-1/uranus.svg'
    }
];


// Este juego es el típico juego de memoria por pareja en el que tendremos que **seleccionar dos tarjetas y si ambas tarjetas
//  ocultan la misma imagen, la jugada será correcta** y, si por el contrario **las tarjetas son diferentes entre sí, sus
//  imágenes se volverán a ocultar**.
 
// ##Pasos a seguir
 
//*  1.  Pintar un tablero con las doce imágenes del array y el `src` apuntando al svg de `public/exercise/universe.svg`. 
// * Ten en cuenta que como es un juego de parejas, las imágenes y nombres están repetidas en el array.


//*  2. Añadir a cada una de las imágenes un evento click para comprobar si la jugada realizada por el usuario es correcta.
//*  Para ello, tendremos que guardar cada dos click en tarjetas que haga el usuario y comparar uno con otro siguiendo
//*   las siguientes condiciones:

//*     1. Si el usuario hace click en la misma tarjeta dos veces, la jugada no es valida.
//*     2. Si el usuario hace click en una tarjeta previamente validada, la jugada no es valida.
//*     3. Si el usuario hace click en dos tarjetas con el nombre diferente, la jugada no es valida.
//*     4. Si ninguna de estas condiciones se cumple y, el usuario hace click en dos tarjetas con diferentes nombres. la
//*      jugada será validada y tendremos que almacenar las tarjetas para posteriores comprobaciones. Además, el ``src
//*      `` de la imagen debería de cambiar a ``public/exercise-1/tick.svg``.


//*  3. Por cada una de las jugadas deberemos validar el score y sumar 1 por cada jugada validada correctamente al span
//*   de ```score```. Si el
//*   usuario ha resuelto el juego completo, muestralé un mensaje de felicitaciones.


//*  4. Por último, para medir la calidad del juego, podríamos crear un contador de intentos e introducir el numero de
//*   intentos que el usuario ha llevado a cabo en el span de ``attempts``. Realmente este punto es bastante fácil, suma
//*    simplemente uno por cada vez que hagas una comprobación de jugada.


//* Si has cumplido todas las condiciones...Enhorabuena! tienes un juego de memoría bastante resultón! Además si te
//*  interesa subir la dificultad no tienes más que hacer el array más grande y meter más imagenes...¿te atreves? :D



function createMemory (){

    // creamos el tablero con las imágenes del array
    const memoryContainer$$ = document.querySelector(".b-grid");

    // construimos el cuadro que debe salir al ganar la partida
    const victory$$ = document.createElement("div");
        victory$$.setAttribute("class","victoryDiv");
    const victoryP1$$ = document.createElement("p");
        victoryP1$$.setAttribute("class","p1");
    const victoryP2$$ = document.createElement("p");
        victoryP2$$.setAttribute("class","p2");
        const victoryP3$$ = document.createElement("p");
        victoryP3$$.setAttribute("class","p3");
    memoryContainer$$.appendChild(victory$$);
    victory$$.appendChild(victoryP1$$);
    victory$$.appendChild(victoryP2$$);
    victory$$.appendChild(victoryP3$$);


    //creamos un array con todas las posiciones posibles ordenadas
    const numbersArray = [];
    for (let n = 0; n < cardArray.length; n++) {numbersArray.push(n);}

    //desordenamos el array de números para usarla al crear las cartas con posiciones random
    const shuffledArray = numbersArray.sort((a, b) => 0.5 - Math.random());
    
    // creamos todas las cartas
    for (let i = 0; i < cardArray.length; i++){

        // creamos la carta, la imagen de la carta, su título y el reverso
        const card$$ = document.createElement("div");
        const cardImage$$ = document.createElement("img");
        const cardTitle$$ = document.createElement("h2");
        const cardBack$$ = document.createElement("div");

        // le damos clases e id a la carta y su reverso
        card$$.setAttribute("id",cardArray[shuffledArray[i]].id);
        card$$.setAttribute("class","card");
        cardBack$$.setAttribute("class","cardBack shown");
        cardBack$$.setAttribute("id",cardArray[shuffledArray[i]].id);

        // le damos contenido a la carta: imagen y título
        cardImage$$.src = cardArray[shuffledArray[i]].img;
        cardTitle$$.textContent = cardArray[shuffledArray[i]].name;

        // introducimos los elementos en el container
        card$$.appendChild(cardBack$$);
        card$$.appendChild(cardImage$$);
        card$$.appendChild(cardTitle$$);
        memoryContainer$$.appendChild(card$$);

        //añadimos el eventListener a las cartas
        cardBack$$.addEventListener("click",showPlanet);  
        
        totalCards++;
    }
};

// creamos la función que haga invisible el reverso y así ver la carta
function showPlanet(event) {

    // hacemos visible el planeta seleccionado
    // event.path[0] es el div que haremos invisible al clicar
    event.path[0].setAttribute("class","cardBack");
    
    // localizamos la información que queremos del eventListener
    // event.path[1] es el div de la carta con ID y que contiene el H2
    // esta info la necesitaremos para comparar los clicks
    const cardBack2$$ = event.path[1];
    
    //guardamos la información del ID y del H2
    const planetEventId$$ = event.path[1].id;
    const planetEventName$$ = event.path[1].querySelector("h2").innerText;

        //observamos la 1a carta girada y guardamos sus datos en variables
        if (hasFlippedCard === false) {
            hasFlippedCard = true;
            firstId = event.path[1].id;
            firstName = event.path[1].querySelector("h2").innerText;
            firstCard = event.path[0];
            firstCardFlipped = event.path[1];

            console.log("1ST CARD FLIPPED");
            console.log("ID SELECCIONADA:", firstId, " & PLANETA SELECCIONADO: ", firstName);
            return;
        }
        
        //observamos la 2a carta girada y guardamos sus datos en variables
        if (hasFlippedCard === true) {
            secondId = event.path[1].id;
            secondName = event.path[1].querySelector("h2").innerText;
            secondCard = event.path[0];
            secondCardFlipped = event.path[1];

            console.log("2ND CARD FLIPPED");
            console.log("ID SELECCIONADA:", secondId, " & PLANETA SELECCIONADO: ", secondName);
            
            //comparamos las cartas y, si son iguales, suma puntos y 1 intento a las jugadas
            //si son iguales también dejará las cartas giradas y bloqueadas (sin eventListener)
            if (firstId !== secondId && firstName === secondName) {
                console.log("BINGOOOO!!!");
                firstCard.removeEventListener('click', showPlanet);
                secondCard.removeEventListener('click', showPlanet);

                //añadimos un efecto verdoso a las cartas que hacen MATCH
                firstCardFlipped.classList.add("cardMatch");
                secondCardFlipped.classList.add("cardMatch");
                
                score = score + 10;
                attempts++;
                hasFlippedCard = false;
                pairsMatched++;

                if (pairsMatched === (totalCards/2)){
                    setTimeout (finished,2000);
                }

            //comparamos las cartas y, si NO son iguales, resta puntos y suma 1 intento a las jugadas
            //si NO son iguales también girará las cartas y las mantiene desbloqueadas (no remueve el eventListener)
            } else {
                //! activamos el bloqueo de los clicks
                document.addEventListener("click", handler, true);
                //añadimos un efecto rojizo a las cartas que no hacen MATCH (se lo quitaremos después del TIMEOUT)
                firstCardFlipped.classList.add("cardUnmatch");
                secondCardFlipped.classList.add("cardUnmatch");
                
                console.log("ERROR");
                setTimeout(() => {
                    firstCard.classList.add("shown");
                    secondCard.classList.add("shown");

                    // removemos el efecto rojizo a las cartas
                    firstCardFlipped.classList.remove("cardUnmatch");
                    secondCardFlipped.classList.remove("cardUnmatch");

                    //! desactivamos el bloqueo de clicks
                    document.removeEventListener("click", handler, true);
                }, 2000);
                attempts++;
                score = score - 5;
                hasFlippedCard = false;
            }

            //actualizamos el SCORE y los ATTEMPTS
            document.querySelector("[data-function=score]").textContent = score;
            document.querySelector("[data-function=attempts]").textContent = attempts;
            return;
        }
};

let hasFlippedCard = false;
let firstCard, secondCard;
let attempts = 0;
let score = 0;
let totalCards = 0;
let pairsMatched = 0;

//función que bloquea los clicks en la página
function handler(e) {
    e.stopPropagation();
    e.preventDefault();
};

// función que hace que al acabar la partida aparezcan los DIV con la enhorabuena y la info de la partida
function finished () {
    const victory$$ = document.querySelector(".victoryDiv");
    victory$$.classList.add("finished");
    document.querySelector(".p1").textContent = "ENHORABUENA!! HAS ACABADO LA PARTIDA!!!"
    document.querySelector(".p2").textContent = "Has conseguido " + score + " puntos de un máximo de 60 en un total de " + attempts + " intentos.";
    document.querySelector(".p3").textContent = "Si quieres volver a jugar, pulsa el boton de RESET"
}

//creamos el botón de RESET para iniciar de nuevo la partida, le damos atributos y lo insertamos a la web
const reset$$ = document.createElement("button");
reset$$.textContent = "RESET";
reset$$.setAttribute("onclick","document.location.reload()");
reset$$.setAttribute("class","resetButton");
document.body.appendChild(reset$$);


window.onload = createMemory;