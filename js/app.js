const listaPreguntasContainer = document.getElementById("container");
const comprobar = document.getElementById("button-comprobar");
const restaurar = document.getElementById("button-restaurar");
const formulario = document.getElementById("formulario");
const conteo = document.getElementById("conteo");
const PreguntasQuizz = [];
let contador = 0;

window.onload = () => {
  cargarPreguntas();
  comprobar.addEventListener("click", comprobarRespuestas);
  restaurar.addEventListener("click", reiniciar);
};

const cargarPreguntas = () => {
  fetch("./data/quizz.json")
    .then((response) => response.json())
    .then((data) => {
      preguntasQuizz = data;
      listaPreguntas(data);
    });
};

const listaPreguntas = (preguntas) => {
  listaPreguntasContainer.innerHTML = "";

  preguntas.forEach((pregunta) => {
    listaPreguntasContainer.innerHTML += pintarPreguntas(pregunta);
  });
};

const pintarPreguntas = (pregunta) => {
  return `
        <div id="n${pregunta.id}">
            <h2>${pregunta.id}. ${pregunta.pregunta}</h2>
            <div class=${pregunta.id}>
            ${getOptions(pregunta.respuestas, pregunta.id)}
            </div>
        </div>   
    `;
};

function getOptions(respuestas, id) {
  let opcionesHTML = "";
  respuestas.forEach((respuesta) => {
    opcionesHTML += `
       

        <p><input type="radio" name="${id}" value="${respuesta.respuesta}">${respuesta.respuesta}</p>
       
    `;
    //console.log(opcionesHTML)
  });

  return opcionesHTML;
}

function comprobarRespuestas(e) {
  //alert("Has pulsado el botón");
  e.preventDefault();
  contador = 0;
  let data = new FormData(formulario);
  console.log(preguntasQuizz);
  preguntasQuizz.forEach((comprobando) => {
    let respuesta = data.get(`${comprobando.id}`);

    let correccion = comprobando.respuestas.find((resp) => resp.valor == true);
    if (respuesta != correccion.respuesta || respuesta == null) {
      console.log("respuesta incorrecta");
      document.querySelector(`div#n${comprobando.id}`).style.background = "rgba(255, 0, 0, 0.424)";
    } else if (respuesta == correccion.respuesta) {
      conteo.innerHTML = "";
      contador++;

      conteo.innerHTML += `Has conseguido ${contador} puntos`;
    }
    console.log(respuesta, correccion, contador);
  });
}

 function reiniciar(){
     preguntasQuizz.forEach((comprobando)=>{
        document.querySelector(`div#n${comprobando.id}`).style.background = "";
     })
    }
     
   
