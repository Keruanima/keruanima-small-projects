// Variables globales
let currentIndex = -1; // Índice de la frase actualmente mostrada
let data = []; // Almacena los datos de las frases
let repetitionsUntilNextAppearance = {}; // Número de repeticiones hasta la próxima aparición de cada frase
const initialRepetitions = 10; // Número inicial de repeticiones hasta la próxima aparición
let reviewQueue = []; // Cola para el repaso de frases

// Función para cargar los datos del archivo JSON
function loadData(url) {
  $.getJSON(url, function(response) {
    data = response;
    initializeRepetitions();
    showNextSentence();
  });
}

// Función para inicializar el número de repeticiones hasta la próxima aparición de cada frase
function initializeRepetitions() {
  data.forEach((_, index) => {
    repetitionsUntilNextAppearance[index] = initialRepetitions;
    reviewQueue.push(index); // Llenar la cola con los índices de las frases
  });
}

// Función para mostrar la siguiente frase en la cola de repeticiones
function showNextSentence() {
  // Obtener el próximo índice de la cola de repeticiones
  const nextIndex = reviewQueue.shift(); // Obtener y eliminar el primer elemento de la cola
  currentIndex = nextIndex;
  
  // Obtener la frase en japonés y su traducción
  const japaneseSentence = data[currentIndex].jap;
  const spanishTranslation = data[currentIndex].esp;
  
  // Mostrar la frase en la interfaz
  const $japaneseSentence = $("#japanese-sentence");
  $japaneseSentence.text(japaneseSentence);
  $("#correct-translation").text("");
  $("#feedback-buttons").hide();
  
  // Diferenciar visualmente las frases que ya han sido mostradas
  if (data[currentIndex].shown) {
    $japaneseSentence.addClass("shown"); // Aplicar clase CSS
  } else {
    $japaneseSentence.removeClass("shown"); // Quitar clase CSS
    data[currentIndex].shown = true; // Marcar la frase como mostrada
  }
}


// Función para manejar el evento de clic en el botón "Submit"
function handleSubmit() {
  const userInput = $("#translation-input").val().trim().toLowerCase();
  const correctTranslation = data[currentIndex].esp.toLowerCase().trim();
  
  // Mostrar la traducción correcta
  $("#correct-translation").text(correctTranslation);
  $("#feedback-buttons").show();
}

// Función para manejar el evento de clic en el botón "Bien"
function handleGoodButtonClick() {
  updateReviewQueue(true);
  showNextSentence();
}

// Función para manejar el evento de clic en el botón "Mal"
function handleBadButtonClick() {
  updateReviewQueue(false);
  showNextSentence();
}

// Función para actualizar la cola de repeticiones según la respuesta del usuario
function updateReviewQueue(correct) {
  if (correct) {
    if (repetitionsUntilNextAppearance[currentIndex] !== undefined) {
        // Reposicionar la frase en la cola de repeticiones después de 10 frases
        newPosition = (currentIndex + repetitionsUntilNextAppearance[currentIndex]) % data.length;   
        // Mostrar la posición en consola
        console.log(`Posición de la frase calificada como "bien": ${newPosition}`);
        // Actualizar el número de repeticiones hasta la próxima aparición
        repetitionsUntilNextAppearance[currentIndex] *= 2;
      } else {
        // Reposicionar la frase en la cola de repeticiones después de 10 frases
        newPosition = (currentIndex + 10) % data.length;        
        // Mostrar la posición en consola
        console.log(`Posición de la frase calificada como "bien": ${newPosition}`);
        // Actualizar el número de repeticiones hasta la próxima aparición
        repetitionsUntilNextAppearance[currentIndex] = 10;
      }
    reviewQueue.splice(newPosition, 0, currentIndex);
  } else {
    // Reposicionar la frase en la cola de repeticiones después de 10 frases
    const newPosition = (currentIndex + 10) % data.length;
    reviewQueue.splice(newPosition, 0, currentIndex);
    // Actualizar el número de repeticiones hasta la próxima aparición
    repetitionsUntilNextAppearance[currentIndex] = 10;
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
