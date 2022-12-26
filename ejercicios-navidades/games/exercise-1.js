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


//!  2. Añadir a cada una de las imágenes un evento click para comprobar si la jugada realizada por el usuario es correcta.
//!  Para ello, tendremos que guardar cada dos click en tarjetas que haga el usuario y comparar uno con otro siguiendo
//!   las siguientes condiciones:

//!     1. Si el usuario hace click en la misma tarjeta dos veces, la jugada no es valida.
//!     2. Si el usuario hace click en una tarjeta previamente validada, la jugada no es valida.
//!     3. Si el usuario hace click en dos tarjetas con el nombre diferente, la jugada no es valida.
//!     4. Si ninguna de estas condiciones se cumple y, el usuario hace click en dos tarjetas con diferentes nombres. la
//!      jugada será validada y tendremos que almacenar las tarjetas para posteriores comprobaciones. Además, el ``src
//!      `` de la imagen debería de cambiar a ``public/exercise-1/tick.svg``.


//  3. Por cada una de las jugadas deberemos validar el score y sumar 1 por cada jugada validada correctamente al span
//   de ```score```. Si el
//   usuario ha resuelto el juego completo, muestralé un mensaje de felicitaciones.


//  4. Por último, para medir la calidad del juego, podríamos crear un contador de intentos e introducir el numero de
//   intentos que el usuario ha llevado a cabo en el span de ``attempts``. Realmente este punto es bastante fácil, suma
//    simplemente uno por cada vez que hagas una comprobación de jugada.


// Si has cumplido todas las condiciones...Enhorabuena! tienes un juego de memoría bastante resultón! Además si te
//  interesa subir la dificultad no tienes más que hacer el array más grande y meter más imagenes...¿te atreves? :D


function createMemory (){

    // creamos el tablero con las imágenes del array
    const memoryContainer$$ = document.querySelector(".b-grid");

    for (const planet of cardArray){

        // creamos la carta, la imagen de la carta, su título y el reverso
        const card$$ = document.createElement("div");
        const cardImage$$ = document.createElement("img");
        const cardTitle$$ = document.createElement("h2");
        const cardBack$$ = document.createElement("div");

        // le damos clases e id a la carta y su reverso
        card$$.setAttribute("id",planet.id);
        card$$.setAttribute("class","card");
        cardBack$$.setAttribute("class","cardBack shown");
        cardBack$$.setAttribute("id",planet.id);

        // le damos contenido a la carta: imagen y título
        cardImage$$.src = planet.img;
        cardTitle$$.textContent = planet.name;

        // introducimos los elementos en el container
        card$$.appendChild(cardBack$$);
        card$$.appendChild(cardImage$$);
        card$$.appendChild(cardTitle$$);
        memoryContainer$$.appendChild(card$$);

        cardBack$$.addEventListener("click",showPlanet);

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
    // console.log(event.path[1]);
    
    //guardamos la información del ID y del H2
    const planetEventId$$ = event.path[1].id;
    const planetEventName$$ = event.path[1].querySelector("h2").innerText;
    console.log("ID SELECCIONADA:", planetEventId$$);
    console.log("PLANETA SELECCIONADO: ", planetEventName$$);

};



window.onload = createMemory;

//! Ejemplo de funcion ASYNC para captar info de los 2 EVENT

// function resolveAfter2Seconds() {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve('resolved');
//       }, 2000);
//     });
//   }
  
//   async function asyncCall() {
//     console.log('calling');
//     const result = await resolveAfter2Seconds();
//     console.log(result);
//     // expected output: "resolved"
//   }
  
//   asyncCall();
