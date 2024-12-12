import { SPECIAL_KEYS, KEY_DISPLAY_NAMES } from '../constants/key-codes.js';

export const KeyUtils = {
  formatKeyCombo(keys) {
    return keys
      .map(key => KEY_DISPLAY_NAMES[key] || key.toUpperCase())
      .join(' + ');
  },

  isSpecialKey(key) {
    return Object.values(SPECIAL_KEYS).includes(key);
  },

  // Sort keys to ensure consistent order (special keys first, then regular keys)
  sortKeys(keys) {
    return keys.sort((a, b) => {
      const aIsSpecial = this.isSpecialKey(a);
      const bIsSpecial = this.isSpecialKey(b);
      if (aIsSpecial && !bIsSpecial) return -1;
      if (!aIsSpecial && bIsSpecial) return 1;
      return a.localeCompare(b);
    });
  }
};