import { ThemeManager } from './theme-utils.js';
import { DisguiseManager } from './utils/disguise-utils.js';
import { KeyListener } from './components/key-listener.js';

// Initialize managers
ThemeManager.initialize();
DisguiseManager.initialize();

// Set up theme selector
const themeSelect = document.getElementById('theme-select');
themeSelect.value = ThemeManager.getCurrentTheme();
themeSelect.addEventListener('change', (e) => {
  ThemeManager.setTheme(e.target.value);
});

// Set up auto dark mode toggle
const autoDarkMode = document.getElementById('auto-dark-mode');
autoDarkMode.checked = ThemeManager.getAutoDarkMode();

// Disable theme select if auto mode is enabled
themeSelect.disabled = autoDarkMode.checked;

autoDarkMode.addEventListener('change', (e) => {
  ThemeManager.setAutoDarkMode(e.target.checked);
  themeSelect.disabled = e.target.checked;
  
  // Update theme select to match current theme
  if (e.target.checked) {
    themeSelect.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
});

// Set up disguise selector
const disguiseSelect = document.getElementById('disguise-select');
disguiseSelect.value = DisguiseManager.getCurrentDisguise();
disguiseSelect.addEventListener('change', (e) => {
  DisguiseManager.setDisguise(e.target.value);
});

// Initialize panic key listener
new KeyListener(
  document.getElementById('panic-key-input'),
  document.getElementById('panic-key-display')
);