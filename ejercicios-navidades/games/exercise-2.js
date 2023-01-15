
// ## Whack a mole

// Dado el html ``exercise-2.html`` y el css ``exercise-2.css``, crea un archivo de javascript (recuerda que el javascript que
//  proporcionamos nosotros es el que contiene la solución propuesta) para crear un el típico juego de atrapar topos
//  ...pero en este caso deberemos atrapar a Diglett!
 
//  Para ello abre el fichero ``exercise-2.html`` en tu navegador y verás el resultado final de lo que queremos conseguir
//  . Como ves, vamos a tener un contador y a nuestro escurridizo Diglett **moviendose cada 0.5 segundos a una casilla
//   aleatoria hasta que finaliza el contador**. La intención del usuario es conseguir hacer click en la imagen de Diglett
//    cuantas más veces posibles hasta que finalice el contador y **registrar cada click efectivo como un punto en el score**
//    . Una vez que esto ocurra mostraremos una alerta al
//     usuario con la puntuación obtenida.
  
// ##Condiciones
  
//   1. Digglet debe moverse a una posición aleatoria cada 0.5 segundos y poner el resto de casillas con la imagen
//    predefinida de las pokeballs.
//   2. Si el usuario, en esos 0.5 segundos consigue hacer click en Diglett, el contador ``Your score`` sumara 1.
//   2. Cada segundo, debes restar 1 al contador de ``Seconds left``.
//   3. Cuando el contador ``Seconds left`` llegue a 0, muestra un alert al usuario con la puntuación total.
  
//   Y eso estodo! aplica tus conocimientos de la mejor forma posible y...a cazar Digletts!


//! establecemos los marcadores de tiempo y puntuación iniciales
let score = 0;
let time = 30;                   //* tiempo en segundos
let diglettInterval = 550;      //* tiempo en milisegundos
let finalScore = 0;

// leemos todos los cuadrados del grid y les damos el eventListener
const grid = document.querySelectorAll("[data-function='square']");
for(const square of grid){
    square.addEventListener("click", gotcha);
}

// hacemos que nos suma SCORE cada click correcto
function gotcha(event){
    if(event.target.className === "b-square diglett"){
        let scoreHTML = document.querySelector(".scoreText");
        score = score + 5;
        scoreHTML.textContent = score;   
    }
    finalScore = score;
}

// creamos el botón START y le damos funcionalidad para empezar el juego
const startButton = document.querySelector(".startButton");
startButton.addEventListener("click",startMole)

function startMole (event){
    //hacemos que no se puedan abrir varias instancias del juego
    startButton.removeEventListener("click", startMole);

    //mostramos el tablero (por defecto estará escondido)
    document.querySelector(".b-grid").setAttribute("style","display: flex");

    // ponemos el marcador a 0 y reseteamos el tiempo a 30
    // utilizamos 2 variables de tiempo para así si modificamos la 1a
    // el juego al hacer la cuenta atrás no machaca esta variable
    // de esta forma tocando las variables del inicio modificamos el juego
    // con lo que si queremos modificar la dificultad nos será mas fácil
    let scoreHTML = document.querySelector(".scoreText");
    let score = 0;
    scoreHTML.textContent = score;
    let time2 = time
    let timeHTML = document.querySelector(".timeText");
    timeHTML.textContent = time2;

    //iniciamos la secuencia de randomizar los Diglett
    setTimeout(() => {
        console.log("START GAME")
        const interval = setInterval(randomMole,diglettInterval);
        
        // hacemos que el juego pare en 30 segundos
        setTimeout(() => {
            clearInterval(interval);
        }, time*1000);
    }, 0);

    // hacemos que el tiempo vaya restando hasta llegar a 0 
    const changeTime = setInterval(() => {
        let timeHTML = document.querySelector(".timeText");
        timeHTML.textContent = time2;
        time2--;
        if (time2 <= 10 && time2 > 5) timeHTML.setAttribute("style","color:yellow");
        else if (time2 <= 5) timeHTML.setAttribute("style","color:red");
        else timeHTML.setAttribute("style","color:green");

        //hacemos que el juego se acabe al final del tiempo establecido y muestre una ventana con el resultado
        setTimeout(() => {
            clearInterval(changeTime);
            setTimeout(() => {
                const finalPosition$$ = document.querySelector(".b-grid");
                const finalResults$$ = document.createElement("div");
                    finalResults$$.setAttribute("class","finalWindow");
                const finalTitle$$ = document.createElement("h1");
                    if (finalScore >= 100) {
                        finalTitle$$.setAttribute("style","color:green");
                        finalResults$$.setAttribute("style","border: 6px inset rgba(0, 255, 21, 0.733)")
                        finalTitle$$.textContent = "VICTORY !!!";
                    } else {
                        finalTitle$$.setAttribute("style","color:red");
                        finalResults$$.setAttribute("style","border: 6px inset rgba(255, 0, 0, 0.719)");
                        finalTitle$$.textContent = "YOU LOSE - Try Again";
                    }

                const finalText$$ = document.createElement("h2");
                    finalText$$.textContent = "Has conseguido una puntuación de " + finalScore + " . Pulsa el botón de RESET para volver a jugar e intentar mejorar tu puntuación actual."                

                finalPosition$$.appendChild(finalResults$$);
                    finalResults$$.appendChild(finalTitle$$);
                    finalResults$$.appendChild(finalText$$);

            }, 2000);
        }, time*1000);        
    }, 1000);
}

// creamosl a función que hace aparecer de forma RANDOM a DIGLETT
let lastRandomNumber = 0;
function randomMole(event) {
    let randomNumber = Math.floor(Math.random() * 9);
    if (randomNumber === lastRandomNumber && randomNumber === 0) {
        randomNumber++;
    } else if (randomNumber === lastRandomNumber && randomNumber === 8) { 
        randomNumber--;
    } else {
        randomNumber = Math.floor(Math.random() * 9);
    }
    document.getElementById(randomNumber).classList.add("diglett");
    setTimeout(() => {
        document.getElementById(randomNumber).classList.remove("diglett");
    }, diglettInterval);
    lastRandomNumber = randomNumber;
}

