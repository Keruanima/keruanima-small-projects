let url =
  "https://raw.githubusercontent.com/Keruanima/keruanima-small-projects/main/japanese-sentences-learning-tool/jap-sentences.json?token=GHSAT0AAAAAACPQ26FBD5MRFGMSOT2OFKC4ZPZP72Q";
let itemsPerPage = 10;
let currentPage = 1;
let data;
let searchTerm = ""; // Agregamos una variable global para almacenar el término de búsqueda
let filteredData = null; // Declaramos filteredData como una variable global

$.getJSON(url, function (response) {
  data = response;
  mostrarData();
});

const mostrarData = () => {
  let body = "";
  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  let currentData = filteredData || data;

  for (var i = start; i < end && i < currentData.length; i++) {
    // Asegurarse de que 'currentData[i].jap' y 'currentData[i].esp' no sean undefined
    let japText = currentData[i].jap || "";
    let espText = currentData[i].esp || "";

    body += `<tr><td class="mobile-th">Japones</td><td>${japText.toLowerCase()}</td><td class="mobile-th">Español</td><td>${espText.toLowerCase()}</td></tr>`;
  }

  $("#data").html(body);

  // Si no hay datos filtrados, usar 'data' para calcular el total de páginas
  if (!filteredData) {
    totatotalPages = Math.ceil(data.length / itemsPerPage);
  } else {
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
  }

  actualizarBotones(data);
};

let totalPages;

const actualizarBotones = (data) => {
  if (!filteredData) {
    totalPages = Math.ceil(data.length / itemsPerPage);
  } else {
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
  }

  if (currentPage === 1) {
    $("#prevButton").addClass("btn-disabled");
  } else {
    $("#prevButton").removeClass("btn-disabled");
  }

  if (
    currentPage === totalPages ||
    (filteredData && filteredData.length < itemsPerPage)
  ) {
    $("#nextButton").addClass("btn-disabled").prop("disabled", true); // Deshabilitar el botón siguiente
  } else {
    $("#nextButton").removeClass("btn-disabled").prop("disabled", false); // Habilitar el botón siguiente
  }
};

const nextPage = () => {
  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;

  if (currentPage < totalPages) {
    currentPage++;
    mostrarData(
      filteredData
        ? filteredData.slice(start, end + itemsPerPage)
        : data.slice(start, end + itemsPerPage)
    );
  } else {
    // Deshabilitar el botón siguiente si no hay más datos
    actualizarBotones();
  }
};

// ... Resto del código ...

const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    mostrarData();
  }
};

const searchFilter = () => {
  searchTerm = $("#searchInput").val().toLowerCase();

  // Filtrar asegurándose de que 'item' no sea null o undefined y que 'item.jap' y 'item.esp' no sean undefined
  filteredData = data.filter((item) => {
    let japText = item && item.jap ? item.jap.toLowerCase() : "";
    let espText = item && item.esp ? item.esp.toLowerCase() : "";
    return japText.includes(searchTerm) || espText.includes(searchTerm);
  });

  mostrarData();
};

$("#searchInput").on("input", searchFilter);
