const toggleButton = document.querySelector('.toggle-button');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Verificar si hay un tema guardado en el almacenamiento local y aplicarlo
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('theme-icon').textContent = savedTheme === 'dark' ? '🌙' : '☀️';
}

// Verificar si hay un estado de toggle guardado en el almacenamiento local y aplicarlo
const savedToggleState = localStorage.getItem('toggleState');
if (savedToggleState === 'true') {
  toggleButton.checked = true;
}

toggleButton.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme); // Guardar el tema seleccionado en el almacenamiento local

  if (newTheme === 'dark') {
    themeIcon.textContent = '🌙';
  } else {
    themeIcon.textContent = '☀️';
  }

  // Guardar el estado del toggle en el almacenamiento local
  localStorage.setItem('toggleState', toggleButton.checked);
});
