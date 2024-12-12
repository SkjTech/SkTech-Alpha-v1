import { DisguiseManager } from './disguise-utils.js';
import { DISGUISE_OPTIONS } from '../constants/disguise-options.js';

export const PanicManager = {
  PANIC_KEY_COMBO: 'panic-key-combo',

  getPanicKeyCombo() {
    return JSON.parse(localStorage.getItem(this.PANIC_KEY_COMBO) || '[]');
  },

  setPanicKeyCombo(keyCombo) {
    localStorage.setItem(this.PANIC_KEY_COMBO, JSON.stringify(keyCombo));
  },

  executePanic() {
    document.body.classList.toggle('hidden');
    if (document.body.classList.contains('hidden')) {
      this.previousDisguise = DisguiseManager.getCurrentDisguise();
      DisguiseManager.setDisguise(DISGUISE_OPTIONS.ABOUT_BLANK);
    } else {
      DisguiseManager.setDisguise(this.previousDisguise || DISGUISE_OPTIONS.NONE);
    }
  }
};