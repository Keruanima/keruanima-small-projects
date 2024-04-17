// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Referencias a los elementos del DOM
    const primaryColorInput = document.getElementById('primary-color');
    const secondaryColorInput = document.getElementById('secondary-color');
    const contrastText = document.getElementById('contrast-text');
    const checkButton = document.getElementById('check-button');
  
    // Función para calcular el contraste entre dos colores
    function getContrastRatio(color1, color2) {
      // Función para convertir un color de formato hexadecimal a RGB
      function hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }
  
      // Función para calcular el contraste entre dos colores RGB
      function calculateContrast(rgb1, rgb2) {
        const lum1 = 0.2126 * rgb1.r + 0.7152 * rgb1.g + 0.0722 * rgb1.b;
        const lum2 = 0.2126 * rgb2.r + 0.7152 * rgb2.g + 0.0722 * rgb2.b;
        const brighter = Math.max(lum1, lum2);
        const darker = Math.min(lum1, lum2);
        return (brighter + 0.05) / (darker + 0.05);
      }
  
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      return calculateContrast(rgb1, rgb2);
    }
  
    // Función para actualizar el texto de contraste
    function updateContrastText(contrastRatio) {
      if (contrastRatio >= 4.5) {
        contrastText.textContent = 'El contraste entre los colores seleccionados es adecuado.';
        contrastText.style.color = 'green';
      } else {
        contrastText.textContent = 'El contraste entre los colores seleccionados no es suficiente.';
        contrastText.style.color = 'red';
      }
    }
  
    // Manejador de eventos para el botón de comprobar paleta
    checkButton.addEventListener('click', function() {
      const primaryColor = primaryColorInput.value;
      const secondaryColor = secondaryColorInput.value;
      const contrastRatio = getContrastRatio(primaryColor, secondaryColor);
      updateContrastText(contrastRatio);
    });
});
