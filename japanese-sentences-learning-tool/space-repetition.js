// Variables globales
let currentIndex = -1; // Índice de la frase actualmente mostrada
let data = []; // Almacena los datos de las frases
let reviewQueue = []; // Cola para el repaso de frases
let repetitionInterval = 1; // Intervalo inicial de repeticiones

// Función para cargar los datos del archivo JSON
function loadData(url) {
  $.getJSON(url, function(response) {
    data = response;
    showRandomSentence();
  });
}

// Función para mostrar una frase aleatoria
function showRandomSentence() {
  currentIndex = Math.floor(Math.random() * data.length);
  const japaneseSentence = data[currentIndex].jap;
  $("#japanese-sentence").text(japaneseSentence);
  // Ocultar la traducción
  $("#correct-translation").text("");
  // Ocultar los botones de retroalimentación
  $("#feedback-buttons").hide();
}

// Función para manejar el evento de clic en el botón "Submit"
function handleSubmit() {
  const userInput = $("#translation-input").val().trim().toLowerCase();
  const correctTranslation = data[currentIndex].esp.toLowerCase().trim();
  
  // Mostrar la traducción correcta
  $("#correct-translation").text(correctTranslation);
  // Mostrar los botones de retroalimentación
  $("#feedback-buttons").show();
}

// Función para manejar el evento de clic en el botón "Bien"
function handleGoodButtonClick() {
  updateReviewQueue(true);
  showRandomSentence();
}

// Función para manejar el evento de clic en el botón "Mal"
function handleBadButtonClick() {
  updateReviewQueue(false);
  showRandomSentence();
}

// Función para actualizar la cola de repeticiones según la respuesta del usuario
function updateReviewQueue(correct) {
  if (correct) {
    repetitionInterval++; // Aumentar el intervalo de repetición
  } else {
    repetitionInterval = Math.max(repetitionInterval / 2, 1); // Reducir el intervalo de repetición, asegurándose de que no sea menor que 1
  }

  // Agregar la frase actual a la cola de repeticiones
  for (let i = 0; i < repetitionInterval; i++) {
    reviewQueue.push(currentIndex);
  }
}

// Event listeners para los botones y el formulario
$(document).ready(function() {
  // Cargar los datos del archivo JSON al cargar la página
  loadData("https://raw.githubusercontent.com/Keruanima/keruanima-small-projects/main/japanese-sentences-learning-tool/jap-sentences.json");

  // Manejar el evento de submit del formulario
  $("#translation-form").on("submit", function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
    handleSubmit();
  });

  // Manejar el evento de clic en el botón "Bien"
  $("#good-button").on("click", function() {
    handleGoodButtonClick();
  });

  // Manejar el evento de clic en el botón "Mal"
  $("#bad-button").on("click", function() {
    handleBadButtonClick();
  });
});
