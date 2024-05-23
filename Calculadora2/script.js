// SECCION PARA EXPORTAR LA TABLA ***************************************************************************************
// USO DEL PLUGIN https://www.jsdelivr.com/package/npm/table2excel PARA GENERAR EL EXCEL
// EXCEL    
document.querySelector("#excelGenerate").addEventListener("click", function () {
    let table2excel = new Table2Excel();
    table2excel.export(document.querySelector("#dataTable"), "datosAlumnos");
});

// SECCION DE LA CALCULADORA *************************************************************************************************************************************************
document.querySelector("#calcularButton").addEventListener("click", function () {
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


// VERIFICAR SI LAS NOTAS ESTAN ENTRE 0 Y 10 **********************************************************************************
function validarNota() {
    let value = this.value;
    if ( value != null ) {
        if (value < 0) this.value = 0;
        else if (value > 10) this.value = 10;
    }
}

document.querySelectorAll(".dataStudent").forEach(function(nota) {
    nota.addEventListener('input', validarNota);
});


function showGrade(nombre,nota) {
    let divGrade = document.querySelector("#notaMedia");
    divGrade.classList.remove("aprobado", "suspendido");
    let aprobadoSusp = (nota >= 5 ? "aprobado" : "suspendido")
    divGrade.classList.add(aprobadoSusp)
    divGrade.innerHTML = "<h2> Has " + aprobadoSusp +" "+ nombre + " con una nota de " + nota + "</h2>";
};
//FILTO DE LOS DATOS QUE LE LLEGAN AL INPUT ********************************************************************************************************
function filtrar(nombre, nota1, nota2, nota3, nota4) {
    if (nombre < 1 || nota1 == "" || nota2 == "" || nota3 == "" || nota4 == "") {
        alert("Faltan datos");
    } else {
        showGrade(nombre,media(nota1, nota2, nota3, nota4));
        createTableBody(nombre, nota1, nota2, nota3, nota4, media(nota1, nota2, nota3, nota4));
    }
};

function media(nota1, nota2, nota3, nota4) {
    let media = ((nota1 * 0.20) + (nota2 * 0.20) + (nota3 * 0.30) + (nota4 * 0.30))
    return media.toFixed(2);
}
// SECCION PARA CREAR LA TABLA ***************************************************************************************
function createTableBody(nombre, nota1, nota2, nota3, nota4, media) {
    var tbody = document.querySelector("#alumnoDatos");
    var clase = media >= 5 ? 'aprobado-tr' : 'suspendido-tr';
    var nuevaFilaHTML = '<tr class="'+ clase +'">' +
        '<td>' + nombre + '</td>' +
        '<td>' + nota1 + '</td>' +
        '<td>' + nota2 + '</td>' +
        '<td>' + nota3 + '</td>' +
        '<td>' + nota4 + '</td>' +
        '<td>' + media + '</td>' +
        '</tr>';
    tbody.innerHTML += nuevaFilaHTML
};

// SECCION PARA ESTILOS JUNTO JS ***************************************************************************************

document.querySelector("#toggleButton").addEventListener("click", function () {
    navegadorMenu();
});

function navegadorMenu() {
    let sidebar = document.querySelector("#sidebar");
    sidebar.classList.toggle('show');
    let button = document.querySelector("#toggleButton");

    if (sidebar.classList.contains('show')) {
        button.style.left = '320px';
    } else {
        button.style.left = '10px';
    }
};

// MOSTRAR EL HISTORIAL ***************************************************************************************
document.querySelector("#verHistorial").addEventListener("click", function (event) {
    navegadorMenu();
    let tabla = document.querySelector("#dataTable");
    let calculadora = document.querySelector(".calculadora");
    tabla.classList.toggle("hide");
    calculadora.classList.toggle("hide");
    //Metemos un delay al IF para que se muestre cuando el menu ya se ha cerrado y no se muestre mientras se produce la animacion del menu
    setTimeout(() => {
        if (calculadora.classList.contains("hide")) {
            document.querySelector("#exportTable").classList.toggle("hide");
            document.querySelector("#verHistorial").textContent = "Ver calculadora"
            document.querySelector("#tableCalculator").innerHTML = `<i class="fas fa-calculator"></i>`
        } else {
            document.querySelector("#exportTable").classList.toggle("hide");
            document.querySelector("#verHistorial").textContent = "Ver historial"
            document.querySelector("#tableCalculator").innerHTML = `<i class="fa fa-table" aria-hidden="true"></i>`
        }
    }, 500);

});
