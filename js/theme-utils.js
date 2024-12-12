// Theme management utilities
export const ThemeManager = {
  THEME_KEY: 'preferred-theme',
  AUTO_DARK_MODE_KEY: 'auto-dark-mode',
  mediaQuery: window.matchMedia('(prefers-color-scheme: dark)'),

  getCurrentTheme() {
    return localStorage.getItem(this.THEME_KEY) || 'light';
  },

  setTheme(theme) {
    localStorage.setItem(this.THEME_KEY, theme);
    this.applyTheme(theme);
  },

  getAutoDarkMode() {
    return localStorage.getItem(this.AUTO_DARK_MODE_KEY) === 'true';
  },

  setAutoDarkMode(enabled) {
    localStorage.setItem(this.AUTO_DARK_MODE_KEY, enabled);
    if (enabled) {
      this.applySystemTheme();
      // Enable system preference listener
      this.mediaQuery.addEventListener('change', this.handleSystemThemeChange);
    } else {
      // Disable system preference listener
      this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange);
      // Revert to manual theme
      this.applyTheme(this.getCurrentTheme());
    }
  },

  handleSystemThemeChange(e) {
    if (ThemeManager.getAutoDarkMode()) {
      ThemeManager.applyTheme(e.matches ? 'dark' : 'light');
    }
  },

  applyTheme(theme) {
    // Remove all theme classes first
    document.body.classList.remove('darkMode', 'darkPurpleMode', 'babyBlueMode');
    
    // Apply the selected theme
    switch (theme) {
      case 'dark':
        document.body.classList.add('darkMode');
        break;
      case 'dark-purple':
        document.body.classList.add('darkPurpleMode');
        break;
      case 'baby-blue':
        document.body.classList.add('babyBlueMode');
        break;
    }
  },

  applySystemTheme() {
    this.applyTheme(this.mediaQuery.matches ? 'dark' : 'light');
  },

  initialize() {
    // Set up initial system theme change listener if auto mode is enabled
    if (this.getAutoDarkMode()) {
      this.mediaQuery.addEventListener('change', this.handleSystemThemeChange);
      this.applySystemTheme();
    } else {
      this.applyTheme(this.getCurrentTheme());
    }
  }
};