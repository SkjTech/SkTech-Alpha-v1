import { DISGUISE_OPTIONS, DISGUISE_CONFIGS } from '../constants/disguise-options.js';

export const DisguiseManager = {
  DISGUISE_KEY: 'tab-disguise',

  getCurrentDisguise() {
    return localStorage.getItem(this.DISGUISE_KEY) || DISGUISE_OPTIONS.NONE;
  },

  setDisguise(disguiseOption) {
    localStorage.setItem(this.DISGUISE_KEY, disguiseOption);
    this.applyDisguise(disguiseOption);
  },

  applyDisguise(disguiseOption) {
    const config = DISGUISE_CONFIGS[disguiseOption];
    if (!config) return;
    
    // Update title
    const baseTitle = document.title.includes('|') ? 
      document.title.split('|')[1].trim() : 
      document.title;
    
    document.title = disguiseOption === DISGUISE_OPTIONS.NONE ? 
      `SkTech${baseTitle !== 'SkTech' ? ' | ' + baseTitle : ''}` : 
      config.title;
    
    // Update favicon
    const existingFavicon = document.querySelector('link[rel="icon"]');
    if (existingFavicon) {
      existingFavicon.remove();
    }
    
    if (config.favicon !== null) {
      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = config.favicon;
      document.head.appendChild(newFavicon);
    }
  },

  initialize() {
    const currentDisguise = this.getCurrentDisguise();
    this.applyDisguise(currentDisguise);
  }
};