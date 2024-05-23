// SECCION DE LA CALCULADORA *************************************************************************************************************************************************
document
  .querySelector("#calcularButton")
  .addEventListener("click", function () {
    let nombre = document.querySelector("#alumno").value;
    let notaEj = document.querySelector("#notaEj").value;
    let notaTe = document.querySelector("#notaTe").value;
    let notaPr = document.querySelector("#notaPr").value;
    let notaPro = document.querySelector("#notaPro").value;
    filtrar(nombre, notaEj, notaTe, notaPr, notaPro);
  });

document.querySelector("#deleteButton").addEventListener("click", function () {
  //usamos la funcion reset y con el form en vez de seleccionar cada input uno a uno
  document.getElementById("alumnoForm").reset();
  document.querySelector("#notaMedia").remove();
});

function showGrade(nombre, nota) {
  let divGrade = document.querySelector("#notaMedia");
  divGrade.classList.remove("aprobado", "suspendido");
  let aprobadoSusp = nota > 5 ? "aprobado" : "suspendido";
  divGrade.classList.add(aprobadoSusp);
  divGrade.innerHTML =
    "<h2> Has " +
    aprobadoSusp +
    " " +
    nombre +
    " con una nota de " +
    nota +
    "</h2>";
}

function filtrar(nombre, nota1, nota2, nota3, nota4) {
  if (nombre < 1 || nota1 == "" || nota2 == "" || nota3 == "" || nota4 == "") {
    alert("Faltan datos");
  } else {
    showGrade(nombre, media(nota1, nota2, nota3, nota4));
  }
}

function media(nota1, nota2, nota3, nota4) {
  let media = nota1 * 0.2 + nota2 * 0.2 + nota3 * 0.3 + nota4 * 0.3;
  return media.toFixed(2);
}

function validarNota() {
  let value = this.value;
  if (value != null) {
    if (value < 0) this.value = 0;
    else if (value > 10) this.value = 10;
  }
}

document.querySelectorAll(".dataStudent").forEach(function (nota) {
  nota.addEventListener("input", validarNota);
});

function media(nota1, nota2, nota3, nota4) {
  let media = nota1 * 0.2 + nota2 * 0.2 + nota3 * 0.3 + nota4 * 0.3;
  return media.toFixed(2);
}
