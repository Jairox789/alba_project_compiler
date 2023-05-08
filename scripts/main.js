//NAV
const sidebar = document.querySelector(".sidebar");
const sidebarClose = document.querySelector("#sidebar-close");
const menu = document.querySelector(".menu-content");
const menuItems = document.querySelectorAll(".submenu-item");
const subMenuTitles = document.querySelectorAll(".submenu .menu-title");

sidebarClose.addEventListener("click", () => sidebar.classList.toggle("close"));

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    menu.classList.add("submenu-active");
    item.classList.add("show-submenu");
    menuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show-submenu");
      }
    });
  });
});

subMenuTitles.forEach((title) => {
  title.addEventListener("click", () => {
    menu.classList.remove("submenu-active");
  });
});

//CONSTANTES DEL DOM
const form = document.querySelector("#form");
const output = document.querySelector("#terminal-code");
const btnCompile = document.getElementById("btnCompile");
//FUNCION DE COMPILAR
btnCompile.addEventListener("click", () => {
  const code = document.querySelector("#text-area").value;
  let result;
  // Aquí se utiliza el parser generado por Jison, que estará disponible en la variable "parser".
  result = gramatica.parse(code);

  //REINICIAR DIVS
  output.innerHTML = "";

  compileResul.forEach((item) => {
    const resultsP = document.createElement("p");
    resultsP.innerText = item;
    output.append(resultsP);
  });
  if (compileErro != "") {
    compileErro.forEach((item) => {
      const resultsError = document.createElement("p");
      resultsError.innerText = item;
      output.append(resultsError);
    });
  }

  if (compileErroLex != "") {
    compileErroLex.forEach((item) => {
      const resultsErrorLex = document.createElement("p");
      resultsErrorLex.innerText = item;
      output.append(resultsErrorLex);
    });
  }

  compileErro = [""];
  compileErroLex = [""];
  compileResul = [""];
  consoleLog.innerHTML = "";
});

//numbers
const textarea = document.querySelector("#text-area");
const lineNumbersWrapper = document.querySelector(".line-numbers-wrapper");
const lineNumbers = document.querySelector(".line-numbers");

function updateLineNumbers() {
  const lines = textarea.value.split("\n");
  const lineNumbersContent = lines
    .map((line, i) => `<span>${i + 1}</span>`)
    .join("");
  lineNumbers.innerHTML = lineNumbersContent;
}

textarea.addEventListener("input", updateLineNumbers);
lineNumbersWrapper.addEventListener("scroll", () => {
  textarea.scrollTop = lineNumbersWrapper.scrollTop;
});

updateLineNumbers();

//MANEJO CON INTERFAZ
const modal = document.getElementById("modal");
const txtSalida = document.getElementById("prueba");
const modalVariable = document.querySelector(".modal-variable");
const modalImpresion = document.querySelector(".modal-impresion");
const btnVariable = document.getElementById("btnVariable");
const btnImpresion = document.getElementById("btnImpresion");

function agregarInstruccion(data) {
  modal.showModal();

  if (data == "Imprimir") {
    modalVariable.classList.add("inactive");
    modalImpresion.classList.remove("inactive");
  }

  if (data == "Variable") {
    modalVariable.classList.remove("inactive");
    modalImpresion.classList.add("inactive");
  }
}

const imprimir = document.getElementById("draggableImprimir");
const variable = document.getElementById("draggableVariable");
const drop = document.getElementById("droppable");

imprimir.addEventListener("dragstart", function (event) {
  event.dataTransfer.setData("text/plain", "Imprimir");
});

variable.addEventListener("dragstart", function (event) {
  event.dataTransfer.setData("text/plain", "Variable");
});

drop.addEventListener("dragover", function (event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
});

drop.addEventListener("drop", function (event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
  // Ejecuta la función con los datos como parámetro
  agregarInstruccion(data);
});

const inputImpresion = document.getElementById("inputImpresion");
const inputVariableNombre = document.getElementById("inputVariableNombre");
const inputVariableValor = document.getElementById("inputVariableValor");
// Agregar un event listener al botón para que agregue el texto
btnImpresion.addEventListener("click", function () {
  // Obtener el valor del input de texto
  var textoAAgregar = "imprimir[" + inputImpresion.value + "];";

  // Agregar el texto al final del textarea
  document.querySelector("#text-area").value += textoAAgregar + "\n";
  renderLogImpr(inputImpresion.value);

  // Limpiar el input de texto
  inputImpresion.value = "";
  imprimirPreview.innerText = "";
  modal.close();
});

const tipoVariable = document.getElementById("tipoVariable");

btnVariable.addEventListener("click", function () {
  // Obtener el valor del input de texto
  var variableNombre = inputVariableNombre.value;
  var variableValue = inputVariableValor.value;
  const p = `"`;
  var valorSeleccionado = tipoVariable.value;

  if (valorSeleccionado == "opcion1") {
    var variableFormat = variableNombre + "=" + p + variableValue + p + ";";
  }
  if (valorSeleccionado == "opcion2") {
    var variableFormat = variableNombre + "=" + variableValue + ";";
  }

  // Agregar el texto al final del textarea
  document.querySelector("#text-area").value += variableFormat + "\n";

  // Limpiar el input de texto
  let varObject = {
    name: variableNombre,
    value: variableValue,
  };
  inputVariableNombre.value = "";
  inputVariableValor.value = "";
  modal.close();
  renderLogVar(varObject);
});
const myCard = document.getElementById("myCard");
const flipButton = document.getElementById("btnSiguiente");
flipButton.addEventListener("click", function () {
  myCard.classList.toggle("flip");
});

//RENDERIZAR LOG
const consoleLog = document.querySelector(".code-log");
function renderLogVar(data) {
  const log = document.createElement("span");
  log.innerText =
    "Se ha creado la variable '" +
    data.name +
    "' con el valor de " +
    data.value;
  log.classList.add("log");
  consoleLog.append(log);
}

function renderLogImpr(data) {
  const log = document.createElement("span");
  log.innerText = "Se va a imprimir " + data;
  log.classList.add("log");
  consoleLog.append(log);
}

//Impresión preview
const imprimirPreview = document.getElementById("imprimirPreview");
inputImpresion.addEventListener("input", () => {
  let imprimir = inputImpresion.value;
  let formatImprimir = "Imprimir [" + imprimir + "];";
  imprimirPreview.innerText = formatImprimir;
});

//Variable preview
const variablePreview = document.getElementById("variablePreview");
var varNombre = "";
var varValor = "";

inputVariableNombre.addEventListener("input", () => {
  varNombre = inputVariableNombre.value;
  varValor = inputVariableValor.value;
  let formatImprimir = varNombre + " = " + varValor + ";";
  variablePreview.innerText = formatImprimir;
});

inputVariableValor.addEventListener("input", () => {
  varNombre = inputVariableNombre.value;
  varValor = inputVariableValor.value;
  let formatImprimir = varNombre + " = " + varValor + ";";
  variablePreview.innerText = formatImprimir;
});
